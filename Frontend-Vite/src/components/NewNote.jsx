import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import {
    Dialog,
    DialogHeader,
    DialogBody,
  } from "@material-tailwind/react";

import { FaPython, FaJava, FaHtml5 } from "react-icons/fa"
import { SiCplusplus, SiJavascript } from "react-icons/si";
import { GrTextAlignLeft } from "react-icons/gr";

const NewNote = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open);
    const handleClick = async (language) => {
        let response = await axios.get(`https://share-notes-api.vercel.app/new/${language}/`)
            .then((response) => {
                // Success
                const note_id = response.data.note_url
                console.log(note_id)
                navigate(`/:${note_id}`)
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }
    return (
        <>
            <div className='flex px-6 py-4 gap-2 bg-white rounded-xl cursor-pointer' onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>New Note</p>
            </div>
            <Dialog
                open={open}
                handler={handleOpen}
                
            >
                <h3 className='text-center text-black pt-8'>Choose a language</h3>

                <div className='w-full py-8 flex-col text-7xl'>
                    <div className='flex justify-center gap-12'>
                        <div className='flex-col px-4 py-2 rounded-lg hover:bg-blue-gray-100 cursor-pointer' onClick={() => handleClick("plain_text")}>
                            <GrTextAlignLeft className='mx-auto' />
                            <p className='text-lg font-bold text-center'>Plain Text</p>
                        </div>
                        <div className='flex-col px-4 py-2 rounded-lg hover:bg-blue-gray-100 cursor-pointer' onClick={() => handleClick("python")}>
                            <FaPython className='mx-auto' />
                            <p className='text-lg font-bold text-center'>Python</p>
                        </div>
                        <div className='flex-col px-4 py-2 rounded-lg hover:bg-blue-gray-100 cursor-pointer' onClick={() => handleClick("javascript")}>
                            <SiJavascript className='mx-auto' />
                            <p className='text-lg font-bold text-center'>JavaScript</p>
                        </div>
                    </div>
                    <div className='flex justify-center gap-12 mt-8 text-7xl'>
                        <div className='flex-col px-4 py-2 rounded-lg hover:bg-blue-gray-100 cursor-pointer' onClick={() => handleClick("html")}>
                            <FaHtml5 className='mx-auto' />
                            <p className='text-lg font-bold text-center'>HTML</p>
                        </div>
                        <div className='flex-col px-4 py-2 rounded-lg hover:bg-blue-gray-100 cursor-pointer' onClick={() => handleClick("java")}>
                            <FaJava className='mx-auto' />
                            <p className='text-lg font-bold text-center'>Java</p>
                        </div>
                        <div className='flex-col px-4 py-2 rounded-lg hover:bg-blue-gray-100 cursor-pointer' onClick={() => handleClick("c++")}>
                            <SiCplusplus className='mx-auto' />
                            <p className='text-lg font-bold text-center'>C++</p>
                        </div>
                    </div>
                </div>

            </Dialog>
        </>
    )
}

export default NewNote
