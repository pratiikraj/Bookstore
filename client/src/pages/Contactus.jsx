import React, { useState } from 'react'
import Lottie from "lottie-react"
import Animationlotte from "../assets/Animationlotte.json"

const Contactus = () => {
  const [emailData, setEmailData] = useState({
    by: "",
    to: "",
    desc: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (emailData.by === "" || emailData.to === "" || emailData.desc === "") {
        alert("All fields are required");
        return;
      }
      const response = await fetch("http://localhost:2000/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        setEmailData({ by: "", to: "", desc: "" });
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div className="min-h-[90vh] w-full bg-zinc-900 text-zinc-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-zinc-850 border border-zinc-750/50 flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 gap-8 items-center">
        
        {/* Left Form Panel */}
        <div className="flex-1 w-full space-y-5">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-50 tracking-tight">Get in Touch</h1>
            <p className="text-sm text-zinc-400 mt-2">Have a question or feedback? We'd love to hear from you.</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-zinc-400">Name</label>
              <input
                value={emailData.by}
                onChange={handleChange}
                type="text"
                name="by"
                className="w-full mt-1.5 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-zinc-400">Email Address</label>
              <input
                value={emailData.to}
                onChange={handleChange}
                type="email"
                name="to"
                className="w-full mt-1.5 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-zinc-400">Message</label>
              <textarea
                value={emailData.desc}
                onChange={handleChange}
                name="desc"
                className="w-full mt-1.5 bg-zinc-950 border border-zinc-750/50 text-zinc-100 text-sm px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none placeholder-zinc-600 font-medium resize-none"
                rows={5}
                placeholder="Tell us what you need help with..."
                required
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-sm tracking-wide"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Right Lottie Panel */}
        <div className="flex-1 w-full md:w-1/2 flex items-center justify-center p-4">
          <Lottie 
            autoplay 
            loop 
            animationData={Animationlotte} 
            style={{ width: "90%", height: "90%", maxWidth: "320px" }}
          />
        </div>

      </div>
    </div>
  )
}

export default Contactus
