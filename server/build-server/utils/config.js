"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// load .env contents into process.env
dotenv_1.config();
const PORT = process.env.PORT || 3003;
exports.default = { PORT };
