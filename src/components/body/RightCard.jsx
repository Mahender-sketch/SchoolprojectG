import React, { useState } from 'react';
import { Heart, Download } from 'lucide-react';

const RightCard = ({ paper }) => {
  const [likes, setLikes] = useState(paper.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
 const deletePaper = async () => {
  try {
    const response = await fetch(
      `https://schoolprojectg.onrender.com/api/papers/${paper._id}`,
      {
        method: "DELETE",
        headers: {
          "admin-password": localStorage.getItem("adminPassword"),
        },
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (response.ok) {
      alert("Deleted successfully");
      window.location.reload();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
  const toggleLikeMetric = () => {
    setIsLiked(!isLiked);
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-[380px] h-[520px] bg-white border border-slate-200 shadow-md rounded-2xl flex flex-col flex-shrink-0 overflow-hidden hover:shadow-xl transition duration-300">

      
      <div className='flex p-4 items-center gap-3 border-b border-slate-100 bg-slate-50/70'>
        <div className='w-11 h-11 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-sm uppercase'>
          {paper.uploader?.[0] || "U"}
        </div>

        <div className='flex flex-col'>
          <h1 className='font-bold text-slate-800 text-sm'>
            {paper.uploader}
          </h1>

          <div className='flex gap-1 text-[11px] text-slate-400 font-bold uppercase'>
            <span>{paper.year}</span><span>|</span>
            <span>{paper.type}</span><span>|</span>
            <span>{paper.course}</span><span>|</span>
            <span>Sem {paper.semester}</span>
          </div>
        </div>
      </div>

      
      <div className='flex-1 m-4 rounded-xl border border-slate-200 overflow-hidden relative bg-slate-50'>

        {!showPreview ? (
          <div
            onClick={() => setShowPreview(true)}
            className="
              h-full flex flex-col items-center justify-center text-center cursor-pointer
              transition-all duration-300
              hover:scale-105 hover:shadow-xl hover:bg-slate-100
              active:scale-95
            "
          >
            <div className="bg-red-100 text-red-600 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase mb-3">
              PDF
            </div>

            <h3 className='font-black text-slate-700 text-lg px-3'>
              {paper.subject}
            </h3>

            <p className='text-xs font-semibold text-slate-400 mt-2 uppercase'>
              Tap to preview
            </p>
          </div>
        ) : (
          <>
            <iframe
              src={paper.fileUrl}
              className="w-full h-full"
            />


            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded shadow"
            >
              Close
            </button>
          </>
        )}
      </div>


      <div className='flex justify-between items-center p-4 bg-slate-50/70 border-t border-slate-100'>

        <div className="flex flex-col">
          <button
            onClick={toggleLikeMetric}
            className={`flex items-center gap-1.5 transition ${
              isLiked ? 'text-red-500 scale-105' : 'text-slate-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            <p className='text-sm font-bold text-slate-700'>{likes}</p>
          </button>

          <span className='text-[10px] text-slate-400 mt-1'>
            {paper.uploadDate}
          </span>
        </div>

           {localStorage.getItem("isAdmin") === "true" && (
  <button
    onClick={deletePaper}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold"
  >
    Delete
  </button>
)}
          <a
            href={paper.fileUrl}
            download
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5'
          >
            <Download size={14} /> Download
          </a>

        
      </div>
    </div>
  );
};

export default RightCard;