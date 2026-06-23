import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    type: "",
    course: "",
    semester: "",
    subject: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

 const handleSubmit = async (e) => {
  // setLoading(true);
  e.preventDefault();
  if (!name.trim()) {
    alert("Please enter your name");
    return;
  }
  if (
    !file ||
    !formData.year ||
    !formData.type ||
    !formData.course ||
    !formData.semester ||
    !formData.subject
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const uploadData = new FormData();
    setLoading(true);
    uploadData.append("file", file);
    uploadData.append("uploader", name);
    uploadData.append("year", formData.year);
    uploadData.append("type", formData.type);
    uploadData.append("course", formData.course);
    uploadData.append("semester", formData.semester);
    uploadData.append("subject", formData.subject);

    const response = await fetch(
  "https://schoolprojectg.onrender.com/api/papers",
  {
    method: "POST",
    body: uploadData,
  }
);

console.log("STATUS:", response.status);

const text = await response.text();
console.log("RAW RESPONSE:", text);

let result;
try {
  // setLoading(false);
  result = JSON.parse(text);
} catch (err) {
  // setLoading(false);
  throw new Error("Backend is not returning JSON (check server error)");
}
console.log("RESULT:", result);
setSuccess(true);
// alert("Paper uploaded successfully!");h
setLoading(false);
// navigate("/");
navigate("/", { state: { refresh: true } });
  } catch (error) {
    setLoading(false);
  console.error("UPLOAD ERROR:", error);
  alert("Upload failed: " + error.message);
}
};

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-6 relative">
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
      >
        <ArrowLeft size={18} /> Back to Hub
      </button>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mt-12">
        <h1 className="text-3xl font-black text-slate-800 text-center mb-1">Upload Past Paper</h1>
        <p className="text-center text-slate-500 mb-8 text-sm">Help expand the student open archive collection database.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
              <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"/></div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Academic Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="e.g. 2024"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Exam Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 transition">
                <option value="">Select Type</option>
                <option value="Mid Semester">Mid Semester</option>
                <option value="End Semester">End Semester</option>
                <option value="Mid Internal">Mid Internal</option>
                <option value="End Internal">End Internal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Program Degree Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                placeholder="BCA, B.Tech, BBA, B.Sc..."
                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Semester Term</label>
              <select name="semester" value={formData.semester} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 transition">
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map(semIndex => (
                  <option key={semIndex} value={semIndex}>{semIndex}th Semester</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Course Subject Title Name</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g. Data Structures & File Layouts"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Attach File Dokumentation</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 bg-slate-50 transition flex flex-col items-center justify-center"
            >
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                <UploadCloud size={40} className="text-slate-400 mb-2" />
                <p className="text-base font-semibold text-slate-700">Drag & Drop file document path here</p>
                <p className="text-xs text-slate-400 mt-1">or click to browse local files</p>
              </label>

              {file && (
                <div className="mt-4 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold">
                  Target selection locked: {file.name}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 shadow-md transition duration-150 transform active:scale-[0.99]"
          >
            Submit to Hub Database
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;