import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation';

import { NavbarDefault } from '../components/Navbar'
import SearchBar from '../components/SearchBar';
import NewNote from '../components/NewNote';

const HomePage = () => {
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
                        <NewNote />
                        <SearchBar/>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default HomePage
