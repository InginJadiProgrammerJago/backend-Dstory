// routes/geocode.js
import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 86400 }); // Cache 1 hari

router.get('/reverse', async (req, res) => {
    const { lat, lon } = req.query;
    const cacheKey = `${lat},${lon}`;

    // Cek cache
    if (cache.has(cacheKey)) {
        return res.json(cache.get(cacheKey));
    }

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
                headers: {
                    'User-Agent': 'DstoryApp/1.0 (rinaldimulyatam@gmail.com)',
                    'Accept-Language': 'id',
                }
            }
        );

        if (!response.ok) throw new Error('Geocoding failed');

        const data = await response.json();

        // Format alamat lebih ringkas
        let address = 'Lokasi tidak ditemukan';
        if (data.display_name) {
            const parts = data.display_name.split(',');
            address = parts.slice(0, 4).join(', ').trim();
        }

        // Simpan ke cache
        cache.set(cacheKey, { address });

        res.json({ address });
    } catch (error) {
        console.error('Geocoding error:', error);
        res.status(500).json({ error: 'Geocoding failed' });
    }
});

export default router;
