import axios from 'axios'
import React, { useState } from 'react'

const Addbook = () => {
  const [data, setdata] = useState({
    imgurl: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    lang: "",
  })

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const change = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  }

  const submit = async () => {
    try {
      if (
        data.imgurl === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.lang === ""
      ) {
        alert("All fields are required")
      } else {
        const res = await axios.post("http://localhost:2000/bks/admin/addbook", data, { headers })
        if (res.status === 200) {
          alert("Book added successfully!")
          setdata({
            imgurl: "",
            title: "",
            author: "",
            price: "",
            desc: "",
            lang: ""
          })
        }
      }
    } catch (err) {
      console.log(err)
      alert(err.response?.data?.msg || "Something went wrong while adding the book.")
    }
  }

  return (
    <div className="h-auto bg-transparent p-0 md:p-6 text-zinc-100">
      <div className="w-full space-y-6 max-w-4xl">
        
        {/* Title Header */}
        <div className="px-4 md:px-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">
            Add Book
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Publish a new book listing to the bookstore catalog.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-850 border border-zinc-750/50 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
          
          {/* Image URL */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Book Cover Image URL
            </label>
            <input
              type="text"
              className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
              placeholder="Enter the direct URL of the book cover image (e.g., https://example.com/cover.jpg)"
              name="imgurl"
              required
              value={data.imgurl}
              onChange={change}
            />
          </div>

          {/* Book Title & Author Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Title of the Book
              </label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                placeholder="e.g., The Great Gatsby"
                name="title"
                required
                value={data.title}
                onChange={change}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Author of the Book
              </label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                placeholder="e.g., F. Scott Fitzgerald"
                name="author"
                required
                value={data.author}
                onChange={change}
              />
            </div>
          </div>

          {/* Language & Price Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Language
              </label>
              <input
                type="text"
                className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                placeholder="e.g., English, Spanish, Hindi"
                name="lang"
                required
                value={data.lang}
                onChange={change}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Price (in ₹)
              </label>
              <input
                type="number"
                className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm"
                placeholder="e.g., 499"
                name="price"
                required
                value={data.price}
                onChange={change}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Description of the Book
            </label>
            <textarea
              rows={5}
              className="w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm resize-none leading-relaxed"
              placeholder="Write a brief, compelling synopsis or summary of the book..."
              name="desc"
              required
              value={data.desc}
              onChange={change}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md active:scale-95 text-white font-bold rounded-xl transition-all duration-150 text-sm cursor-pointer"
              onClick={submit}
            >
              Add Book
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Addbook
