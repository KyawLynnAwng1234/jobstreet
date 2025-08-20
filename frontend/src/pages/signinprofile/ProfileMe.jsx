import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

export default function ProfileMe() {
  const [profile, setProfile]= useState({
    name: "",
    location: "",
    email: "",
  });

  const sections = [
    {
      title: "Education",
      desc: "Tell us about your education level",
      btn: "Education",
    },
    { title: "Certifications", btn: "Certifications" },
    { title: "Skills", btn: "Your Skills" },
    { title: "Language", btn: "Proficient language" },
  ];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#002366] to-[#003AB3] text-white py-8">
        <div className="container mx-auto px-4 h-[300px]">
          <div className="flex flex-col w-full h-full justify-center items-start">
            <h1 className="text-3xl font-bold mb-2 text-[#ffffffcf]">
              {profile.name || "Profile Name"}
            </h1>
            <div className="flex justify-center items-center space-x-2 py-1">
              <FaLocationDot />
              <p className="text-[#ffffffcf]">
                {profile.location || "Location"}
              </p>
            </div>
            <div className="flex justify-center items-center space-x-2 py-1">
              <CiMail />
              <p className="text-[#ffffffcf]">
                {profile.email || "user@gmail.com"}
              </p>
            </div>
            <button className="border rounded-xl p-1.5 my-4 text-[#ffffffcf]">
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 py-6">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Summary */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Summary (Job Purpose)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Write your job purpose..."
                  className="w-full border border-[#0D74CE] rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <span className="absolute right-3 top-2 text-gray-500">✎</span>
              </div>
            </div>

            {/* Dynamic Sections */}
            {sections.map((item, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                {item.desc && (
                  <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
                )}
                <button className="border border-[#0D74CE] text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                  {item.btn}
                </button>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3 bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Resume</h2>
            <div className="flex flex-col gap-4 justify-start items-start">
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Upload your resume and cover letter.
                </p>
                <button className="border border-blue-400 text-blue-600 p-1.5 rounded-lg mb-4 hover:bg-blue-50">
                  Add Resume
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Create your resume for the job.
                </p>
                <button className="bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700">
                  Create Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
