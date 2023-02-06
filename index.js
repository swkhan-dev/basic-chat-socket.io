const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

io.on("connection",(socket)=>{
    // When a user gets connected alert
    socket.broadcast.emit("chatMessage",{nickname:"Server",msg:"A new user connected"})
    // When a user gets connected alert
    socket.on("disconnect",()=>{
        socket.broadcast.emit("chatMessage",{nickname:"Server",msg:"A user got disconnected"})
    })
    socket.on("chatMessage",(msg)=>{
        //Emit Message to all cliemts
        // io.emit("chatMessage",msg)

        // Broadcast to everyone except the sender
        socket.broadcast.emit("chatMessage",msg);
    })
})

server.listen(3000,()=>console.log("Server listening at port 3000....."))