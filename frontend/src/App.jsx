import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import JobSearch from './pages/JobSearch'
import Profile from './pages/Profile'

// Auth JobSeeker
import SignIn from './pages/jobseeker/SignIn'
import Register from './pages/jobseeker/Register'
import VerifyOTP from './pages/jobseeker/VerifyOTP'
import ProfileMe from './pages/signprofile/ProfileMe'
import Companies from './pages/Companies'


function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='job-search' element={<JobSearch />} />
          <Route path='profile' element={<Profile />} />
          <Route path='companies' element={<Companies />} />

          {/* Auth Jobseeker */}
          <Route path='profile/me' element={<ProfileMe />} />
        </Route>

        {/* Jobseeker Auth */}
          <Route path='sign-in' element={<SignIn />} />
          <Route path='register' element={<Register />} />
          <Route path='verify' element={<VerifyOTP />} />
      </Routes>

    </div>
  )
}

export default App