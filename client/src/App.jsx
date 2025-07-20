import React, { useContext } from 'react'
import { Routes,Route } from 'react-router-dom' 
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Applications from './pages/Applications'
import Navbar from './components/Navbar'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Managejobs from './pages/Managejobs'
import ViewApplication from './pages/ViewApplication'
import Addjobs from './pages/Addjobs'
import 'quill/dist/quill.snow.css'
import {ToastContainer,toast} from 'react-toastify'
function App() {
  const {showRecruiterLogin,companyToken}=useContext(AppContext)
  return (
    <div>
      <ToastContainer/>
      {
        showRecruiterLogin && <RecruiterLogin/>
      }
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<Applyjob/>}/>  
        <Route path='/applications' element={<Applications/>}/> 
        <Route path='/dashboard' element={<Dashboard/>}> 
        {
          companyToken ? <><Route path='add-job' element={<Addjobs/>}/> 
          <Route path='manage-job' element={<Managejobs/>}/> 
          <Route path='view-applications' element={<ViewApplication/>}/> </>:null
        }
          
        </Route>
      </Routes>
    </div>
  )
}

export default App
