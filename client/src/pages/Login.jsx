import React, { useState } from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { FiArrowLeft, FiMail, FiLock, FiKey, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
  const [viewpass, setviewpass] = useState(false)
  const [viewNewPass, setViewNewPass] = useState(false)
  const [userinfo, setuserinfo] = useState({
    email: "",
    pass: "",
  })
  
  // Forgot Password state flow
  const [view, setView] = useState("login"); // "login", "forgot", "reset"
  const [resetEmail, setResetEmail] = useState("");
  const [forgotInfo, setForgotInfo] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [devOtp, setDevOtp] = useState(""); // Dev OTP helper

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const change = (e) => {
    const { name, value } = e.target;
    setuserinfo({ ...userinfo, [name]: value });
  }

  const changeForgot = (e) => {
    const { name, value } = e.target;
    setForgotInfo({ ...forgotInfo, [name]: value });
  }

  const submit = async () => {
    try {
      if (userinfo.email === "" || userinfo.pass === "") {
        alert("All fields are required");
        return;
      }
      const response = await axios.post("http://localhost:2000/bks/user/login", userinfo)

      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.prevuser.role))
      
      if (response.data.success) {
        localStorage.setItem("id", response.data.prevuser._id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.prevuser.role)
        navigate("/profile");
      } else {
        alert("Login failed: " + response.data.msg);
      }
    } catch (err) {
      const message = err.response?.data?.msg || err.message || "Login failed"
      alert(message)
      console.error(err)
    }
  }

  // Handle requesting password reset OTP
  const handleForgotRequest = async () => {
    try {
      if (resetEmail === "") {
        alert("Please enter your email address");
        return;
      }
      const response = await axios.post("http://localhost:2000/bks/user/forgot-password", { email: resetEmail });
      if (response.data.success) {
        alert("Verification code has been sent successfully!");
        if (response.data.developmentOtp) {
          setDevOtp(response.data.developmentOtp);
        }
        setView("reset");
      }
    } catch (err) {
      const message = err.response?.data?.msg || err.message || "Failed to initiate password reset";
      alert(message);
      console.error(err);
    }
  }

  // Handle resetting password with OTP
  const handleResetSubmit = async () => {
    try {
      if (forgotInfo.otp === "" || forgotInfo.newPassword === "" || forgotInfo.confirmPassword === "") {
        alert("All fields are required");
        return;
      }
      if (forgotInfo.newPassword !== forgotInfo.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      
      const response = await axios.post("http://localhost:2000/bks/user/reset-password", {
        email: resetEmail,
        otp: forgotInfo.otp,
        newPassword: forgotInfo.newPassword
      });

      if (response.data.success) {
        alert("Password reset successfully! Please sign in with your new password.");
        setView("login");
        setResetEmail("");
        setDevOtp("");
        setForgotInfo({ otp: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      const message = err.response?.data?.msg || err.message || "Failed to reset password";
      alert(message);
      console.error(err);
    }
  }

  return (
    <div className="min-h-[90vh] w-full px-6 py-12 flex items-center justify-center bg-zinc-900 text-zinc-100">
      <div className="bg-zinc-850 border border-zinc-750/50 w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6 transition-all duration-300">
        
        {/* VIEW: LOGIN FORM */}
        {view === "login" && (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-zinc-50 tracking-tight">Welcome Back</h2>
              <p className="text-sm text-zinc-400 mt-2">Sign in to your bookstore account</p>
            </div>

            <div className="space-y-4">
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
                <div className="flex justify-between items-center mt-1">
                  <label className="text-sm font-semibold text-zinc-400">Password</label>
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="text-xs text-blue-400 hover:text-blue-350 hover:underline font-semibold transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative mt-2">
                  <input
                    type={viewpass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    name="pass"
                    className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 pr-12 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-650 font-medium"
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

              <button
                onClick={submit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-sm tracking-wide mt-2"
              >
                Sign In
              </button>
            </div>

            <p className="text-zinc-500 text-center text-xs font-bold uppercase tracking-wider my-4">OR</p>

            <div className="text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-150">
                Sign up
              </Link>
            </div>
          </>
        )}

        {/* VIEW: FORGOT PASSWORD REQUEST */}
        {view === "forgot" && (
          <>
            <div>
              <button 
                onClick={() => setView("login")}
                className="text-zinc-400 hover:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer mb-4"
              >
                <FiArrowLeft /> Back to Login
              </button>
              <h2 className="text-2xl font-extrabold text-zinc-50 tracking-tight flex items-center gap-2">
                <FiKey className="text-blue-500" /> Recover Password
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Enter your email address below. We'll generate a verification code (OTP) to help you reset your password safely.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-zinc-400">Email Address</label>
                <div className="relative mt-2">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm pl-11 pr-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-650 font-medium"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleForgotRequest}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-sm tracking-wide mt-2"
              >
                Send Verification Code
              </button>
            </div>
          </>
        )}

        {/* VIEW: SUBMIT OTP & RESET PASSWORD */}
        {view === "reset" && (
          <>
            <div>
              <button 
                onClick={() => setView("forgot")}
                className="text-zinc-400 hover:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer mb-4"
              >
                <FiArrowLeft /> Back
              </button>
              <h2 className="text-2xl font-extrabold text-zinc-50 tracking-tight flex items-center gap-2">
                <FiLock className="text-blue-500" /> Reset Password
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Verification code sent to <span className="font-semibold text-zinc-300">{resetEmail}</span>. Enter the code and set your new password below.
              </p>
            </div>

            {/* Premium Dev Mode Banner */}
            {devOtp && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-400 font-medium">
                <FiAlertCircle className="text-sm mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">Sandbox Developer Helper:</p>
                  <p className="mt-1">
                    Your generated verification code is:{" "}
                    <span className="bg-zinc-950 px-2 py-0.5 rounded font-mono font-bold text-zinc-100 select-all tracking-wider ml-1">
                      {devOtp}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Verification Code input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-zinc-400">6-Digit Code (OTP)</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  name="otp"
                  maxLength={6}
                  className="w-full mt-2 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-650 font-mono tracking-widest text-center text-lg font-bold"
                  required
                  value={forgotInfo.otp}
                  onChange={changeForgot}
                />
              </div>

              {/* New Password input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-zinc-400">New Password</label>
                <div className="relative mt-2">
                  <input
                    type={viewNewPass ? 'text' : 'password'}
                    placeholder="Enter new password"
                    name="newPassword"
                    className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 pr-12 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-650 font-medium"
                    required
                    value={forgotInfo.newPassword}
                    onChange={changeForgot}
                  />
                  <button
                    type="button"
                    className="text-zinc-500 hover:text-zinc-300 absolute inset-y-0 right-0 flex items-center pr-4 text-xl transition-colors duration-150"
                    onClick={() => { setViewNewPass(!viewNewPass) }}
                  >
                    {viewNewPass ? <GoEyeClosed /> : <RxEyeOpen />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-zinc-400">Confirm New Password</label>
                <input
                  type={viewNewPass ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  name="confirmPassword"
                  className="w-full mt-2 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-650 font-medium"
                  required
                  value={forgotInfo.confirmPassword}
                  onChange={changeForgot}
                />
              </div>

              <button
                onClick={handleResetSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-sm tracking-wide mt-2"
              >
                Reset Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
