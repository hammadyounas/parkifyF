"use client"
import {React} from 'react'

import Navbar from '../../../../../components/Navbar/Navbar'
import AdminHome from '../../../../../components/Adminhome/AdminHome'
import { usePathname } from 'next/navigation'
const page = () => {
  const pathname = usePathname()
  console.log(pathname)
  return (
  <>
 
    <Navbar selectedLink={"All Feedbacks"} type={'admin'}/>
 <AdminHome/>

  </>
  )
}

export default page
