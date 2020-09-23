// const express = require('express');
import express from 'express';
import path from 'path';

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '..', 'build-client')));

// catch all route for serving index.html despite the requested route. Ensures react routing still works on client side.
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build-client', 'index.html'));
});

export default app;