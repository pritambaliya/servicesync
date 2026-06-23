import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.verify();
    console.log("SMTP working");
    console.log(process.env.EMAIL_USER)

    await transporter.sendMail({
      from: `"ServiceSync Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    
    console.log("✅ Email sent to:", to);

};

export default sendEmail;