import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const TextEditor = () => {

    const { noteID } = useParams()

    const socket = new WebSocket(`ws://localhost:8000/ws/${noteID.slice(1)}`);

    const [value, setValue] = useState("")


    // let getNote = async (noteID) => {
    //     let response = await axios.get(`http://localhost:8000/get/${noteID}`)
    //         .then((response) => {
    //             // Success
    //             console.log(response)
    //             setValue(response.data.note_content)
    //         })
    //         .catch((error) => {
    //             // Error
    //             if (error.response) {
    //                 // The request was made and the server responded with a status code
    //                 // that falls out of the range of 2xx
    //                 console.log(error.response.data);
    //                 // console.log(error.response.status);
    //                 // console.log(error.response.headers);
    //             } else if (error.request) {
    //                 // The request was made but no response was received
    //                 // `error.request` is an instance of XMLHttpRequest in the 
    //                 // browser and an instance of
    //                 // http.ClientRequest in node.js
    //                 console.log(error.request);
    //             } else {
    //                 // Something happened in setting up the request that triggered an Error
    //                 console.log('Error', error.message);
    //             }
    //             console.log(error.config);
    //         });
    // }

    // useEffect(() => {
    //     getNote(noteID.slice(1))
    // }, [noteID])

    socket.onmessage = (event) => {
        setValue(event.data);
    };

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
