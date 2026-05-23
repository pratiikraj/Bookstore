import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { FiTrash2, FiSearch, FiMail, FiUser, FiCalendar, FiMessageSquare } from "react-icons/fi";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:2000/bks/admin/getallmessages",
        { headers }
      );
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:2000/bks/admin/deletemessage/${id}`,
        { headers }
      );
      if (res.data.success) {
        alert("Message deleted successfully!");
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message.");
    }
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter((msg) => {
    const term = searchTerm.toLowerCase();
    return (
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.message.toLowerCase().includes(term)
    );
  });

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const colors = [
    "bg-red-500/10 text-red-400 border border-red-500/20",
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    "bg-green-500/10 text-green-400 border border-green-500/20",
    "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    "bg-pink-500/10 text-pink-400 border border-pink-500/20",
    "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  ];

  return (
    <div className="h-auto min-h-screen bg-transparent p-0 md:p-6 text-zinc-100">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-2 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-3">
            <FiMessageSquare className="text-blue-500" />
            Contact Messages
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            View, search, and manage incoming user inquiries from the "Contact Us" form.
          </p>
        </div>
        <div className="bg-zinc-850 px-4 py-2.5 rounded-xl border border-zinc-750/50 text-sm text-zinc-300 font-semibold self-start md:self-auto shadow-md">
          Total Inquiries: <span className="text-blue-400 font-bold ml-1">{messages.length}</span>
        </div>
      </div>

      {/* Control Bar (Search Input) */}
      <div className="mb-6 px-4 md:px-2">
        <div className="relative max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <FiSearch className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search by name, email, or message keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-850 border border-zinc-750/50 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none shadow-md font-medium"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex h-[50vh] justify-center items-center">
          <Loader />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-zinc-850/30 rounded-2xl border border-zinc-750/40 p-8 shadow-inner text-center mx-4 md:mx-2">
          <div className="bg-zinc-800/40 p-4 rounded-full border border-zinc-750/30 mb-4">
            <FiMessageSquare className="h-10 w-10 text-zinc-500" />
          </div>
          <p className="text-xl font-semibold text-zinc-300">
            {searchTerm ? "No matching messages found." : "No contact messages yet."}
          </p>
          <p className="text-sm text-zinc-500 mt-1 max-w-sm">
            {searchTerm
              ? "Try adjusting your search terms or keywords to find what you are looking for."
              : "When users reach out to you via the Contact Us form, their messages will display here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 px-4 md:px-2">
          {filteredMessages.map((msg, index) => {
            const colorClass = colors[index % colors.length];
            const formattedDate = new Date(msg.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg._id}
                className="bg-zinc-850 border border-zinc-750/50 hover:border-zinc-700/80 rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 relative group overflow-hidden"
              >
                {/* Visual Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Card Header (Initials avatar + name & date) */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center font-extrabold text-sm ${colorClass} shadow-md`}
                      >
                        {getInitials(msg.name)}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-zinc-100 flex items-center gap-1.5 leading-snug">
                          <FiUser className="text-xs text-zinc-500" />
                          {msg.name}
                        </h2>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-blue-400 hover:underline flex items-center gap-1.5 mt-1 font-medium break-all"
                        >
                          <FiMail className="text-xs" />
                          {msg.email}
                        </a>
                      </div>
                    </div>

                    {/* Delete Action Icon Button */}
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-zinc-500 hover:text-red-400 p-2 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all duration-200 self-start md:self-auto cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>

                  {/* Message Content */}
                  <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 mt-3">
                    <p className="text-sm text-zinc-300 leading-relaxed font-medium whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>
                </div>

                {/* Card Footer (Timestamp) */}
                <div className="flex items-center gap-2 mt-5 text-[11px] text-zinc-500 font-semibold border-t border-zinc-800/40 pt-4">
                  <FiCalendar className="text-xs" />
                  <span>Submitted: {formattedDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
