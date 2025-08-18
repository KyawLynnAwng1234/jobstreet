import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate, NavLink } from "react-router-dom";

// This is the main component for the Sign In page.
// It handles user input for email, calls a backend API to send a sign-in code,
// and manages the UI state (loading, messages).
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


  // Function to handle the sign-in logic
  const handleSignIn = async () => {
    // Basic validation to ensure the email field is not empty
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // The API endpoint is a placeholder. You should replace this with your
      // actual sign-in or code-sending endpoint.
      // The user's provided API call seems to be a registration endpoint,
      // so this is a crucial area to check and update.
      const res = await fetch("http://127.0.0.1:8000/api/signin-jobseeker/job-seeker/", {
        method: "POST",
        credentials: "include",  // <-- This sends cookies!
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie('csrftoken') ,
        },
       
        body: JSON.stringify({ email }),
      });


      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setMessage("Sign-in code sent to your email!");

      // Navigate to the verification page, passing the email as state.
      // This is the same logic as the user's original code, which is
      // appropriate for an email-based sign-in flow.
      navigate("/verify", { state: { email } });
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header section with the brand name */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Jobseeker
          </NavLink>

        </div>
      </header>

      {/* Main content area containing the sign-in form */}
      <main className="flex-grow flex justify-center items-center px-4">
        <div className="bg-blue-50 rounded-lg p-8 w-full max-w-md shadow-md">
          <p className="text-center text-sm mb-1">
            Are you looking for an{" "}
            <a href="#" className="text-blue-600 hover:underline">
              employer?
            </a>
          </p>
          <h2 className="text-center text-3xl font-extrabold mb-6">SignIn</h2>

          {/* Email input field */}
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          {/* Button to send the sign-in code */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Sending..." : "Email me sign in code"}
          </button>

          {/* Display messages to the user */}
          {message && (
            <p
              className={`mt-3 text-center text-sm ${message.includes("sent") ? "text-green-600" : "text-red-600"
                }`}
            >
              {message}
            </p>
          )}

          {/* Divider between email and social login options */}
          <div className="flex items-center my-6 text-sm text-gray-600">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 whitespace-nowrap">
              Or another continue With
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social login buttons */}
          <button className="w-full mb-3 flex items-center justify-center gap-2 border border-gray-400 rounded-lg py-2 hover:bg-gray-100 transition-colors shadow-sm">
            {/* Replaced the single-colored FaGoogle icon with a multi-colored SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="google-icon"
            >
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
            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-lg py-2 hover:bg-gray-100 transition-colors shadow-sm">
            <FaFacebook size={20} color="#1877F2" />
            <span className="font-medium text-gray-700">
              Continue with Facebook
            </span>
          </button>

          {/* Link for users who don't have an account */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Already have{" "}
            <span className="text-gray-900 font-semibold">your</span> account ?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </main>

      {/* Footer section */}
      <footer className="h-12 flex items-center justify-center border-t border-gray-200 text-sm text-gray-500">
        © 2023 Copyright: Jobstreet .com
      </footer>
    </div>
  );
};

export default SignIn;
