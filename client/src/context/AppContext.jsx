import {createContext,useEffect,useState} from 'react'
import { jobsData } from '../assets/assets'

export const AppContext = createContext()

 export const AppContextProvider = (props) =>{
    const [searchFilter,setSearchFilter]=useState({
        title:"",
        location:""
    })

    const [isSearched,setIsSearched]=useState(false)
    
    const [jobs,setJobs] = useState([])
    
    const fetchJobs=()=>{
        setJobs(jobsData)
    }

    useEffect(()=>{
        fetchJobs()
    },[])

    const value={
       setSearchFilter,setIsSearched,
       searchFilter,isSearched,
       jobs,setJobs

    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
 }