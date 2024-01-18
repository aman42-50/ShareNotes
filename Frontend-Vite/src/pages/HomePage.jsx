import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation';

import { NavbarDefault } from '../components/Navbar'
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [searchBar, setSearchBar] = useState(false)
  return (
    <div className='h-full w-full bg-black'>

        <div className='h-full w-full bg-home-bg bg-cover bg-center opacity-80'>

            <NavbarDefault />

            <div className='mx-auto h-full flex-col text-white'>
                <div className='h-1/2 flex justify-center items-end'>
                    <div className='text-center flex-col justify-center items-end text-8xl font-black font-mono'>
                        <p>Share</p>
                        <TypeAnimation
                            sequence={['Text', 500, 'Code', 500, 'Notes', 5000]}
                            repeat={Infinity}
                        />
                    </div>
                </div>
                <div className='py-10 text-center mx-auto text-xl font-black font-mono'>
                    <p>
                        Share notes with your friends in real-time.
                    </p>
                    <div className='pt-10 flex gap-4 text-black justify-center'>
                        <div className='flex px-6 py-4 gap-2 bg-white rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p>New Note</p>
                        </div>
                        {searchBar ? (
                            <SearchBar />
                        ) : (
                            <div className='flex px-6 py-4 gap-2 bg-white rounded-xl cursor-pointer' onClick={()=>{setSearchBar(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <p>Search Note</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default HomePage
