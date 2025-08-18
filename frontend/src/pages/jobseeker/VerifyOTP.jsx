import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


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

// This component handles the email verification process.
const VerifyOTP = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const email = location.state?.email || "";
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(paste)) {
      const pasteArr = paste.split("");
      setCode((prev) => {
        const newCode = [...prev];
        for (let i = 0; i < pasteArr.length; i++) {
          newCode[i] = pasteArr[i];
        }
        return newCode;
      });
      if (paste.length < 6) {
        inputsRef.current[paste.length]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");

    console.log(code);
    console.log(otp);

    if (otp.length < 6) {
      setMessage("Please enter the 6-digit code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/email-verify-jobseeker/",
        { code: otp },
        {
          withCredentials: true, // 👈 send cookies (csrftoken, sessionid)
          headers: {
            "X-CSRFToken": getCookie("csrftoken"), // also include CSRF token
          },
        }
        
      );

      

      

      setMessage("Verification successful!");

      // Backend က response ထဲမှာ name နဲ့ token ထွက်လာမယ်လို့ ယူဆ
      const { token, name } = res.data;

      // Token သိမ်း
      localStorage.setItem("token", token || "mock-auth-token-12345");

      // Gmail display name သိမ်း
      if (name) {
        localStorage.setItem("displayName", name);
      }

      // Profile create page သို့ redirect
      navigate("/profile/me");
    } catch (err) {
      setMessage(err.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // message ကို ၅ စက္ကန့်ပြီးရင် ဖျောက်ဖို့
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter]">
      <header className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-900 select-none">
          Jobseeker
        </h1>
      </header>

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="bg-blue-50 rounded-xl p-8 w-full max-w-md shadow-md text-center">
          <p className="mb-4">Check Your email for a code</p>
          <p className="mb-6 text-sm">
            Enter the 6-digit code we sent to {email || "your email"}
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                autoComplete="one-time-code"
                aria-label={`OTP digit ${index + 1}`}
                placeholder="-"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>

          {message && (
            <p
              className={`mt-3 text-sm ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-4 text-sm text-gray-700">Back in sign in options</p>
        </div>
      </main>

      <footer className="h-12 flex items-center justify-center border-t border-gray-200 text-sm text-gray-500">
        © 2023 Copyright: Jobstreet .com
      </footer>
    </div>
  );
};

export default VerifyOTP;
