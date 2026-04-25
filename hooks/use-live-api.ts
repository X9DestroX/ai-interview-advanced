import { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { encodeFloat32ToPCM16Base64, decodePCM16Base64ToFloat32 } from '@/lib/audio';

export type TranscriptionItem = {
  id: string;
  source: 'user' | 'model';
  text: string;
  timestamp: number;
};

export function useLiveAPI() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const aiRef = useRef<GoogleGenAI | null>(null);
  const sessionPromiseRef = useRef<any>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const playbackQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);

  // Mirror transcriptions state into a ref so endSession can read the final snapshot
  const transcriptionsRef = useRef<TranscriptionItem[]>([]);

  function playQueue() {
    if (isPlayingRef.current || playbackQueueRef.current.length === 0) return;

    isPlayingRef.current = true;
    setIsSpeaking(true);

    const audioCtx = audioContextRef.current;
    if (!audioCtx) return;

    const currentData = playbackQueueRef.current.shift()!;
    const buffer = audioCtx.createBuffer(1, currentData.length, 24000); // Live API output is 24kHz
    buffer.getChannelData(0).set(currentData);

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);

    source.onended = () => {
      isPlayingRef.current = false;
      setIsSpeaking(false);
      if (playbackQueueRef.current.length > 0) {
        playQueue();
      }
    };
    source.start();
  }

  /**
   * POSTs the completed transcript to the Node.js backend.
   * The backend converts the flat array into Q&A key-value pairs and persists them.
   */
  async function saveTranscriptToBackend(items: TranscriptionItem[]) {
    if (items.length === 0) return;
    try {
      const res = await fetch('http://localhost:3001/api/transcripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcriptions: items }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[Transcript saved] id=${data.id} — Q&A pairs:`, data.qa);
      } else {
        console.error('[Transcript save failed]', data);
      }
    } catch (err) {
      console.error('[Transcript save error]', err);
    }
  }

  function endSession() {
    // Capture snapshot BEFORE clearing state, then persist to backend
    const snapshot = transcriptionsRef.current;
    saveTranscriptToBackend(snapshot);

    setIsConnected(false);
    setIsSpeaking(false);
    setTranscriptions([]);
    transcriptionsRef.current = [];

    sessionPromiseRef.current?.then((session: any) => session.close());
    sessionPromiseRef.current = null;

    if (micProcessorRef.current) {
      micProcessorRef.current.disconnect();
      micProcessorRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    setVideoStream(null);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
  }

  const addTranscription = useCallback((source: 'user' | 'model', text: string) => {
    setTranscriptions(prev => {
      // Find latest transcription from the same source within 2 seconds and merge
      const last = prev[prev.length - 1];
      let next: TranscriptionItem[];
      if (last && last.source === source && (Date.now() - last.timestamp) < 2000) {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { ...last, text: last.text + ' ' + text, timestamp: Date.now() };
        next = newArr;
      } else {
        next = [...prev, { id: Math.random().toString(), source, text, timestamp: Date.now() }];
      }
      // Keep ref in sync so endSession always has the latest data
      transcriptionsRef.current = next;
      return next;
    });
  }, []);

  const startSession = useCallback(async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      alert("Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.");
      return;
    }

    if (!aiRef.current) {
      aiRef.current = new GoogleGenAI({ apiKey });
    }

    try {
      // 1. Setup Audio & Video Input
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      micStreamRef.current = stream;
      setVideoStream(stream);

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 }); // Input to API needs to be 16kHz
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);

      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0; // mute local playback
      processor.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      source.connect(processor);

      // 2. Setup Gemini Live Connection
      const sessionPromise = aiRef.current.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
          },
          systemInstruction: `You are an expert technical interviewer for a software engineering role conducting a structured interview. Follow these rules strictly:

1. Start by briefly greeting the candidate and asking them to introduce themselves.
2. Ask exactly 5 technical interview questions, one at a time. Wait for the candidate to fully answer before moving on.
3. Ask relevant follow-up questions or probing questions within each main question if needed, but count only the 5 core questions.
4. After the 5th question is answered, thank the candidate, let them know the interview is complete, and say goodbye. Do not ask any more questions after that.
5. Keep your responses concise and professional.
6. The topics should cover: data structures/algorithms, system design, past experience/behavioral, a language-specific question, and problem-solving.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log("Gemini Live API connected.");
            setIsConnected(true);
            // Start processing audio from microphone and sending
            processor.onaudioprocess = (e) => {
              const channelData = e.inputBuffer.getChannelData(0);
              const base64Data = encodeFloat32ToPCM16Base64(channelData);

              sessionPromiseRef.current?.then((session: any) => {
                session.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            // 1. Audio Output (from inline audio data)
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const float32Data = decodePCM16Base64ToFloat32(base64Audio);
              playbackQueueRef.current.push(float32Data);
              playQueue();
            }

            // 2. Interruptions
            if (message.serverContent?.interrupted) {
              playbackQueueRef.current = [];
              isPlayingRef.current = false;
              setIsSpeaking(false);
            }

            // 3. AI output transcription — use the SDK's dedicated outputTranscription field
            const outputText = message.serverContent?.outputTranscription?.text;
            if (outputText) {
              addTranscription('model', outputText);
            }

            // 4. User input transcription — use the SDK's dedicated inputTranscription field
            const inputText = message.serverContent?.inputTranscription?.text;
            if (inputText) {
              addTranscription('user', inputText);
            }
          },
          onclose: () => {
            console.log("Connection closed.");
            endSession();
          },
          onerror: (error) => {
            console.error("Gemini API Error:", error);
            endSession();
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to start session:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTranscription]);

  return {
    isConnected,
    isSpeaking,
    transcriptions,
    videoStream,
    startSession,
    endSession
  };
}
