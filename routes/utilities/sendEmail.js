const nodemailer =  require("nodemailer");

const sendEmail = (from, to, subject, content) => {
    let transporter = nodemailer.createTransport({
        service : "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        },
        tls : {
            rejectUnauthorized : false
        }
    });

    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text : content, 
    });
}

module.exports = { sendEmail }