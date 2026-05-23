import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    address: ""
  })
  const [profileData, setProfileData] = useState(null)
  const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let res = await axios.get("http://localhost:2000/bks/user/view", { headers })
        if (res.data.success) {
          setProfileData(res.data.user)
          setFormData({
            name: res.data.user.name || "",
            avatar: res.data.user.avatar || "",
            address: res.data.user.address || ""
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const editUserInfo = async () => {
    try {
      const res = await axios.put("http://localhost:2000/bks/user/updateaddress", formData, { headers })
      if (res.data && res.data.msg) {
        alert(res.data.msg)
      } else {
        alert("Profile updated successfully!")
      }
      // Force page reload to instantly update all dashboard elements (Sidebar avatar, headers, etc.)
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-start">
      {!profileData && (
        <div className="w-full h-full flex justify-center items-center py-20">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="p-0 md:p-4 text-zinc-100 max-w-3xl w-full mx-auto">
          <h1 className="text-3xl font-extrabold text-zinc-50 mb-8 tracking-tight">Profile Settings</h1>
          
          <div className="bg-zinc-850 border border-zinc-750/50 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            
            {/* Live Avatar Preview Header */}
            <div className="flex flex-col items-center justify-center pb-6 border-b border-zinc-800/60">
              <div className="relative group">
                <img 
                  className="h-24 w-24 object-cover rounded-full border-4 border-zinc-700 shadow-2xl transition-all duration-300 group-hover:scale-105" 
                  src={formData.avatar || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
                  alt="Avatar Preview" 
                  onError={(e) => {
                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  }}
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-zinc-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-bold text-zinc-400 mt-3 uppercase tracking-wider">Live Avatar Preview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name..."
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-750/50 text-zinc-100 placeholder-zinc-500 font-semibold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Email Address (Read-only) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-zinc-400">Email Address</label>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5m-2.25 1.5h13.5c.621 0 1.125.504 1.125 1.125v7.497c0 .621-.504 1.125-1.125 1.125H4.125C3.504 21.75 3 21.246 3 20.625V13.12c0-.621.504-1.125 1.125-1.125z" />
                    </svg>
                    Locked
                  </span>
                </div>
                <p className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-400 font-semibold select-none text-sm cursor-not-allowed">
                  {profileData.email}
                </p>
              </div>

              {/* Avatar URL Input */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-zinc-400">Avatar Image URL</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="Paste profile picture URL..."
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-750/50 text-zinc-100 placeholder-zinc-500 font-semibold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Shipping Address Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-400">Shipping Address</label>
              <textarea
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-750/50 text-zinc-100 placeholder-zinc-500 font-semibold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm resize-none"
                rows={4}
                placeholder="Enter your delivery address..."
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800/60">
              <button
                onClick={editUserInfo}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
