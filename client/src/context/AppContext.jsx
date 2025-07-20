import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser,useAuth } from "@clerk/clerk-react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplicatios] = useState([]);
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/`);
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  //function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
       
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  //  Fun to fetch user data
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(data.success){
       
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  };

  //get user applied jobs
  const fetchUserApplications=async ()=>{
    try{
      const token= await getToken()

      const {data}=await axios.get(`${backendUrl}/api/users/applications`,{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        
        setUserApplicatios(data.applications)
      }else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error(err.message)
    }
  }
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();

    }
  }, [companyToken]);

  useEffect(()=>{
      if(user){
        fetchUserData()
        fetchUserApplications()
      }
  },[user])

  const value = {
    setSearchFilter,
    setIsSearched,
    searchFilter,
    isSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    navigate,
    userData,setUserData,
    userApplications,setUserApplicatios,
    fetchUserData,fetchUserApplications
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
