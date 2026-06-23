import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RightCard from './RightCard';
import SkeletonCard from './SkeletonCard'; // Imported the new Skeleton element

const MOCK_DATASET_PAPERS = [
  { id: 1, uploader: "Mahender", year: "2024", type: "End Semester", course: "BCA", semester: "4", subject: "Advanced Java Programming", likes: 32, uploadDate: "12/05/2024" },
  { id: 2, uploader: "Chandra", year: "2023", type: "Mid Semester", course: "B.Tech", semester: "2", subject: "Engineering Mathematics-II", likes: 14, uploadDate: "20/03/2024" },
  { id: 3, uploader: "Amit Singh", year: "2025", type: "Sessional", course: "BBA", semester: "1", subject: "Principles of Management", likes: 8, uploadDate: "15/01/2026" },
  { id: 4, uploader: "Gaurav Gaira", year: "2024", type: "End Semester", course: "BCA", semester: "6", subject: "Computer Graphics and Animation", likes: 45, uploadDate: "18/06/2024" }
];

const RightSection = ({ papers, loading }) => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    year: "",
    type: "",
    course: "",
    semester: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ year: "", type: "", course: "", semester: "" });
  };

  // Safe fallback configurations so arrays don't break during fetch states
  const sourcePapers = !loading && papers && papers.length > 0 ? papers : (loading ? [] : MOCK_DATASET_PAPERS);

  const years = [...new Set(sourcePapers.map((p) => p.year))];
  const types = [...new Set(sourcePapers.map((p) => p.type))];
  const courses = [...new Set(sourcePapers.map((p) => p.course))];

  const filteredPapers = sourcePapers.filter((paper) => {
    return (
      (filters.year === "" || paper.year === filters.year) &&
      (filters.type === "" || paper.type === filters.type) &&
      (filters.course === "" || paper.course === filters.course) &&
      (filters.semester === "" || paper.semester === filters.semester)
    );
  });

  return (
    <div className="w-full md:w-3/4 flex flex-col h-full bg-slate-50" >
      
      {/* FILTER CONTROLS */}
      <div className='p-6 bg-white border-b border-gray-200 flex flex-wrap items-center gap-3 shadow-sm'>
        <span className="font-bold text-slate-400 uppercase text-xs tracking-wider mr-2">Quick Filters:</span>
        
        <select name="year" value={filters.year} onChange={handleFilterChange} disabled={loading} className="border border-gray-300 p-2.5 rounded-xl text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-60">
          <option value="">All Years</option>
          {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>

        <select name="type" value={filters.type} onChange={handleFilterChange} disabled={loading} className="border border-gray-300 p-2.5 rounded-xl text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-60">
          <option value="">All Exam Types</option>
          {types.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>

        <select name="course" value={filters.course} onChange={handleFilterChange} disabled={loading} className="border border-gray-300 p-2.5 rounded-xl text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-60">
          <option value="">All Courses</option>
          {courses.map((course) => <option key={course} value={course}>{course}</option>)}
        </select>

        <select name="semester" value={filters.semester} onChange={handleFilterChange} disabled={loading} className="border border-gray-300 p-2.5 rounded-xl text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-60">
          <option value="">All Semesters</option>
          {[1,2,3,4,5,6,7,8].map(termNum => (
            <option key={termNum} value={termNum}>{termNum}th Semester</option>
          ))}
        </select> 

        {(filters.year || filters.type || filters.course || filters.semester) && (
          <button onClick={clearAllFilters} className="text-xs text-red-500 font-bold hover:underline ml-auto bg-red-50 px-3 py-2 rounded-lg">
            Reset Filters
          </button>
        )}
      </div>

      {/* LAYOUT CATALOG GRID CONTAINER */}
      <div className="flex-1 p-6 overflow-x-auto flex items-center gap-6 min-h-[500px]">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filteredPapers.length > 0 ? (
          filteredPapers.map(item => (
            <RightCard key={item._id || item.id} paper={item} />
          ))
        ) : (
          <div className="w-full text-center py-16 text-slate-400 font-bold border border-dashed border-slate-300 rounded-2xl bg-white m-4">
            No papers found matching the specified parameters.
          </div>
        )}
      </div>

      {/* FOOTER INTERACTION BANNER */}
      <div className='m-6 bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg gap-4' >
        <div>
          <h1 className='text-white text-lg font-bold' >Support other students? Upload your paper here!</h1>
          <p className='text-slate-400 text-xs mt-0.5'>Contribute exam logs to enrich the common repository catalog grid.</p>
        </div>
        <button 
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow transition whitespace-nowrap active:scale-95' 
          onClick={() => navigate("/upload")}
        >
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default RightSection;
