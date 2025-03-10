import { useEffect } from 'react';
import io from 'socket.io-client'; 
const socket = io.connect('http://localhost:3000');

function App() {

  useEffect(()=>{
    socket.emit('message-from-frontend', {
      message: 'hello I am aayan'
    })
  })
  socket.on('message-from-server', (data)=>{
    console.log(data);
    
})

  return (
    <h1>Hello I am connecting the socket</h1>
  )
}

export default App
