"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const app = express_1.default();
// middleware
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'build-client')));
app.use(express_1.default.json());
// routes
app.use('/api/rooms/', rooms_1.default);
// catch all route for serving index.html despite the requested route. Ensures react routing still works on client side.
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'build-client', 'index.html'));
});
exports.default = app;
