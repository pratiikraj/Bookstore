import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Bookcard from '../components/Bookcard'

const Fav = () => {
  const [favbooks, setfavbooks] = useState(null)
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await axios.get("http://localhost:2000/bks/user/getfavbook", { headers })
        if (res.data.success) {
          setfavbooks(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching favourites:", error)
        setfavbooks([])
      }
    }
    fetch()
  }, [])

  return (
    <div className='w-full min-h-[70vh] flex flex-col justify-start text-zinc-100'>
      <h1 className='text-3xl font-extrabold text-zinc-50 mb-8 tracking-tight'>Your Favourites</h1>
      
      {favbooks === null && (
        <div className='w-full h-[50vh] flex justify-center items-center'>
          <Loader />
        </div>
      )}

      {favbooks !== null && favbooks.length === 0 && (
        <div className="h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-zinc-850/30 border border-zinc-800/50 rounded-2xl">
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-full p-5 mb-5 text-zinc-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-zinc-200 mb-2">No Favourites Added Yet</h2>
          <p className="text-zinc-400 max-w-sm mb-6 text-sm">Add books you love to your favourites to keep track of them here!</p>
          <Link to="/allbooks" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all duration-200 active:scale-95 text-sm">
            Browse Books
          </Link>
        </div>
      )}

      {favbooks !== null && favbooks.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-full'>
          {favbooks.map((item, i) => (
            <div key={i} className='w-full h-full flex justify-center'>
              <Bookcard books={item} fav={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Fav
