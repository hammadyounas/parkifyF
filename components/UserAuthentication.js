"use client"
import {React,useEffect} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import {useRouter, } from 'next/navigation';
const UserAuthentication= async({Component})=> {
   

      
        
            const {push} = useRouter();
         
              try {
                setSpinVisible(true)
                const token = Cookies.get('token')
                const response = await axios.get(
                  'https://parkify-backend.vercel.app/user/authenticateUser',
                  {
                    headers: {
                      Authorization: `bearer ${token}`,
                    },
                  }
                )
                
                  if(response.data.role != "admin"){
                      push("/unauthorized")
                      console.log(object)
                        return null;
                
                }
            
        return <Component {...props}/>
              } 
              catch (error) {
               push("/unauthorized")
               return null;
             
          
              }
            
        
          
          
          
             
    
    
    }
   
   
   
   
   
        
        
        
    
    export default UserAuthentication;