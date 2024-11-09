const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const emailHandler = require('./email-handler');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the assets and src directories
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/', express.static(path.join(__dirname, '../src')));

// Get endpoint for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/index.html'));
});

// Get endpoint for index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/index.html'));
});

// Get endpoint for socials.html
app.get('/socials.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/socials.html'));
});

// Get endpoint for games.html
app.get('/games.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/games.html'));
});

// Get endpoint for pong.html
app.get('/pong.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/pong.html'));
});

// Post endpoint to save email from input form
app.post('/submit-email', emailHandler.handleEmailSubmission)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
