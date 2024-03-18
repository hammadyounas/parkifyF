"use client"
import React, { useState } from 'react';
import { Button, Form, Input,Modal,Spin,message} from 'antd';
import style from './AdminLogin.module.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import axios from 'axios';
const SignupForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async(values) => {
    setModalVisible(true)
    try {
     await axios.post('http://localhost:3333/admin/login', {
          username: values.username,
          password: values.password
      }).then(response=>{
       
        if(response.status===200){
          Cookies.set('token', response.data.token);
          Cookies.set('username', response.data.username);
          Cookies.set('type', 'admin');
    setModalVisible(false)
       
          messageApi.info(response.data.message)
          router.push('/adminhome')
        }
      }).catch(error=>{
        messageApi.info(error.response.data.message)
        setModalVisible(false)

      })
      
  } catch (error) {
    setModalVisible(false)
      messageApi.info(error.response.data.message)

  }
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
     {contextHolder}
    <Spin spinning={modalVisible}>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>



      <div className={style.buttonDiv}>

        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </div>
    </Form>
   
</Spin>
    </>
  );
};

export default SignupForm;
