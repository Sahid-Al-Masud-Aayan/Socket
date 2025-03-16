const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const { Server } = require("socket.io");
const mongoose = require('mongoose');

// enFVCx0CJTb8Qj8s

mongoose.connect('mongodb+srv://Socket:enFVCx0CJTb8Qj8s@cluster0.uszpu.mongodb.net/Socketdata?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('mongo db Connected!'));


const server = app.listen(3000, (req, res)=>{
    console.log('server on port 3000');
})

const io = new Server(server, {
    cors: '*',
  });
  
  const Schema = mongoose.Schema;

const SocketText = new Schema({
  text: String,
});

const SocketTextModel = mongoose.model('socketInfo', SocketText)
  io.on('connection', (socket)=>{
    console.log('backend connected with frontend', socket.id);
    socket.on('clients-message', async (data)=>{
      const SocketdataText = await SocketTextModel({
        text: data.message
      })
      SocketdataText.save()
        io.emit('ans_from_server', data)
    })
    io.emit('message-from-server', {
        message:'the signal is from server'
    })
    socket.on('read-data-from-db', async ()=>{
      const TetxData = await SocketTextModel.find()
      socket.emit("read", {
        message:TetxData
      })
      
    })
    io.on('disconnected', ()=>{
        console.log('disconnected');
    })
  })