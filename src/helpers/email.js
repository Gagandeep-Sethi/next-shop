import nodemailer from "nodemailer";
//transporter will be the service we will be using for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.TRANPORTER_HOST,
  port: process.env.TRANPORTER_PORT,
  secure: false,
  auth: {
    user: process.env.TRANPORTER_USER,
    pass: process.env.TRANPORTER_PASSWORD,
  },
});

export async function sendEmail(email, subject, text, html) {
  try {
    let info = await transporter.sendMail({
      from: '"Your Name" <your_email@example.com>',
      to: email,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
