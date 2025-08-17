import React from 'react'
import { Route, Routes } from 'react-router-dom'
import JobRegister from './components/auth/RegisterJobseeker'
import JobSignin from './components/auth/SigninJobseeker.jsx'
import Verify from './components/auth/VerifyJobseeker.jsx'
import Home from './components/auth/Home'

function App() {
  return (
    <div>

      <Routes>
        <Route path="/register-jobseeker" element={<JobRegister />} />
        <Route path="/signin-jobseeker" element={<JobSignin />} />
        
        <Route path='/verify' element={<Verify />} />
        <Route path='/' element={<Home />} />
      </Routes>

    </div>
  )
}

export default App