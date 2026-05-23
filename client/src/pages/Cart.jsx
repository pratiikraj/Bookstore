import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { MdDelete } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const [cartdata, setcartdata] = useState([]);
  const [totalprice, settotalprice] = useState(0);
  const navigate = useNavigate()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:2000/bks/user/getallcart", { headers })
      if (res.data.success) {
        setcartdata(res.data.data)
      }
    }
    fetch()
  }, [])

  const deletebookcart = async (bookid) => {
    try {
      const res = await axios.put(`http://localhost:2000/bks/user/deletebookcart/${bookid}`, {}, { headers })
      if (res.data.success) {
        setcartdata(cartdata.filter(item => item._id !== bookid));
      }
      alert(res.data.msg)
    } catch (error) {
      console.error("Error deleting book from cart:", error);
    }
  }

  useEffect(() => {
    if (cartdata && cartdata.length > 0) {
      let total = 0;
      cartdata.map((items) => {
        total += items.price
      })
      settotalprice(total);
    } else {
      settotalprice(0);
    }
  }, [cartdata])

  const placeorder = async () => {
    try {
      const res = await axios.post("http://localhost:2000/bks/user/placeorder", { order: cartdata }, { headers })
      alert(res.data.msg)
      navigate("/profile/orderhistory")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="h-auto min-h-screen bg-zinc-950 px-6 md:px-16 py-12 text-zinc-100">
      
      {!cartdata ? (
        <div className="flex h-[60vh] justify-center items-center">
          <Loader />
        </div>
      ) : cartdata.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl text-center backdrop-blur-md">
          <div className="p-4 bg-zinc-800/50 rounded-full border border-zinc-700/50 mb-4 text-blue-400 shadow-lg">
            <FiShoppingCart className="text-5xl" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Your Cart is Empty</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-sm leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our wide collection of great books!
          </p>
          <Link 
            to="/allbooks" 
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md active:scale-95 text-white font-bold rounded-xl transition-all duration-150 text-sm inline-block"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="w-full space-y-8 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="px-4 md:px-2 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-50">
                Shopping Cart
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Review your selected items before checking out.
              </p>
            </div>
            <div className="bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800/80 text-sm text-zinc-300 font-semibold shadow-md flex-shrink-0">
              Items: <span className="text-blue-400 font-bold ml-1">{cartdata.length}</span>
            </div>
          </div>

          {/* Cart Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartdata.map((item, i) => (
                <div 
                  key={i} 
                  className="w-full rounded-2xl flex flex-col sm:flex-row p-5 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-750/60 hover:bg-zinc-900 transition-all duration-300 shadow-xl justify-between items-center gap-6"
                >
                  <img 
                    className="h-32 w-24 object-cover rounded-xl shadow-md border border-zinc-700/60 flex-shrink-0"
                    src={item.imgurl}
                    alt={item.title}
                  />
                  <div className="flex-grow min-w-0 text-center sm:text-left">
                    <h1 className="text-xl font-bold text-zinc-100 truncate">{item.title}</h1>
                    <p className="text-sm text-zinc-400 mt-1.5 hidden md:line-clamp-2 line-clamp-1 leading-relaxed">
                      {item.desc || "No description available for this book."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 px-2 sm:px-0">
                    <h2 className="font-extrabold text-2xl text-zinc-50">₹ {item.price}</h2>
                    <button 
                      onClick={() => deletebookcart(item._id)} 
                      className="text-rose-400 hover:text-rose-300 p-3 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all duration-150 shadow-sm cursor-pointer"
                      title="Remove Item"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout / Summary Box */}
            <div className="h-fit">
              <div className="p-6 bg-zinc-900/80 backdrop-blur-lg border border-zinc-850/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100">Order Summary</h2>
                  <p className="text-xs text-zinc-400 mt-1">Order total and final checkout options.</p>
                </div>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Subtotal ({cartdata.length} items)</span>
                    <span className="font-semibold text-zinc-200">₹ {totalprice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Shipping Charges</span>
                    <span className="text-emerald-400 font-bold">FREE</span>
                  </div>
                  <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between text-lg font-bold text-zinc-50">
                    <span>Total Amount</span>
                    <span className="text-blue-400 text-xl font-extrabold">₹ {totalprice}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={placeorder} 
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)] active:scale-95 text-white font-bold rounded-xl transition-all duration-200 text-base text-center cursor-pointer"
                  >
                    Place Your Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;
