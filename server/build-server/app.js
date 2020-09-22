"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// middleware
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'build')));
// catch all route for serving index.html despite the requested route. Ensures react routing still works on client side.
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'build', 'index.html'));
});
exports.default = app;
