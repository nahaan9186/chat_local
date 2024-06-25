const express = require("express");
const http = require("http")
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const moment = require("moment");


app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PROT || 3000;

io.on("connection", (socket)=>{
    socket.on("chatting",(data)=>{
        const { name, msg } = data;
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:mm A")
        })
    })
})

server.listen(PORT, ()=> console.log(`server is running at ${PORT}`))