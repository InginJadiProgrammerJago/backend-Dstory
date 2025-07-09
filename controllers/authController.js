import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Register
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email sudah terdaftar" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword }
        });

        res.status(201).json({ message: "Registrasi berhasil", user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Gagal registrasi", error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Password salah" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2h" });
        res.status(200).json({ message: "Login berhasil", token });
    } catch (err) {
        res.status(500).json({ message: "Gagal login", error: err.message });
    }
};
