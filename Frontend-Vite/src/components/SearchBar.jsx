import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const SearchBar = () => {
    const navigate = useNavigate();
    const [searchBar, setSearchBar] = useState(false)

    const handleClick = async () => {
        let note_id = document.getElementById('input_id').value

        let response = await axios.get(`https://share-notes-api.vercel.app/exists/${note_id}`)
            .then((response) => {
                // Success
                let exists = response.data.exists
                console.log(exists)
                if (exists){
                    navigate(`/:${note_id}`)
                }
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
        { searchBar? (
            <div className='flex px-6 bg-white rounded-full'>
                <button className='rounded-full' onClick={() => {setSearchBar(false)}}>
                <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                >
                    <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
                </svg>
                </button>
                <input type='text' id='input_id' placeholder='your note ID' className='px-6 rounded-full focus:outline-none font-normal' />
                <button className='rounded-full' onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        ) : (
        <div className='flex px-6 py-4 gap-2 bg-white rounded-xl cursor-pointer' onClick={()=>{setSearchBar(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p>Search Note</p>
        </div>
        )}
        </>
    )
}

export default SearchBar
