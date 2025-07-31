import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files (CSS, JS, etc.)

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: req.body.name,
            address: "rnf.strategies@gmail.com"
        },
        to: "rnf.strategies@gmail.com",
        subject: "Sent from RnF website",
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    };
    const confirmationMail = {
        from: {
            name: "Raccoon n' Fox Strategies",
            address: "rnf.strategies@gmail.com"
        },
        to: req.body.email,
        subject: "Thanks for reaching out to us",
        text: `Hi ${req.body.name},\n\nThank you for reaching out to RnF Strategies. We recieved your messaged and we'll get back to you shortly.\n\n- Team RnF`,
    };    

    try {
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMail)
        ]);        
        res.redirect('/?success=true#contact'); 
    } catch (error) {
        console.error('Error sending email:', error);
        res.redirect('/?error=send#contact');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// Export the Express API
export default app;