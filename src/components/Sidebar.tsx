import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, House, Info, Phone, Brain } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-5 left-5 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg transition"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#141414] text-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400">
            AI Quiz
          </h2>

          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-2">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
          >
            <House size={20} />
            Home
          </Link>

          <Link
            to="/about"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
          >
            <Info size={20} />
            About
          </Link>

          <Link
            to="/quiz"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
          >
            <Brain size={20} />
            Quiz
          </Link>

          <Link
            to="/contact"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
          >
            <Phone size={20} />
            Contact
          </Link>
          
           <Link
            to="/developer"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition"
          >
            <Phone size={20} />
            Developer
          </Link>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full px-6 text-center text-gray-400 text-sm">
          <p>AI Quiz Generator</p>
          <p className="text-blue-400 mt-1">
            Developed by KDSINGH 😊
          </p>
        </div>
      </aside>
    </>
  );
}