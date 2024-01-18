import React from 'react'
import axios from 'axios'


const SearchBar = () => {

    const handleClick = async () => {
        let note_id = document.getElementById('input_id').value

        let response = await axios.get(`http://localhost:8000/exists/${note_id}`)
            .then((response) => {
                // Success
                console.log(response)
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

        <div className='flex px-6 bg-white rounded-full'>
            <input type='text' id='input_id' placeholder='your note ID' className='rounded-full focus:outline-none font-normal' />
            <button className='rounded-full' onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
        
    )
}

export default SearchBar
