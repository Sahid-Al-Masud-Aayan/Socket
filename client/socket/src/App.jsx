import { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
const socket = io.connect('http://localhost:3000');

function App() {

  const [message, SetMessage]= useState("")
  const handleText=(e)=>{
    SetMessage(e.target.value)
  }
  const sender=()=>{
    socket.emit("clients-message",{
      message
    })
    
  }
  useEffect(()=>{
    socket.emit('message-from-frontend', {
      message: 'hello I am aayan'
    })
    socket.on('read-data-from-db', (info)=>{
      console.log(info);
      
    })
  })
  socket.on('message-from-server', (data)=>{
    console.log(data);
    
})
   
  return (
    <>
    <h1>Hello I am connecting the socket</h1>
    <input onChange={handleText} type="text" />
    <button onClick={sender}>send</button>
    </>
  )
}

export default App
