// controllers/storyController.js
import prisma from "../prismaClient.js";
import supabase from "../supabaseClient.js";

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
    const { title, content, latitude, longitude } = req.body;
    const userId = req.user.userId;
    const file = req.file;

    try {
        let imageUrl = null;

        // 🔥 Jika file dikirim, upload ke Supabase
        if (file) {
            const fileName = `${Date.now()}-${file.originalname}`;
            const { error: uploadError } = await supabase
                .storage
                .from("d-story-images")
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            // 🔗 Dapatkan URL publik
            const { data: publicData } = supabase
                .storage
                .from("d-story-images")
                .getPublicUrl(fileName);

            imageUrl = publicData.publicUrl;
        }

        // 📝 Simpan ke PostgreSQL
        const story = await prisma.story.create({
            data: {
                title,
                content,
                imageUrl,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                userId,
            },
        });

        res.status(201).json({ message: "Cerita berhasil ditambahkan", story });
    } catch (err) {
        console.error("Error tambah story:", err.message);
        res.status(500).json({ message: "Gagal menambahkan cerita", error: err.message });
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
