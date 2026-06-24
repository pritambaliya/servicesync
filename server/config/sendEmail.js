import { TransactionalEmailsApi } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();
const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
    0,
    process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, html) => {
    try {
        console.log("Sending email through Brevo API...");
        const email = {
            sender: {
                name: "ServiceSync",
                email: process.env.EMAIL_USER
            },
            to: [
                {
                    email: to
                }
            ],

            subject: subject,
            htmlContent: html
        };

        const result = await apiInstance.sendTransacEmail(email);
        console.log("✅ Email sent:", result);

    } catch (error) {
        console.log("❌ Brevo Error:", error.message);
        throw error;
    }

};


export default sendEmail;