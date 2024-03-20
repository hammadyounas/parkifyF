"use client"
import React from 'react'
import style from './DeleteUser.module.css'
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const DeleteUser = () => {

  return (
    <div className={style.deleteUserSection}>
      <h3 style={{marginTop:'40px',fontWeight:'bold',fontFamily:'calibri'}}>Enter User email which you want to delete</h3>
      <Form
     name="basic"
     labelCol={{
       span: 8,
     }}
     wrapperCol={{
       span: 16,
     }}
     style={{
      width:'800px',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
     }}
    
     onFinish={onFinish}
     onFinishFailed={onFinishFailed}
     autoComplete="off"
   >
    
       <Input placeholder="Enter user Email" style={{width:'70%',marginTop:'20px'}}/>
     
 
 
       <Button type="primary" htmlType="submit" 
       style={{marginTop:'20px'}}>
         Submit
       </Button>
     
   </Form>
   <div className={style.searchedUserCard}>
     

   </div>
    </div>
     
  )
}

export default DeleteUser
