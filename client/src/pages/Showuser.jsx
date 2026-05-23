import React from 'react'
import { IoClose } from 'react-icons/io5'

const Showuser = ({ userinfo, onClose }) => {
  if (!userinfo) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed top-0 left-0 h-screen w-full bg-zinc-950/70 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300">
        <div className="bg-zinc-900 border border-zinc-750/50 rounded-2xl w-full max-w-md text-zinc-100 shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-850 border-b border-zinc-800/80">
            <h1 className="text-xl font-bold tracking-wide text-zinc-200">Customer Details</h1>
            <button 
              onClick={onClose} 
              className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 p-1.5 rounded-lg transition-all duration-150"
              title="Close"
            >
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Body Info */}
          <div className="p-6 space-y-4">
            <div className="bg-zinc-850 p-4 rounded-xl border border-zinc-800/60">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Name</span>
              <span className="text-base font-semibold text-zinc-200">{userinfo.name || "N/A"}</span>
            </div>

            <div className="bg-zinc-850 p-4 rounded-xl border border-zinc-800/60">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Email Address</span>
              <span className="text-base font-semibold text-zinc-200 break-all">{userinfo.email || "N/A"}</span>
            </div>

            <div className="bg-zinc-850 p-4 rounded-xl border border-zinc-800/60">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Shipping Address</span>
              <span className="text-base font-semibold text-zinc-200 leading-relaxed block">{userinfo.address || "No address provided."}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-zinc-850 border-t border-zinc-800/80 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-sm font-semibold rounded-xl transition-all duration-150"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Showuser

