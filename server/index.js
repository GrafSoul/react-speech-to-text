require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');
const PORT = process.env.PORT || 8000;

const app = express();

const server = http.createServer(app);

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
} else {
    app.use(express.static(path.join(__dirname, '/')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

// Started the server
server.listen(PORT, () => {
    console.log(`**************************************`);
    console.log(`Server is running on port: ${PORT}`);
    console.log(`URL address: http://localhost:${PORT}`);
    console.log(`**************************************`);
});
