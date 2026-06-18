import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Nav = () => {
  const navigate = useNavigate();
const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="Kumaun University Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-lg font-black text-slate-800 leading-tight">Kumaun University</h1>
              <p className="text-xs text-slate-400 font-bold tracking-wide uppercase">Past Papers Hub</p>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-8">
          <ul className="hidden sm:flex gap-6 text-slate-600 font-bold text-sm">
            <li><button
  onClick={() => {
  if (window.location.pathname === "/") {
    window.location.reload();
  } else {
    navigate("/");
  }
}}
  className="font-bold text-sm"
>
  Home
</button></li>
            <li><Link to="/about" className="font-bold text-sm">
  About
</Link></li>
            <li><Link to="/contact" className="font-bold text-sm">
  Contact
</Link></li>
{!isAdmin && (
  <li>
    <Link to="/admin" className="font-bold text-sm">
      Login
    </Link>
  </li>
)}
          </ul>
          <button 
            type="button" 
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-sm"
          >
            Upload Paper
          </button>
          {isAdmin && (
  <button
    onClick={() => {
      localStorage.removeItem("isAdmin");
      window.location.reload();
    }}
    className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
  >
    Logout
  </button>
)}
        </nav>
      </div>
    </header>
  );
};

export default Nav;