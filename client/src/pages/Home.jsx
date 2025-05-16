import React from 'react'
import Hero from '../home/Hero'
import Recentelyadded from '../home/Recentelyadded'

const Home = () => {
  return (
    <div className='bg-gray-700 text-white px-10 py-8'>
     <Hero/>
     <Recentelyadded/>
    </div>
  )
}

export default Home
