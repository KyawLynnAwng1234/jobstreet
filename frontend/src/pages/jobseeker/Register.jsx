import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const { register, loading, message } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo */}
      <div className="absolute top-6 left-10">
        <h1 className="text-2xl font-bold text-blue-900">Jobseeker</h1>
      </div>

      {/* Register Card */}
      <div className="bg-[#f9fcff] p-8 rounded-xl shadow w-full max-w-md">
        <p className="text-center text-sm text-gray-500 mb-2">
          Are you looking for an{" "}
          <Link to="/employer" className="text-blue-600 hover:underline">
            employer?
          </Link>
        </p>
        <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
        {/* Email input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => register(email)}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Email me register code"}
        </button>
        {/* Error or info message */}
        {message && (
          <p className="mt-3 text-center text-sm text-red-600">{message}</p>
        )}
        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">
            Or continue with
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>
        {/* Google / Facebook */}
        <button className="w-full mb-3 flex items-center justify-center gap-2 border border-gray-400 rounded-lg py-2 hover:bg-gray-100 transition-colors shadow-sm">
          {/* Google SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M22.56 12.238c0-.783-.07-1.542-.204-2.28H12.02v4.316h6.05c-.266 1.455-1.047 2.68-2.28 3.518v2.812h3.627c2.126-1.956 3.35-4.83 3.35-8.366z"
              fill="#4285f4"
            />
            <path
              d="M12.02 23c2.815 0 5.176-.927 6.895-2.518l-3.628-2.812c-.99.66-2.257 1.055-3.267 1.055-2.502 0-4.636-1.688-5.385-3.958H2.74v2.898A11.964 11.964 0 0012.02 23z"
              fill="#34a853"
            />
            <path
              d="M6.635 15.65c-.13-.41-.202-.843-.202-1.298s.072-.888.202-1.297V9.756H2.74a11.963 11.963 0 000 7.488l3.895-1.604z"
              fill="#fbbc05"
            />
            <path
              d="M12.02 6.012c1.785 0 3.395.617 4.654 1.796L19.46 4.96c-1.644-1.506-3.89-2.457-6.908-2.457C9.206 2.503 6.845 3.43 5.126 5.021L8.98 7.919c.75-2.27 2.884-3.958 5.386-3.958z"
              fill="#ea4335"
            />
          </svg>
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Facebook */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
          <FaFacebook className="text-blue-600" /> Continue with Facebook
        </button>

        {/* Sign In */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-500">
        © 2023 Copyright: Jobstreet .com
      </footer>
    </div>
  );
};

export default Register;
