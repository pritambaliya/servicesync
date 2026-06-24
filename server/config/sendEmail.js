import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        console.log("Sending email through SendGrid...");
        const msg = {
            to: to,
            from: {
                email: process.env.EMAIL_USER,
                name: "ServiceSync"
            },
            subject: subject,
            html: html
        };

        const result = await sgMail.send(msg);
        console.log("✅ Email sent:", result[0].statusCode);
    } catch(error) {
        console.log(
          "❌ SendGrid Error:",
          error.response?.body || error.message
        );

        throw error;
    }

};


export default sendEmail;