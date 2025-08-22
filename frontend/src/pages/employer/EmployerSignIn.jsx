import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const EmployerSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/login/jobseeker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed! Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login Success ✅:", data);

      // Token ကို localStorage ထဲသိမ်း
      localStorage.setItem("token", data.token);

      // Dashboard သို့ redirect
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Jobseeker
          </NavLink>
        </div>
      </header>

      {/* Sign In Box */}
      <div className="flex-grow flex justify-center items-center px-4">
        <div className="bg-blue-50 rounded-lg py-15 px-8 w-full max-w-xl shadow-md">
          <p className="text-center text-sm mb-1">
            Are you looking for an{" "}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              jobs?
            </Link>
          </p>
          <h2 className="text-center text-3xl font-extrabold mb-6">Sign In</h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {/* Forgot Password Link */}
              <div className="text-right mt-1">
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Forgot Password?
                </NavLink>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer Links */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Already have your account?{" "}
            <Link to="/employer/register" className="text-blue-600 hover:underline">
              Register
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

export default EmployerSignIn;
