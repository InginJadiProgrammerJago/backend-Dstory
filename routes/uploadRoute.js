// routes/uploadRoute.js
import express from 'express';
import upload from '../middleware/authMiddleware.js';
import supabase from '../supabaseClient.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        const { data, error } = await supabase.storage
            .from('d-story-images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: true,
            });

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
            .from('d-story-images')
            .getPublicUrl(fileName);

        return res.status(200).json({
            message: 'Upload sukses',
            url: publicUrl.publicUrl,
        });

    } catch (err) {
        return res.status(500).json({ message: 'Upload gagal', error: err.message });
    }
});

export default router;
