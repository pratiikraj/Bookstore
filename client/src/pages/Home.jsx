import React from 'react'
import Hero from '../home/Hero'
import Recentelyadded from '../home/Recentelyadded'

const Home = () => {
  return (
    <div className='bg-zinc-900 min-h-screen text-white px-6 md:px-16 py-8 flex flex-col gap-12'>
     <Hero/>
     <Recentelyadded/>
    </div>
  )
}

export default Home
