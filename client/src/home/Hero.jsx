import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh]  flex flex-col  md:flex-row items-center justify-center'>
      <div className='w-full lg:w-3/6 flex   flex-col lg:items-start lg:justify-center gap-3 '>
      <h1 className='font-bold text-4xl lg:text-5xl  '>
        GET BEST BOOKS FROM GREAT MINDS 
      </h1>
      <p className='mt-5 text-pretty text-xl'>
        Explore our collection of must-read books, from timeless classics to the latest bestsellers, all curated to inspire and entertain. Find the perfect read for every interest on our website today!
      </p>
      <div className='mt-5'>
        <button className='p-3 border border-blue-500  rounded-full px-6 hover:bg-blue-600 duration-300 transition-all hover:translate-x-5 hover:transition-transform'>Discover </button>
      </div>
      
      </div>
      <div className=' w-full lg:w-3/6 h-auto lg:h-[100%] flex  lg:flex-col-reverse items-center justify-center  md:items-center  sm:flex-row   '>
    <p className=' font-serif text-xl text-rose-400 lg:hidden md:hidden absolute left-6 ml-4 border border-red-200 p-3 rounded-full'>Sale Now</p>
      <img className=' md:relative' src='../../public/hero.png ' alt='iimg'/>
      
      </div>
    </div>
  )
}

export default Hero
