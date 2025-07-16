import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom' 
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Applications from './pages/Applications'
import Navbar from './components/Navbar'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
function App() {
  const {showRecruiterLogin}=useContext(AppContext)
  return (
    <div>
      {
        showRecruiterLogin && <RecruiterLogin/>
      }
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<Applyjob/>}/>  
        <Route path='/applications' element={<Applications/>}/> 
      </Routes>
    </div>
  )
}

export default App
