require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io")
const redis = require("redis");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "*"
    },
});

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redis.connect();

const redisSubscriber = redisClient.duplicate();
redisSubscriber.connect();

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (room)=>{
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on("message", async({ room, message }) =>{
        console.log(`Message in room ${room}: ${message}`);

        await redisClient.publish(room, JSON.stringify({ message }));

        io.to(room).emit("message", { message });
    });

    socket.on("disconnect", ()=>{
        console.log(`User disconnected: ${socket.id}`)
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, ()=>{
        console.log(`Websocket server running on port: ${PORT}`)
    })
})

