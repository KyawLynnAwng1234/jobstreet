import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import JobSearch from './pages/JobSearch'
import Profile from './pages/Profile'

import SignIn from './pages/jobseeker/SignIn'
import Register from './pages/jobseeker/Register'
import VerifyOTP from './pages/jobseeker/VerifyOTP'
// import JobRegister from './components/auth/RegisterJobseeker'
// import JobSignin from './components/auth/SigninJobseeker.jsx'
// import Verify from './components/auth/VerifyJobseeker.jsx'
// import Home from './components/auth/Home'

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='job-search' element={<JobSearch />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* Jobseeker Auth */}
          <Route path='sign-in' element={<SignIn />} />
          <Route path='register' element={<Register />} />
          <Route path='verify' element={<VerifyOTP />} />


        {/* <Route path="/register-jobseeker" element={<JobRegister />} />
        <Route path="/signin-jobseeker" element={<JobSignin />} />
        
        <Route path='/verify' element={<Verify />} />
        <Route path='/' element={<Home />} /> */}
      </Routes>

    </div>
  )
}

export default App