import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (to, subject, html) => {

    try {
        console.log("Sending email through Resend...");
        const result = await resend.emails.send({
            from: "ServiceSync <onboarding@resend.dev>",
            to,
            subject,
            html
        });
        console.log("✅ Email sent:", result);

    } catch (error) {
        console.log("❌ Resend Error:", error.message);
        throw error;
    }

};


export default sendEmail;