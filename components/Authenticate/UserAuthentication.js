"use client"
import { React, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Unauthorized from '../Unauthorized/Unauthorized';
import { usePathname } from 'next/navigation';
const UserAuthentication = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  const pathname = usePathname()
  const [loading, setLoading] = useState(true);
  console.log("UserAuthentication", userAuthenticated);
  useEffect(() => {
    console.log(pathname,'from Admin layout')
    async function checkAuthentication() {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(
          'https://parkify-backend.vercel.app/user/authenticateUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.role === 'admin' && pathname !== '/Admin/adminhome'
        && pathname !== '/Admin/allbookings'
        && pathname !== '/Admin/allusers'
        && pathname !== '/Admin/allfeedbacks'
        
        ) {
        
          setLoading(false)
          setUserAuthenticated(false);
          return <Unauthorized />

        }
        else if (response.data.role === 'user' && pathname !== '/User/home'
        && pathname !== '/User/feedback'
        && pathname !== '/User/viewbooking'
        
        ) {
        
          setLoading(false)
          setUserAuthenticated(false);
          return <Unauthorized />

        }
        else {
          setLoading(false)
          setUserAuthenticated(true);
          return <>{children}</>

        }
      } catch (error) {
        setLoading(false)
        setUserAuthenticated(false)
        return <Unauthorized />
      }
    }

    checkAuthentication()
  }, [loading, userAuthenticated]);



  if (!userAuthenticated && !loading) {
    return <Unauthorized />;
  }
  if (userAuthenticated && !loading) {
    return <>{children}</>
  }


};

export default UserAuthentication;
