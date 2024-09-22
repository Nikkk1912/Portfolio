const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the assets and src directories
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/', express.static(path.join(__dirname, '../src')));

// Get endpoint for index_main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/index_main.html'));
});

// Get endpoint for index_socials.html
app.get('/index_socials.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/html/output/index_socials.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
