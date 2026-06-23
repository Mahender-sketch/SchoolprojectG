import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>

        <p className="text-gray-700 mb-4">
          This Past Papers Hub was created to help students access previous year
          exam papers in one simple platform.
        </p>

        <p className="text-gray-700 mb-4">
          It was built by students who wanted to solve the problem of scattered
          resources and make exam preparation easier.
        </p>

        <p className="text-gray-700">
          Goal: Free, simple, and accessible academic resource sharing for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;