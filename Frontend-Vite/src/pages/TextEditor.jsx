import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const socket = new WebSocket('ws://localhost:8000/ws/1')

const TextEditor = () => {

    const { noteID } = useParams()

    const [value, setValue] = useState("")

    socket.onopen = () => {
        socket.send(noteID.slice(1))
    }

    socket.onmessage = (event) => {
        setValue(event.data);
    }

    const handleChange = (e) => {
        setValue(e.target.value)
        socket.send(e.target.value)
    }

    return (
        <div>
            <textarea id="editor" rows="10" cols="50" value={value} onChange={handleChange}></textarea>
        </div>    
    )
}

export default TextEditor
