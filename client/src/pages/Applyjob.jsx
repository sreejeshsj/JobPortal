import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert'
import moment from 'moment'
import Jobcart from '../components/Jobcart'
import Footer from '../components/Footer'
function Applyjob() {
  const {id}=useParams()
  const {jobs}=useContext(AppContext)
  const [jobData,setJobData]=useState(null)
  const fetchJob=()=>{
      const applyData= jobs.find((job)=>job._id === id)
      if (applyData.length !==0){
        setJobData(applyData)
        console.log(applyData)
      }
      
  }
  useEffect(()=>{
    if(jobs.length>0){
      fetchJob()
    }
    
  },[id,jobs])
  return jobData ? (
    <>
      <Navbar/>
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
               <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border ' src={jobData.companyId.image} alt="" />
               <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mtt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC : {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
               </div>
            </div>
            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button className='bg-blue-600 py-2.5 px-10 text-white rounded'>Apply Now</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4'>Job description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{__html:jobData.description}}></div>
              <button className='bg-blue-600 py-2.5 px-10 text-white rounded mt-10'>Apply Now</button>
            </div>
            {/*-------------------------right section--------------------------*/}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
                  <h2>More jobs from {jobData.companyId.name}</h2>
                  {
                    jobs.filter((job)=>job._id !== jobData._id && jobData.companyId._id===job.companyId._id ).
                    filter(job=>true).slice(0,4).
                    map((job,index)=>(<Jobcart key={index} job={job}/>))
                  }
            </div>
          </div>
        </div>
      </div>
     <Footer/>
    </>
  ) : <Loading/>
}

export default Applyjob
