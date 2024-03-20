"use client"
import {React,useEffect,useState} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { notFound } from 'next/navigation';

const layout = ({children}) => {
 
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
          if(response.data.role !== "user"){
        notFound()  
        }
       
        
      } catch (error) {
        notFound();


      }
    };
  
    fetchData(); // Call the fetchData function
  }, []);
  
  
    return (
     <>
     {children}
     
     </>
         
    
    );
  }
  
  
  export default layout
