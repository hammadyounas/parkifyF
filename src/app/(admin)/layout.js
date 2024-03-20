"use client"
import {React,useEffect,useState} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { notFound,useRouter } from 'next/navigation';

const layout = ({children}) => {
  const [userAuthenticated,setUserAuthenticated]=useState(false)
  const {push} = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token')
        const response = await axios.get(
          'http://localhost:4000/user/authenticateUser',
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        )
        
          if(response.data.role != "admin"){
        notFound()  
        
        }
       else{
        setUserAuthenticated(true)
       }
        
      } catch (error) {
        
        (!userAuthenticated && push("/"))


      }
    };
  
    fetchData(); 
  }, []);
  
  
  return (
    <>
      
        {userAuthenticated && 
        {children} }
      
    </>
  );
  }
  
  
  export default layout
