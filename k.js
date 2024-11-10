const express = require('express');
const mailgun = require('mailgun-js');
const cors = require('cors'); // Import CORS
const app = express();
const port = 3000;

// Mailgun configuration
const mg = mailgun({
    apiKey: 'afe364f713f58d4a0682eb8017005e17-f6fe91d3-38ce5828',
    domain: 'sandbox9148a207b83f4c37915640cb99d976d7.mailgun.org'
});

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS to allow requests from frontend running on a different port
app.use(cors());

// Welcome email route
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const data = {
        from: 'Dev@Deakin <no-reply@yourdomain.com>',
        to: email,
        subject: 'Welcome to Dev@Deakin',
        text: 'Thank you for subscribing to Dev@Deakin. We are excited to have you on board!'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Welcome email sent' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
