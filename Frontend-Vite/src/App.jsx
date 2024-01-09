import React, { useState, useEffect } from 'react';


const socket = new WebSocket("ws://localhost:8000/ws/1");

const App = () => {

  const [value, setValue] = useState("")

  socket.onmessage = (event) => {
    setValue(event.data);
  };

  const handleChange = (e) => {
    setValue(e.target.value)
    socket.send(e.target.value)
  }

  return (
    <textarea id="editor" rows="10" cols="50" value={value} onChange={handleChange}></textarea>
  )

};

export default App;
