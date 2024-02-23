import express from "express";

const server = express();

server.get("/", (req, res) => {
    return res.send("Calabreso1 2312412");
})

export {server};
