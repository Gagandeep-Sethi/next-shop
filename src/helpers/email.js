import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(email, subject, text, html) {
  try {
    let info = await transporter.sendMail({
      from: {
        name: "Sky-Shop",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
