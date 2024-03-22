"use client"
import {React} from 'react'

const layout = async({children}) => {

  // const {push} = useRouter();
  

  //   const fetchData = async () => {
  //     try {
  //       setSpinVisible(true)
  //       const token = Cookies.get('token')
  //       const response = await axios.get(
  //         'https://parkify-backend.vercel.app/user/authenticateUser',
  //         {
  //           headers: {
  //             Authorization: `bearer ${token}`,
  //           },
  //         }
  //       )
        
  //         if(response.data.role != "admin"){
  //          notFound()
        
  //       }
    
  //       setSpinVisible(false)
  //     } catch (error) {
        
  //       setSpinVisible(false)
  //      push("/unauthorized")

  //     }
  //   };
  
  //   await fetchData(); 

  
  
    return (
    //   <>
    //   <Spin spinning={spinVisible}>
    //    {children}
    //   </Spin>
    // </>
    <>
   
     {children}
   
  </>
    
    );
  }
  
  
  export default layout
