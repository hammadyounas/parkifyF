"use client"
import {React} from 'react'

import Navbar from '../../../../../components/Navbar/Navbar'
import AdminHome from '../../../../../components/Adminhome/AdminHome'
const page = () => {
  
  return (
  <>
 
    <Navbar selectedLink={"All Feedbacks"} type={'admin'}/>
 <AdminHome/>

  </>
  )
}

export default page
