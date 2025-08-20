import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import JobSearch from "./pages/JobSearch";
import Profile from "./pages/Profile";

// Auth JobSeeker
import SignIn from "./pages/jobseeker/SignIn";
import Register from "./pages/jobseeker/Register";
import VerifyOTP from "./pages/jobseeker/VerifyOTP";
import Companies from "./pages/Companies";
import ProfileMe from "./pages/signinprofile/ProfileMe";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Import AuthProvider
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // ✅ Wrap whole app with AuthProvider
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="job-search" element={<JobSearch />} />
          <Route path="profile" element={<Profile />} />
          <Route path="companies" element={<Companies />} />

          {/* ✅ ProfileMe ကို login ဝင်မှသာ ရမယ် */}
          <Route
            path="profile/me"
            element={
              <ProtectedRoute>
                <ProfileMe />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Jobseeker Auth */}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<VerifyOTP />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
