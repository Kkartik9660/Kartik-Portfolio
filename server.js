import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname support in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==================== CONTACT API EMAIL SENDER ====================
const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

if (!gmailUser || !gmailAppPassword) {
  console.warn("⚠️ Missing Gmail Credentials. EMAIL will not work!");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields required!" });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      replyTo: email,
      to: gmailUser,
      subject: `📩 New Contact From ${name}`,
      html: `
        <h2>New portfolio message received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.json({ message: "Message Delivered Successfully 🎉" });
  } catch (error) {
    console.error("Mail Failed ❌", error);
    res.status(500).json({ message: "Email Error — Try again later!" });
  }
});

// ==================== FRONTEND HOSTING ====================
app.use(express.static(path.join(__dirname, "dist"))); // Vite output folder 🟢

// Express v5 fix → must use "/*"
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// ==================== START SERVER ====================
app.listen(port, () =>
  console.log(`🚀 Server + Frontend Live on http://localhost:${port}`)
);
