const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const { Server } = require("socket.io");

const server = app.listen(3000, (req, res)=>{
    console.log('server on port 3000');
})

const io = new Server(server, {
    cors: '*',
  });

  io.on('connection', (socket)=>{
    console.log('backend connected with frontend', socket.id);
    socket.on('message-from-frontend', (data)=>{
        console.log(data);
        
    })
    io.emit('message-from-server', {
        message:'the signal is from server'
    })
  })