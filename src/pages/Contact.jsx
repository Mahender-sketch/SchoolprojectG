
import React from "react";
import profilePic from "../assets/Snapchat-1089520344.jpg";
// import QRCode from "../assets/QR-Code.jpeg";
import qrCode from "../assets/QR-code.jpeg";
import Ayush from "../assets/Ayushphoto.jpeg";
import  { useState } from "react";
const Contact = () => {
    const [index, setIndex] = useState(0);
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
      }}
    >
      <div className="w-full m-60 max-w-5xl grid md:grid-cols-2 gap-10 items-center">

        {/* FLIP CARD */}
        <div className="group [perspective:1200px] w-full max-w-md">

          <div className="relative w-full h-[520px] transition-transform duration-700 [transform-style:preserve-3d] group-active:[transform:rotateY(180deg)]">

            {/* FRONT */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">

              <img
                src={profilePic}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-sky-400 object-cover"
              />

              <h2 className="mt-5 text-3xl font-bold text-white">
                Mahender Singh Gaira
              </h2>

              <p className="text-sky-400 mt-2 text-lg">
                Full Stack Developer
              </p>

              <p className="text-slate-300 mt-4 leading-relaxed">
                Developer and creator of this educational project.
                Responsible for both frontend and backend development.
              </p>

              {/* LINKS (NOW WORKING) */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">

                <a
                  href="https://github.com/Mahender-sketch"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
                >
                  GitHub
                </a>

                <a
                  href="https://www.instagram.com/mahender_singh_gaira/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
                >
                  Instagram
                </a>

                <a
                  href="https://www.linkedin.com/in/mahender-singh-a619a7241/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
                >
                  LinkedIn
                </a>
                <p className="text-slate-300 mt-4 leading-relaxed">Press hard</p>
              </div>
            </div>

            {/* BACK */}
            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]  rounded-3xl p-8 flex flex-col items-center justify-center text-center">

              <h3 className="text-2xl font-bold text-white mb-4">
                Google Pay QR
              </h3>

              {/* QR IMAGE */}
              <div className="w-[200px] h-[200px] bg-white p-2 rounded-xl  shadow-lg coverflow-hidden">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>

              {/* DONATE TEXT */}
              <p className="mt-5 text-white font-semibold">
                Donate if you want ❤️
              </p>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h3 className="text-sky-400 text-lg font-medium tracking-wide">
            Get in Touch
          </h3>

          <h1
            className="text-6xl md:text-7xl font-bold mt-2"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact
          </h1>

          <p className="text-slate-300 mt-6 text-lg leading-relaxed">
            I am the lead developer of this project and responsible
            for designing and building the platform.
          </p>

          <div className="mt-8 space-y-3">
            <p className="text-white">📧 Email: mhgaira@gmail.com</p>
            <p className="text-white">📱 Phone: +91 8859441173</p>
          </div>

          <a
            href="mailto:mhgaira@gmail.com"
            className="inline-block mt-8 bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition"
          >
            Send Email
          </a>

          <p className="text-slate-500 text-sm mt-10">
            © 2026 Mahender Singh Gaira. All Rights Reserved.
          </p>
        </div>

      </div>
       <div className="w-full max-w-5xl m-52 grid md:grid-cols-2 gap-10 items-center">

        {/* FLIP CARD */}
        <div className="group [perspective:1200px]  w-full max-w-md">

          <div className="relative w-full h-[520px] transition-transform duration-700 [transform-style:preserve-3d] group-active:[transform:rotateY(180deg)]">

            {/* FRONT */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">

              <img
                src={Ayush}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-sky-400 object-cover"
              />

              <h2 className="mt-5 text-3xl font-bold text-white">
                Ayush Kumar
              </h2>

              <p className="text-sky-400 mt-2 text-lg">
                Backend Developer
              </p>

              <p className="text-slate-300 mt-4 leading-relaxed">
                {/* Developer and creator of this educational project. */}
                Responsible for backend development.
              </p>

              {/* LINKS (NOW WORKING) */}
              <div className="flex flex-wrap justify-center flex-col  gap-4 mt-6">

                <a
                  href="https://www.instagram.com/ayush__kumar045/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600"
                >
                  Instagram
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h3 className="text-sky-400 text-lg font-medium tracking-wide">
            Get in Touch
          </h3>

          <h1
            className="text-6xl md:text-7xl font-bold mt-2"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact
          </h1>

          <p className="text-slate-300 mt-6 text-lg leading-relaxed">
            I am the backend developer of this project and responsible
            for building the backend infrastructure.
          </p>

          <div className="mt-8 space-y-3">
            <p className="text-white">📧 Email: ayushk89410@gmail.com</p>
            <p className="text-white">📱 Phone: +91 7579297202</p>
          </div>

          <a
            href="mailto:ayushk89410@gmail.com"
            className="inline-block mt-8 bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition"
          >
            Send Email
          </a>

          <p className="text-slate-500 text-sm mt-10">
            © 2026 Ayush Kumar. All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
