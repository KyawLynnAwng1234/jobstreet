// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Env API
const API_URL = import.meta.env.VITE_API_URL;

// Cookie getter (CSRF token)
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

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // user info (name, email)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Register function
  const register = async (email) => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/register-jobseeker/job_seeker/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setMessage("Registration successful! Check your email for OTP.");
      navigate("/verify", { state: { email } });
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SignIn function
  const signIn = async (email) => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/signin-jobseeker/job-seeker/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setMessage("Sign-in code sent! Check your email.");
      navigate("/verify", { state: { email } });
    } catch (err) {
      console.error(err);
      setMessage("Sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOTP = async (otp, email) => {
    if (otp.length !== 6) {
      setMessage("Enter the 6-digit code.");
      return false;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${API_URL}/email-verify-jobseeker/`,
        { code: otp },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": getCookie("csrftoken") },
        }
      );

      const { token, name } = res.data;
      localStorage.setItem("token", token || "mock-auth-token-12345");
      if (name) setUser({ name, email });

      setMessage("Verification successful!");
      navigate("/profile/me");
      return true;
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Verification failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      axios
        .get(`${API_URL}/profile/`, { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        message,
        register,
        signIn,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => useContext(AuthContext);
