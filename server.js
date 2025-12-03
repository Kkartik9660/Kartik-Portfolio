import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://your-frontend-domain.com", // <-- your portfolio URL
      "http://localhost:5173", // local dev
    ],
    methods: ["POST"],
  })
);

app.use(express.json());

/* ===================== CONTACT API (EMAIL) ===================== */
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

if (!gmailUser || !gmailAppPassword) {
  console.log("⚠️ Missing Gmail ENV — Contact form email will NOT work!");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: gmailUser, pass: gmailAppPassword },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields are required!" });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New Message From ${name}`,
      html: `
        <h3>📩 New Portfolio Contact</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    res.json({ message: "Message sent successfully 🎉" });
  } catch (error) {
    console.error("❌ Email Error →", error);
    res.status(500).json({ message: "Failed to send email — Try later!" });
  }
});

/* ===================== PRODUCTION REACT HOSTING ===================== */
app.use(express.static(path.join(__dirname, "dist"))); // Vite Build

// SPA Routing Fix — API routes exclude
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

/* ===================== SERVER START ===================== */
app.listen(port, () => {
  console.log(`🚀 Server running & UI serving on port ${port}`);
  console.log(`🔗 LOCAL: http://localhost:${port}`);
});
