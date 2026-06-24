import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
});

const sendEmail = async (to, subject, html) => {

    try {
        console.log("Sending email through Brevo...");
        const result = await transporter.sendMail({

            from: `ServiceSync <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        console.log("✅ Email sent:", result.messageId);


    } catch (error) {
        console.log("❌ Brevo Error:", error.message);
        throw error;

    }

};


export default sendEmail;