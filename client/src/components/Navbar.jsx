import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "All Books",
      link: "/allbooks"
    },
    {
      title: "Contact Us",
      link: "/contactus"
    },
    {
      title: "Cart",
      link: "/cart"
    },
    {
      title: "Profile",
      link: "/profile"
    },
    {
      title: "Admin",
      link: "/profile"
    },
  ];

  const isloggedin = useSelector((state) => state.auth.isLoggedin);
  const role = useSelector((state) => state.auth.role)
  const [mobilenav, setmobilenav] = useState("hidden")
  const [theme, setTheme] = useState(localStorage.getItem("bookstore-theme") || "dark")

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("bookstore-theme", nextTheme);
  };

  if (isloggedin === false) {
    links.splice(3, 3);
  } else if (isloggedin === true && role === "user") {
    links.splice(5, 1);
  } else if (isloggedin === true && role === "admin") {
    links.splice(3, 2);
  }

  return (
    <>
      <nav className="flex justify-between relative z-50 bg-zinc-900 border-b border-zinc-800/80 text-zinc-100 px-6 md:px-12 py-3.5 items-center shadow-lg transition-all duration-300">
        <Link to="/" className="flex gap-2 items-center hover:opacity-90 transition-opacity">
          <img className="h-7 w-8" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="bookimg" />
          <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-300 bg-clip-text text-transparent nav-logo-text">
            BOOKSTORE
          </h2>
        </Link>

        {/* Main Desktop Navbar Items */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-1.5 items-center">
            {links.map((item, ind) => (
              <Link 
                to={item.link} 
                className="text-sm font-semibold text-zinc-300 hover:text-zinc-50 px-3 py-2 rounded-xl hover:bg-zinc-800/60 transition-all duration-200" 
                key={ind}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Premium Sliding Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-between w-16 h-8 px-1.5 rounded-full bg-zinc-950/80 dark-toggle-btn border border-zinc-800/80 transition-all duration-300 cursor-pointer select-none active:scale-95 shadow-inner"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {/* Sliding indicator */}
              <div 
                className={`absolute top-[3px] h-[24px] w-[24px] rounded-full transition-all duration-300 ${
                  theme === 'light' 
                    ? 'left-[3px] bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' 
                    : 'left-[37px] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                }`}
              />
              <IoSunnyOutline className={`z-10 text-sm transition-all duration-300 ${theme === 'light' ? 'text-zinc-950 font-extrabold scale-110' : 'text-zinc-400'}`} />
              <IoMoonOutline className={`z-10 text-sm transition-all duration-300 ${theme === 'dark' ? 'text-zinc-50 font-extrabold scale-110' : 'text-zinc-500'}`} />
            </button>

            {/* Auth Actions */}
            {isloggedin === false && (
              <div className="hidden md:flex gap-3">
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-bold rounded-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white duration-200 transition-all cursor-pointer active:scale-95">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 text-sm font-bold rounded-xl bg-zinc-950 border border-zinc-750/50 hover:bg-zinc-100 hover:text-zinc-950 duration-200 transition-all cursor-pointer active:scale-95">
                    Signup
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Nav Toggle */}
            <button 
              className="text-zinc-300 text-xl md:hidden hover:text-blue-400 p-1.5 hover:bg-zinc-800/80 rounded-xl transition-all duration-150 cursor-pointer active:scale-95" 
              onClick={() => { mobilenav === "hidden" ? setmobilenav("block") : setmobilenav("hidden") }}
            >
              <FaGripLines />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      <div className={`${mobilenav} md:hidden h-auto bg-zinc-900 border-b border-zinc-800/80 shadow-2xl absolute w-full top-14 py-6 left-0 z-40 flex flex-col items-center gap-4 text-zinc-200 justify-center transition-all duration-300`} >
        {links.map((item, ind) => (
          <Link 
            to={item.link} 
            onClick={() => setmobilenav("hidden")}
            className="hover:text-blue-400 font-semibold duration-200 transition-all cursor-pointer py-1.5 text-base tracking-wide" 
            key={ind}
          >
            {item.title}
          </Link>
        ))}

        {isloggedin === false && (
          <div className="flex flex-col w-full px-8 gap-3 mt-4 pt-4 border-t border-zinc-800/80">
            <Link to="/login" onClick={() => setmobilenav("hidden")} className="w-full text-center">
              <button className="w-full py-2.5 text-sm font-bold rounded-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white duration-200 transition-all cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/signup" onClick={() => setmobilenav("hidden")} className="w-full text-center">
              <button className="w-full py-2.5 text-sm font-bold rounded-xl bg-zinc-950 border border-zinc-750/50 hover:bg-zinc-100 hover:text-zinc-950 duration-200 transition-all cursor-pointer">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar

// h-auto bg-zinc-800 absolute w-full top-0 py-2  left-0 z-40 flex flex-col items-center text-white justify-center 1