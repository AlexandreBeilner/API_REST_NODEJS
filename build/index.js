"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
require("dotenv/config");
server_1.server.listen(process.env.PORT, () => {
    console.log(`App rodando na porta ${process.env.PORT}`);
});
