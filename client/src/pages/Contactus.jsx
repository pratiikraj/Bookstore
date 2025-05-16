import React, { useState } from 'react'
// import {Player} from "lottie-react"
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
      // e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:2000/sendemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        });
  console.log(res.error)
        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Failed to send email.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the email.");
      }
    };
  
  return (
    <div className='bg-[#4823ad] h-screen flex flex-col gap-3 items-center justify-center   '>

     <div className='bg-purple-500 flex flex-col md:flex-row w-2/4 h-2/3 rounded-lg'>
      
      <div className='flex flex-col gap-3 w-1/2 mx-3' >
      <h1 className=' mt-4 font-semibold text-4xl text-purple-500  '>Get in Touch</h1>
        <div className=' w-full '>
          <label htmlFor=""> Name</label>
          <input value={emailData.by} onChange={handleChange} type="text" className='w-full p-2 bg-white rounded-lg text-purple-800 hover:border border-black' placeholder='your name' name='by'/>
        </div>
        <div>
        <label htmlFor=""> Mail</label>
          <input value={emailData.to} onChange={handleChange} type="email" className='w-full p-2 bg-white rounded-lg text-purple-800 '  placeholder='your email' name='to' />
        </div>
        <div>
        <label htmlFor=""> Message</label>
         <textarea value={emailData.text} onChange={handleChange} name="text" className='w-full p-2 bg-white rounded-lg text-purple-800 '  id="" rows={5} placeholder='Your message'></textarea>
        </div>
        <div>
          <button onClick={handleSubmit} className='w-1/3  bg-purple-600 hover:bg-purple-700 text-white  text-sm  rounded-full p-3  duration-300 transition-all hover:-translate-y-2'>Contact me</button>
        </div>
      </div>
      <div className='w-1/2'>
      <Lottie 
        autoplay 
        loop 
        animationData={Animationlotte} 
        style={{ width: "100%", height: "100%" }}
      /></div>
     </div>
    </div>
  )
}

export default Contactus
