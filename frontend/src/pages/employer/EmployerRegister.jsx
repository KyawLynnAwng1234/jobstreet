import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"; // 👉 react-router-dom မှာယူမယ်

const EmployerRegister = () => {
  const navigate = useNavigate(); // 👉 redirect အတွက်

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setMessage("❌ You must accept Terms & Conditions");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://192.168.130.155:8000/api/api/register-jobseeker/employer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        setMessage("✅ Registration successful!");

        // 👉 API verify အောင်မြင်ပြီးတာနဲ့ redirect
        setTimeout(() => {
          navigate("/employer/dashboard");
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage("❌ Error: " + JSON.stringify(errorData));
        console.error("Error:", errorData);
      }
    } catch (error) {
      setMessage("❌ Something went wrong: " + error.message);
      console.error("Catch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Jobseeker
          </NavLink>
        </div>
      </header>

      {/* Register Box */}
      <div className="flex-grow flex justify-center items-center px-4">
              <div className="bg-blue-50 rounded-lg py-15 px-8 w-full max-w-xl shadow-md">
                <p className="text-center text-sm mb-1">
                  Are you looking for an{" "}
                  <Link to="/sign-in" className="text-blue-600 hover:underline">
                    jobs?
                  </Link>
                </p>
                <h2 className="text-center text-3xl font-extrabold mb-6">Register as an employer</h2>

          {message && (
            <div className="mb-4 text-center text-sm text-red-600">
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-600">
                I accept the Terms & Conditions and Privacy Policy Of Farm Fresh
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already have your account?{" "}
            <Link
              to="/employer/sign-in"
              className="text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t">
        © 2023 Copyright: Jobstreet .com
      </footer>
    </div>
  );
};

export default EmployerRegister;
