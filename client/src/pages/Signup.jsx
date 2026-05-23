import React, { useState } from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [viewpass, setviewpass] = useState(false)
  const [userinfo, setuserinfo] = useState({
    name: "",
    email: "",
    pass: "",
    address: ""
  })
  const navigate = useNavigate()

  const change = (e) => {
    const { name, value } = e.target;
    setuserinfo({ ...userinfo, [name]: value });
  }

  const submit = async () => {
    try {
      if (userinfo.name === "" || userinfo.email === "" || userinfo.pass === "" || userinfo.address === "") {
        alert("All fields are required");
        return;
      }
      const response = await axios.post("http://localhost:2000/bks/user/signup", userinfo)

      if (response.data.success) {
        alert("Account created successfully! Please sign in.");
        navigate("/login");
      } else {
        alert("Signup failed: " + (response.data.msg || "Please try again."));
      }
    } catch (err) {
      const message = err.response?.data?.msg || err.message || "Signup failed"
      alert(message)
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen w-full px-6 py-12 flex items-center justify-center bg-zinc-900 text-zinc-100">
      <div className="bg-zinc-850 border border-zinc-750/50 w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-zinc-50 tracking-tight">Create Account</h2>
          <p className="text-sm text-zinc-400 mt-2">Get started with Antigravity Bookstore</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-zinc-400">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              name="name"
              className="w-full mt-2 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium"
              required
              value={userinfo.name}
              onChange={change}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-zinc-400">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              name="email"
              className="w-full mt-2 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium"
              required
              value={userinfo.email}
              onChange={change}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-zinc-400">Password</label>
            <div className="relative mt-2">
              <input
                type={viewpass ? 'text' : 'password'}
                placeholder="Create a strong password"
                name="pass"
                className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 pr-12 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium"
                required
                value={userinfo.pass}
                onChange={change}
              />
              <button
                type="button"
                className="text-zinc-500 hover:text-zinc-300 absolute inset-y-0 right-0 flex items-center pr-4 text-xl transition-colors duration-150"
                onClick={() => { setviewpass(!viewpass) }}
              >
                {viewpass ? <GoEyeClosed /> : <RxEyeOpen />}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-zinc-400">Shipping Address</label>
            <textarea
              placeholder="Enter your delivery address"
              rows={3}
              name="address"
              className="w-full mt-2 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium resize-none"
              required
              value={userinfo.address}
              onChange={change}
            />
          </div>

          <button
            onClick={submit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-sm tracking-wide mt-2"
          >
            Create Account
          </button>
        </div>

        <p className="text-zinc-500 text-center text-xs font-bold uppercase tracking-wider my-4">OR</p>

        <div className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-150">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
