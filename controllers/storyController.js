import prisma from "../prismaClient.js";

export const getAllStories = async (req, res) => {
    try {
        const stories = await prisma.story.findMany({
            include: { user: { select: { id: true, username: true } } },
            orderBy: { createdAt: "desc" }
        });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getStoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const story = await prisma.story.findUnique({
            where: { id: Number(id) },
            include: { user: { select: { id: true, username: true } } }
        });
        if (!story) return res.status(404).json({ message: "Cerita tidak ditemukan" });
        res.json(story);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createStory = async (req, res) => {
    const { title, content, image, latitude, longitude } = req.body;
    const userId = req.user.userId;

    try {
        const story = await prisma.story.create({
            data: {
                title,
                content,
                image,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                userId
            }
        });
        res.status(201).json({ message: "Cerita berhasil ditambahkan", story });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteStory = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.story.delete({ where: { id: Number(id) } });
        res.json({ message: "Cerita berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateStory = async (req, res) => {
    const { id } = req.params;
    const { title, content, image, latitude, longitude } = req.body;
    try {
        const updated = await prisma.story.update({
            where: { id: Number(id) },
            data: { title, content, image, latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
        });
        res.json({ message: "Cerita berhasil diperbarui", story: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
