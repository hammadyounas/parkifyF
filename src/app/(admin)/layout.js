"use client"
import {React,useEffect,useState} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { notFound,useRouter } from 'next/navigation';
import { Spin } from 'antd';
const layout = ({children}) => {

  const {push} = useRouter();
  const [spinVisible, setSpinVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
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
           notFound()
        
        }
    
        setSpinVisible(false)
      } catch (error) {
        
       push("/unauthorized")
        setSpinVisible(false)

      }
    };
  
    fetchData(); 
  }, []);
  
  
    return (
      <>
      <Spin spinning={spinVisible}>
        {!spinVisible && children}
      </Spin>
    </>
         
    
    );
  }
  
  
  export default layout
