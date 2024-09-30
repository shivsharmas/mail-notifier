const nodemailer = require('nodemailer');
const notifier = require('node-notifier');

// Function to send email
const sendEmail = async (recipientEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS  // Your email password or app password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'New Email Notification',
        text: 'You have received a new email!'
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to show notification
const showNotification = (sender) => {
    notifier.notify({
        title: 'New Email Notification',
        message: `You have received an email from ${sender}`,
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with the user interaction until the notification is dismissed
    });
};

// Example usage
const simulateIncomingEmail = (sender) => {
    showNotification(sender);
    sendEmail('recipient@example.com'); // Change to your desired recipient
};

// Simulate receiving an email
simulateIncomingEmail('example@example.com');
