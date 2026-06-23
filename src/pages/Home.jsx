import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import LeftSection from '../components/body/LeftSection';
import RightSection from '../components/body/RightSection';
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [papers, setPapers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const fetchPapers = async () => {
  try {
    const res = await fetch("https://schoolprojectg.onrender.com/api/papers");
    const data = await res.json();
    setPapers(data);
  } catch (error) {
    console.error("Error fetching papers:", error);
  }
};

  useEffect(() => {
  fetchPapers();
}, []);
  return (
    <div className='min-h-screen w-full flex flex-col bg-slate-50'>
      <Nav />
      <div className='flex flex-col md:flex-row flex-1 w-full'>
        <LeftSection />
        <RightSection papers={papers} refresh={refresh} setRefresh={setRefresh} />
      </div>
      <footer className='h-[60px] w-full bg-slate-950 border-t border-slate-800
       text-slate-400 text-sm flex items-center justify-center'>
        <p>&copy; 2026 Past Papers Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;