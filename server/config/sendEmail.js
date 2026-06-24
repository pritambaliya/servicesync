import brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, html) => {
    try {
        console.log("Sending email through Brevo API...");
        const email = new brevo.SendSmtpEmail();

        email.sender = {
            name: "ServiceSync",
            email: process.env.EMAIL_USER
        };

        email.to = [
            {
                email: to
            }
        ];
        email.subject = subject;
        email.htmlContent = html;
        const result = await apiInstance.sendTransacEmail(email);
        console.log("✅ Email sent:", result);

    } catch (error) {
        console.log("❌ Brevo Error:", error.message);
        throw error;
    }
};

export default sendEmail;