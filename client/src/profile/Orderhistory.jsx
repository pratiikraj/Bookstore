import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const Orderhistory = () => {
  const [orderhistory, setOrderhistory] = useState(null)
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        let res = await axios.get("http://localhost:2000/bks/user/getorderhistory", { headers })
        if (res.data.success) {
          setOrderhistory(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching order history:", error)
        setOrderhistory([])
      }
    }
    fetchOrderHistory()
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case "order placed":
        return (
          <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide">
            Order Placed
          </span>
        )
      case "cancelled":
        return (
          <span className="bg-rose-500/10 border border-rose-500/20 text-rose-500 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide">
            Cancelled
          </span>
        )
      default:
        return (
          <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide">
            {status || "Completed"}
          </span>
        )
    }
  }

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-start">
      {orderhistory === null && (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {orderhistory !== null && orderhistory.length === 0 && (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
          <div className="bg-zinc-900 border border-zinc-800/80 rounded-full p-6 mb-6 text-zinc-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">No Order History</h2>
          <p className="text-zinc-400 mb-8 max-w-sm">You haven't placed any orders yet. Discover our collection and find your next favorite book!</p>
          <Link to="/allbooks" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 active:scale-95">
            Browse Books
          </Link>
        </div>
      )}

      {orderhistory !== null && orderhistory.length > 0 && (
        <div className="p-0 md:p-4 text-zinc-100 w-full">
          <h1 className="text-3xl font-extrabold text-zinc-50 mb-8 tracking-tight">Your Order History</h1>

          {/* Desktop Table View */}
          <div className="hidden md:block w-full">
            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl py-3 px-6 flex gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 items-center">
              <div className="w-[5%] text-center">Sr.</div>
              <div className="w-[25%]">Book Title</div>
              <div className="w-[40%]">Description</div>
              <div className="w-[12%] text-right">Price</div>
              <div className="w-[13%] text-center">Status</div>
              <div className="w-[5%] text-center">Mode</div>
            </div>

            <div className="space-y-2">
              {orderhistory.map((item, i) => {
                const book = item.book || {}
                return (
                  <div key={item._id || i} className="bg-zinc-850 hover:bg-zinc-800/60 border border-zinc-750/30 rounded-xl py-3.5 px-6 flex gap-4 items-center transition-all duration-200 hover:shadow-md hover:scale-[1.005] hover:border-zinc-700/50">
                    <div className="w-[5%] text-center font-mono text-sm text-zinc-500">
                      {i + 1}
                    </div>
                    <div className="w-[25%] truncate font-semibold text-zinc-100">
                      {book._id ? (
                        <Link to={`/viewbook/${book._id}`} className="hover:text-blue-400 transition-colors">
                          {book.title || "Unknown Book"}
                        </Link>
                      ) : (
                        <span className="text-zinc-500 italic">Deleted Book</span>
                      )}
                    </div>
                    <div className="w-[40%] text-sm text-zinc-400 truncate">
                      {book.desc || "No description available"}
                    </div>
                    <div className="w-[12%] text-right font-extrabold text-zinc-100">
                      {book.price ? `₹ ${book.price}` : "—"}
                    </div>
                    <div className="w-[13%] flex justify-center">
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="w-[5%] text-center font-bold text-xs text-zinc-500 uppercase">
                      COD
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {orderhistory.map((item, i) => {
              const book = item.book || {}
              return (
                <div key={item._id || i} className="bg-zinc-850 border border-zinc-750/50 rounded-2xl p-5 space-y-4 shadow-lg">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-mono font-bold text-zinc-500 block mb-1">ORDER #{i + 1}</span>
                      {book._id ? (
                        <Link to={`/viewbook/${book._id}`} className="text-base font-bold text-zinc-100 hover:text-blue-400 leading-snug line-clamp-1 block">
                          {book.title || "Unknown Book"}
                        </Link>
                      ) : (
                        <span className="text-zinc-500 italic font-semibold text-base block">Deleted Book</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-zinc-50 block">
                        {book.price ? `₹ ${book.price}` : "—"}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mt-0.5">COD Payment</span>
                    </div>
                  </div>

                  {book.desc && (
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {book.desc}
                    </p>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-zinc-800/80">
                    <span className="text-xs text-zinc-500 font-semibold">Status:</span>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Orderhistory
