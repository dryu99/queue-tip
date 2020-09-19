const express = require('express');
const path = require('path');

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '..', 'build')));

// catch all route for serving index.html despite the requested route. Ensures react routing still works on client side.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;