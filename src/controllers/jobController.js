import prisma from "../utils/prisma.js";

export const createJob = async (req, res) => {
  const { title, description, roleType } = req.body;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        roleType
      }
    });

    res.json(job);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};