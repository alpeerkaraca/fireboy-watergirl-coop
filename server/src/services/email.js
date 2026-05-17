import nodemailer from "nodemailer";

const DEV_MODE = process.env.NODE_ENV !== "production";

let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  if (process.env.SMTP_HOST) {
    // Use configured SMTP server (Gmail, SendGrid, Mailgun, etc.)
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Dev fallback — just logs to console
    _transporter = null;
  }

  return _transporter;
}

export async function sendMagicLink(email, token) {
  const link = `${process.env.APP_URL || "http://localhost:3000"}/api/auth/verify?token=${token}`;
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@fireboy-coop.local";

  const transporter = getTransporter();

  if (!transporter) {
    // Dev mode or no SMTP configured — print link to console
    console.log(`
╔════════════════════════ MAGIC LINK ════════════════════════╗
║                                                            ║
║   To: ${email.padEnd(52)}║
║   Link: ${link.padEnd(50)}║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
    return;
  }

  // Production — send real email
  await transporter.sendMail({
    from,
    to: email,
    subject: "Fireboy & Watergirl — Your Magic Login Link",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #ff6b35;">Fireboy & Watergirl Co-op</h2>
        <p>Click the button below to log in. No password needed.</p>
        <a href="${link}" style="
          display: inline-block; padding: 14px 32px;
          background: #ff6b35; color: #fff; text-decoration: none;
          border-radius: 8px; font-weight: bold; font-size: 16px;
        ">Log In Now</a>
        <p style="color: #888; font-size: 13px; margin-top: 24px;">
          This link expires in 15 minutes and can only be used once.
          If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  });

  console.log(`Magic link sent to ${email}`);
}
