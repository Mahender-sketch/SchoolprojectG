import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const response = await fetch(
      "https://schoolprojectg.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    if (response.ok) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminPassword", password);
      navigate("/");
    } else {
      alert("Wrong password");
    }
  } catch (error) {
    alert("Server error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Admin;