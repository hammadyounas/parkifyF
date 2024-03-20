"use client"

import { useRouter } from 'next/navigation'

import React, { useState, useEffect } from 'react';
import UserLogin from '../Userlogin/UserLogin';
import AdminLogin from '../AdminLogin/AdminLogin';
import { Tabs } from 'antd';
import style from './AuthPage.module.css';
const { TabPane } = Tabs;
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthPage = () => {

    const [activeTab, setActiveTab] = useState('1');
    const [initialText, setInitialText] = useState('Hello User, login below .!')
    const [loginSelected, setLoginSelected] = useState(true)
    const handleTabChange = (key) => {
        setLoginSelected(!loginSelected)
        setActiveTab(key);

        if (!loginSelected) {
            setInitialText('Hello User, login below .!')
        }
        else {
            setInitialText('Hello Admin, login below .!')

        }

    };

    const [screenWidth, setScreenWidth] = useState(null);

    useEffect(() => {
       
    
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);


    }, []);
    return (
       <div className={style.authenticationSection}>
            <h1>Welcome to Parkify</h1>
            <p>You must need to login in order to Access the features of Application</p>
            <p className={style.initialText}>{initialText}</p>
            <div className={style.form}>
                
                        <UserLogin />
                    
            </div>


        </div>
    );
};

export default AuthPage;
