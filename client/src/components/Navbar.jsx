import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links=[
        {
            title:"Home",
            link:"/"
        },
        {
            title:"Contact us",
            link:"/contactus"
        },
        {
            title:"All Books",
            link:"/allbooks"
        },
        {
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
            title:"Admin",
            link:"/profile"
        },
    ];

const isloggedin=useSelector((state)=>state.auth.isLoggedin);
console.log(isloggedin)
const role=useSelector((state)=>state.auth.role)
//console.log(isloggedin)
if(isloggedin===false){
    links.splice(3,3);
}
else if(isloggedin===true && role==="user") {
    links.splice(5,1);
} 
else if(isloggedin===true && role==="admin") {
    links.splice(3,2);
} 
// const filteredLinks = links.filter((item) => {
//     if (!isloggedin && (item.title === "Cart" || item.title === "Profile" || item.title === "Admin")) {
//         return false;
//     }
//     if (isloggedin && role === "user" && item.title === "Admin") {
//         return false;
//     }
//     if (isloggedin && role === "admin" && item.title === "Profile") {
//         return false;
//     }
//     return true;
// });
    const [mobilenav,setmobilenav]=useState("hidden")
  return (
    <>
     <nav className=' flex justify-between  relative z-50 bg-zinc-800 text-white px-8 py-3 items-center '>
    <Link to="/" className='flex gap-2 items-center'>
    <img className='h-6 w-7' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='bookimg'/>
    <h2 className='text-2xl font-semibold'>BOOKSCART</h2>
    </Link>
    <div className=' nav-links-bookheaven '> 
    <div className='hidden md:flex gap-3'>  { links.map((item,ind)=>(
        <>
        {/* { item.title==="profile" || item.title==="Admin"? (
           <Link to={item.link} className="hover:text-blue-600 duration-300 transition-all cursor-pointer" key={ind}>{item.title}</Link> 
        ):  */}
          <Link to={item.link} className="hover:text-blue-600 duration-300 transition-all cursor-pointer" key={ind}>{item.title}</Link>
           {/* } */}
        </>
 
    ))
     }</div> 
     <button className='text-white text-2xl  sm:block md:hidden  lg:hidden hover:text-blue-600' onClick={()=>{mobilenav==="hidden" ? setmobilenav("block"): setmobilenav("hidden")}}>
     <FaGripLines />
     </button>
    </div>
    {isloggedin===false && <div className=' flex gap-3'>
     <Link to="/login"><button onClick={()=>{mobilenav==="block"?setmobilenav("hidden"):setmobilenav("hidden")}} className=' px-2 py-1 rounded-md border border-blue-400 hover:bg-blue-600 duration-300 transition-all'>Login</button></Link>   
     <Link to="/signup"><button onClick={()=>{mobilenav==="block"?setmobilenav("hidden"):setmobilenav("hidden")}} className=' px-2 py-1 rounded-md border border-zinc-400 text-white hover:bg-white hover:text-black duration-300 transition-all'>signup</button></Link>   
    </div>}  
    </nav>
    
    <div className= {` ${mobilenav} h-auto bg-zinc-800 absolute w-full top-14 py-2  left-0 z-40 flex flex-col items-center text-white justify-center 1`} >
    { links.map((item,ind)=>{
return <Link to={item.link} 
onClick={()=>{mobilenav==="hidden" ? setmobilenav("block"): setmobilenav("hidden")}}
 className={`"hover:text-blue-600 duration-300 transition-all cursor-pointer py-2`}  key={ind}>{item.title}</Link>
        })
     } 
    </div>
    </>
   
  )
}

export default Navbar

// h-auto bg-zinc-800 absolute w-full top-0 py-2  left-0 z-40 flex flex-col items-center text-white justify-center 1