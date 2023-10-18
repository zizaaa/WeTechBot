const nodemailer = require('nodemailer');

// Create a transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'wetechofficial.2022@gmail.com',
        pass: 'zuvb gbqb ssnz dicw',
    },
});

// Function to send a verification email
function sendVerificationEmail(receiverEmail, verificationCode) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: 'WeTech Bot',
            to: receiverEmail,
            subject: 'Email Verification',
            html: `
            <h1>Verification Code</h1>
            <p>Thank you for registering with WeTech. Please use the verification code below to confirm your email address and complete the registration process:</p>
            <p><strong>Verification Code:</strong> <span style="padding:5px 10px;background-color:#56F387; border-radius:5px;">${verificationCode}</span></p>
            <p>This code is used to verify your email and ensure the security of your account. Do not share it with anyone.</p>
            <p><strong>Important:</strong> Please keep this code confidential and do not share it with others. We will never ask you to share your OTP.</p>
            <p>If you did not request this verification, please ignore this email.</p>
            <p>Best regards,<br/>WeTech Team</p>
        `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error); // Reject the promise on error
            } else {
                console.log('Email sent:', info.response);
                resolve(info.response); // Resolve the promise on success
            }
        });
    });
}

module.exports = {
    sendVerificationEmail,
};
