"use client"

import { useEffect,useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {Spin} from 'antd';
import Cookies from 'js-cookie';
import AuthPage from "../../components/AuthPage/AuthPage";
export default function Home() {
  const router = useRouter();
 const [spinVisible, setSpinVisible] = useState(false);
 useEffect(()=>{
  const fetchData = async () => {
    try {
        setSpinVisible(true)

      const token = Cookies.get('token')
      await axios.get(
        'http://localhost:3333/user/authenticateUser',
        {
          headers: {
            Authorization: `bearer ${token} 1710488203993`,
          },
        }
      ).then(response=>{
        console.log(response.status)
        if(response.status===200 && response.data.role ==='user'){
           
          router.push('/home')
         
        }
        else if(response.status===200 && response.data.role ==='admin'){
            

          router.push('/adminhome')
        }
        setSpinVisible(false)

      }).catch(error=>{
        setSpinVisible(false)

      })
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); 
 },[])
  return (
<Spin spinning={spinVisible}><AuthPage /></Spin>
  );
}
