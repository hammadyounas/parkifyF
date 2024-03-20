"use client"
import React, { useEffect, useState } from 'react';
import { Button, Table ,Modal,message} from 'antd';
import { useRouter } from 'next/navigation';
import style from './UserBookings.module.css'
import axios from 'axios';
import Cookies from 'js-cookie';
const UserBookings = () => {

  const columns = [
    {
      title: 'Parkingarea',
      dataIndex: 'parkingarea',
      align:'center'
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      align:'center'
  
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      align:'center'
  
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      align:'center'
  
    }, {
      title: 'Cancel Booking',
      dataIndex: 'cancelbooking',
      align:'center'
  
    },
  ];
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [firstColumn,secondColumn] = columns;
  const columnsWithoutHours = [firstColumn, secondColumn];
  const [data, setData] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const deleteUser = async (parkingId) => {
    try {

      console.log('email', parkingId)
      await axios.delete(
        'http://localhost:4000/user/cancelParking',
        {
          data: { parkingId },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${Cookies.get(('token'))}`,
          },
        }
      ).then(response => {
        console.log(response.data.message)
        messageApi.info(response.data.message);
        if (response.status === 200) {
        setData(prevData => prevData.filter(parking => parking.key !== parkingId));
        }

      }).catch(error => {
        console.log(error.response.data)
        messageApi.info(error.response.data.message);

      })


    } catch (error) {
      console.log('Error:', error)
    }
  }
 
  const handleCancelButton = (index)=>{
    Modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to delete booking for slot ${data[index].slot} of parking area ${data[index].parkingarea}? `,
      onOk() {
        
        console.log('OK');

      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {

        await axios.get(
          `http://localhost:4000/user/bookedparking?email=${Cookies.get('email')}`,
          {
            headers:{
              Authorization: `bearer ${Cookies.get('token')}`,

            }
          }

        ).then(response => {
          const newData = response.data.data.map((item, index) => ({
            key: item._id,
            parkingarea: item.parkingArea,
            
            slot: item.slot,
            
            startDate: item.startDate,
            endDate: item.endDate,
            cancelbooking: (
              <Button type="primary" danger onClick={() => {
                Modal.confirm({
                  title: 'Confirm',
                  content: `Are you sure you want to cancel this booking?`,
                  onOk() {
                    deleteUser(item._id)
                    console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
                // console.log(newData.key)

              }}>
                Cancel
              </Button>
            ),
          }));
          setData(newData);
          console.log(newData)
        }
        )

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  

      
    
  return(
    <>
    {data.length>0 &&
    <>
     {contextHolder}
    <h1 style={{textAlign:'center',marginTop:'40px',marginBottom:'10px' ,fontWeight:'bold',fontFamily:'calibri'}}>Your Bookings.</h1>
     <Table columns={columns} dataSource={data} style={{marginTop:'20px'}}/>
    </>
    }
     
     </>
  )
};
export default UserBookings;