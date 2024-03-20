

"use client"
import { React, useState, useEffect, useRef } from 'react'
import style from './BookParking.module.css';
import { Button, Form, Select, DatePicker,message, Spin ,Table} from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
const BookParking = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [parkingSelected, setParkingSelected] = useState(false)
    const [selectedArea, setSelectedArea] = useState(1)
    const [slotSelected, setSlotSelected] = useState(false)
    const [dataEntered,setDataEntered]=useState(false)
    const [selectedSlot, setSelectedSlot] = useState({})
    const [parkingBooked, setParkingBooked] = useState(false)
    const formRef = useRef(null)
  const [spinVisible, setSpinVisible] = useState(false);
    const [startDateValue, setStartDateValue] = useState(null)
   const [endDateValue,setEndDateValue]=useState(null)
   const [parkings, setParkings] = useState([])
   const [bookedParkings, setBookedParkings] = useState([])
   const [bookedSlots, setBookedSlots] = useState([])
    const columns = [
        {
            title: `Slot`,
          dataIndex: 'slot',
          align: 'center',
        }
        ,
        {
          title: 'Start date',
          dataIndex: 'startDate',
          align: 'center',
        },
        {
          title: 'End Date',
          dataIndex: 'endDate',
          align: 'center'
    
        }
    
      ];
    
  
    
      const disabledDate = current => {
        if (!startDateValue) {
            return true;
        }
        
        const selectedMomentDate = moment(startDateValue, 'YYYY-MM-DD HH:mm:ss');
        return current && current < selectedMomentDate.startOf('day');

    };


    const [formSubmitted, setFormSubmitted] = useState(false);

    const onChangeStartDate = (date, dateString) => {
        console.log(dateString)
        setStartDateValue(dateString)
       
       
    };
    const onChangeEndDate = (date, dateString) => {
        console.log(dateString)
        setEndDateValue(dateString)
        
        
    };
    const onFinish = (values) => {
        console.log(values);
        setFormSubmitted(true);
    };
    const [form] = Form.useForm();

    const handleBookParkingClick = async() => {
        
      
                                       
        setSpinVisible(true)
        console.log('ba bum ba bum')
            try {

                await axios.post(
                    `http://localhost:4000/user/bookParking`,
                    
{
    parkingArea:`${selectedArea}`,
    slot:`${selectedSlot.number}`,
    startDate:`${startDateValue}`,
    endDate:`${endDateValue}`,
  },
                     {

                        headers: {
                            Authorization: `bearer ${Cookies.get(('token'))}`,
                        },
                    }

                ).then(response => {
                    setSpinVisible(false)
                   console.log(response.data)
                  setParkingBooked(true)
                  setFormSubmitted(false);
                  

                }
                ).catch(error=>{
                    setSpinVisible(false)
                    console.log(error)

                })

            } catch (error) {
                setSpinVisible(false)

                console.error('Error fetching data:', error);
            }
        }
   

    const [screenWidth, setScreenWidth] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };


        setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        console.log('Selected Area:', selectedArea);
    }, [selectedArea]);


  

    return (
        <>
        {contextHolder}
        <Spin spinning={spinVisible}>
            <div className={style.BookParking} style={{ display: parkingSelected ? 'none' : '' }}>
                <div className={style.mainDiv}>
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'calibri' }}>Select Parking Slot from below</h1>
                    <h5 style={{ textAlign: 'center', fontFamily: 'calibri', margin: 0 }}>Click on any of the slot below to proceed</h5>
                    <div className={style.mainDivImageDiv}> <h1 style={{ position: 'absolute', top: '40%', fontWeight: 'bold' }}>Slot 1</h1> <img src="/assets/images/parkarea1.jpg" alt="parkingimg1"
                        onClick={() => { setParkingSelected(true); setSelectedArea(1) }}
                    /></div>
                    <div className={style.mainDivImageDiv}>  <h1 style={{ position: 'absolute', top: '40%', fontWeight: 'bold' }}>Slot 2</h1> <img src="/assets/images/parkarea2.jpg" alt="parkingimg2"
                        onClick={() => { setParkingSelected(true); setSelectedArea(2) }}
                    /></div>
                    <div className={style.mainDivImageDiv}>  <h1 style={{ position: 'absolute', top: '40%', fontWeight: 'bold' }}>Slot 3</h1> <img src="/assets/images/parkarea3.jpg" alt="parkingimg3"
                        onClick={() => { setParkingSelected(true); setSelectedArea(3) }}
                    /></div>

                </div>

            </div>
            <div className={style.formBookParking} style={{ display: parkingSelected ? '' : 'none' }}>
                <div className={style.backButtonDiv}
                    style={{ display: parkingBooked ? 'none' : '' }}
                >
                    <BiArrowBack className={style.backbutton}
                        style={{ width: screenWidth < 600 ? '30px' : '50px', height: screenWidth < 600 ? '30px' : '50px' }}
                        onClick={() => {
                            setParkingSelected(false)
                            setSlotSelected(false);
                            setParkingBooked(false)
                            setSelectedArea(1)
                            setFormSubmitted(false)
                            setSelectedSlot({})
                            setStartDateValue(null)
                            setEndDateValue(null)
                            formRef.current.resetFields(); 
                            dataEntered && !formSubmitted?setDataEntered(false):setDataEntered(true)
                        }}

                    />
                </div>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '40px',padding:'0px 20px 0px 20px', display: formSubmitted || parkingBooked ? 'none' : '' }}>You have selected area {selectedArea} for parking</h1>
                <p style={{ textAlign: 'center', marginTop: '10px', padding: ' 5px 20px 5px 20px', display: formSubmitted || parkingBooked ? 'none' : '' }}>You can reserve parking for only one day not more than that and you have to leave selected slot the same day you park it u can re-reserve the slot on next day. </p>

                <Form
                    ref={formRef}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{
                        width: screenWidth < 1000 ? '90%' : '50%', margin: '0 auto', alignItems: 'center', marginTop: '25px',
                        display:  parkingSelected && !formSubmitted && !parkingBooked?'' : 'none'
                    }}

                >
                    <Form.Item
                        name="startdate"
                        label="Start Date"
                        rules={[
                            {
                                required: true,
                                message: 'Date is required',
                            },
                        ]}
                        style={{ width: screenWidth < 1000 ? '100%' : '90%' }}
                    >
                        <DatePicker showTime 
    format="YYYY-MM-DD HH:mm:ss"  onChange={onChangeStartDate} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="end Date"
                        rules={[
                            {
                                required: true,
                                message: 'Date is required',
                            },
                        ]}
                        style={{ width: screenWidth < 1000 ? '100%' : '90%' }}

                    >
                        <DatePicker showTime 
    format="YYYY-MM-DD HH:mm:ss"  onChange={onChangeEndDate} style={{ width: '100%' }} 
    
    disabledDate={disabledDate}/>
                    </Form.Item>
                    
                    <div className={style.buttonDiv}>

                        <Button type="primary" htmlType="submit"
                            style={{ backgroundColor: 'black' }}
                            onClick={async () => {
                                setSpinVisible(true)
                                       
                                try {

                                    await axios.get(
                                        `http://localhost:4000/user/findAvailableParking?parkingArea=${selectedArea}&startDate=${startDateValue}&endDate=${endDateValue}`,
                                         {

                                            headers: {
                                                Authorization: `bearer ${Cookies.get(('token'))}`,
                                            },
                                        }

                                    ).then(response => {
                                       console.log('Selected Area ',response.data.selectedArea)
                                      console.log('Booked Slots',response.data.bookedSlots)
                                        setParkings(response.data.selectedArea)
                                        setBookedParkings(response.data.bookedSlots)
                                        setSpinVisible(false)
                                        setDataEntered(true)
                                    }
                                    )
                                        
                                           
                                      
                                    

                                } catch (error) {
                                    setSpinVisible(false)
                                    messageApi.info(error.response)
                                    console.log(error.response)
                                    setDataEntered(true)
                                    
                                }
                                setTimeout(() => {
                                    window.scrollTo({
                                        top: document.documentElement.scrollHeight,
                                        behavior: 'smooth'
                                    });
                                }, 100);
                            }}
                        >
                            Find Slot
                        </Button>
                    </div>

                </Form>
                <div className={style.parkingAreaDiv} style={{ display: dataEntered && formSubmitted && !parkingBooked ? '' : 'none' }}>
                    
                    <h4>Booked slots are marked as <text style={{ color: 'red' }}>red</text> where available are marked as <text style={{ color: 'green' }}>green</text></h4>
                    <p>Note: click on the available "green" boxes to book those slots and click on red  boxes to check their booking details</p>
                    {(selectedArea === 1 && parkings.length===2) && parkings.map((group, outerIndex) => (
                        <div key={`row-${outerIndex}`} className={style.smallPreviewRow}>
                            {group.map((slot, innerIndex) => (
                                <div
                                    key={`slot-${outerIndex}-${innerIndex}`}
                                    className={style.smallPreviewColumn}
                                    style={{
                                        border: '1px solid white',
                                        margin: '5px',
                                        padding: '5px',
                                        backgroundColor: slot.value === 'booked' ? '#D2122E' : 'green'
                                    }}
                                    onClick={() => {
                                        setSlotSelected(true);
                                        setSelectedSlot(slot);
                                        setTimeout(() => {
                                            window.scrollTo({
                                                top: document.documentElement.scrollHeight,
                                                behavior: 'smooth'
                                            });
                                        }, 100); 
                                    }}
                                ></div>
                            ))}
                        </div>
                    ))}
                    {
                        (<div className={style.smallPreviewRow}
                            style={{
                                width: screenWidth < 1000 ? '90%' : '60%',
                                display: selectedArea === 2 ? '' : 'none'
                            }}
                        >
                            {(parkings.length ===10) && parkings.map((slot, index) => (
                                <div
                                    key={index}
                                    className={style.smallPreviewColumn}
                                    style={{
                                        border: '1px solid black',
                                        margin: '5px',
                                        padding: '5px',
                                  
                                        backgroundColor: slot.value === 'booked' ? '#D2122E' : 'green'

                                    }}

                                    onClick={() => {
                                        console.log('done')
                                        console.log(slot)
                                        setSlotSelected(true)
                                        setSelectedSlot(slot)
                                        setTimeout(() => {
                                            window.scrollTo({
                                                top: document.documentElement.scrollHeight,
                                                behavior: 'smooth'
                                            });
                                        }, 100); 
                                    }}
                                >
                                </div>
                            ))}
                        </div>)
                    }
                    {
                        (<div className={style.smallPreviewRow}
                            style={{
                                width: screenWidth < 1000 ? '90%' : '60%',
                                display: selectedArea === 3 ? '' : 'none'
                            }}
                        >
                            { parkings.length ===7 && parkings.map((slot, index) => (
                                <div
                                    key={index}
                                    className={style.smallPreviewColumn}
                                    style={{
                                        border: '1px solid white',
                                        margin: '5px',
                                        padding: '5px',
                                        backgroundColor: slot.value === 'booked' ? '#D2122E' : 'green'

                                    }}

                                    onClick={() => {
                                        console.log('done')
                                        console.log(slot)
                                        setSlotSelected(true)
                                        setSelectedSlot(slot)
                                        setTimeout(() => {
                                            window.scrollTo({
                                                top: document.documentElement.scrollHeight,
                                                behavior: 'smooth'
                                            });
                                        }, 100); 
                                    }}
                                >
                                </div>
                            ))}
                        </div>)
                    }
                    <div className={style.selectedSlotBooked} style={{display:slotSelected && selectedSlot.value ==='booked' ? '' : 'none' }}>
                    <h2>Booked Slot details</h2>
                    <Table columns={columns} dataSource={bookedParkings.filter(item => {
                                           
                                           return item.slot == selectedSlot.number; 
                                           
                                       })} style={{width:'100%',display:selectedSlot.value==='booked'?'':'none'}} />
                      
                        </div>
                    <div className={style.selectedSlot} style={{display: slotSelected && selectedSlot.value !=='booked' ? '' : 'none' , width: screenWidth < 900 ? '90%' : '60%' }}>
                        <h1>'Slot {(selectedSlot.number)}' Selected</h1>
                        <h4
                            style={{
                                display: slotSelected ? '' : 'none',

                            }}>you are selecting slot {selectedSlot.number} as your reserves, click on confirm slot to book your slot.</h4>
                        <Button type="primary" htmlType="submit"
                            style={{
                                backgroundColor: 'black', marginBottom: '20px',
                                display: slotSelected ? '' : 'none',
                                width: 'auto',
                                padding: '10px',
                                height: 'auto'
                            }}
                            onClick={
                                handleBookParkingClick
                            }
                        >
                            Confirm Slot
                        </Button>
                       

                    </div>

                </div>
                <div className={style.congratulatingDiv} style={{
                    display: parkingBooked ? '' : 'none'
                }}>
                    <h1>Congratulations! Your parking slot has been booked</h1>
                    <p>We have sent a confirmation email to {Cookies.get('email')}</p>
                    <Button type='primary'
                        style={{ backgroundColor: 'black', marginTop: '20px', width: '200px', height: '50px' }}
                        onClick={() => {
                            router.push('/User/viewbooking');
                        }}

                    >View Parking</Button>
                </div>
            </div>
            </Spin>
        </>
    )
}

export default BookParking





















// "use client"
// import { React, useState, useEffect, useRef } from 'react'
// import style from './BookParking.module.css';
// import { Button, Form, Select, DatePicker, Modal, Spin } from 'antd';
// import { BiArrowBack } from 'react-icons/bi';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// const BookParking = () => {

//     const router = useRouter();
//     const [parkingSelected, setParkingSelected] = useState(false)
//     const [selectedArea, setSelectedArea] = useState(1)
//     const [slotSelected, setSlotSelected] = useState(false)
//     const [selectedSlot, setSelectedSlot] = useState({})
//     const [parkingBooked, setParkingBooked] = useState(false)
//     const formRef = useRef(null)
//   const [spinVisible, setSpinVisible] = useState(false);
   
//     const [dateValue, setDateValue] = useState('')
//     const [hoursValue, setHoursValue] = useState('')
//     const [timeValue, setTimeValue] = useState('')

//     const [reserveHours, setReserveHours] = useState([
//         '1 hour', '2 hours', '3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours',
//         '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours', '19 hours', '20 hours',
//         '21 hours', '22 hours', '23 hours', '24 hours'
//     ])
//     const [hoursSelected, setHoursSelected] = useState(reserveHours)


//     const startTime = [
//         '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
//         '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
//         '20:00', '21:00', '22:00', '23:00'
//     ]
//     const [parkings, setParkings] = useState([])
    

//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const onChangeDate = (date, dateString) => {
//         console.log(dateString);
//         setDateValue(dateString)
//     };
//     const onReserveHoursChange = (value) => {
//         console.log(value);
//         setHoursValue(value)
//     };
//     const onStartTimeChange = (value) => {
//         setTimeValue(value)
//         setHoursValue('')

//         setReserveHours(hoursSelected.slice(0, 24 - parseInt(value.slice(0, -3))))
//         console.log('hours:', hoursSelected.slice(0, 24 - parseInt(value.slice(0, -3))))
//     };
//     const onFinish = (values) => {
//         console.log(values);
//         setFormSubmitted(true);
//     };
//     const [form] = Form.useForm();

//     const handleBookParkingClick = async() => {
        
      
                                       
//         setSpinVisible(true)
//         console.log('ba bum ba bum')
//             try {

//                 await axios.post(
//                     `http://localhost:4000/user/bookParking`,
                    
// {
//     parkingArea:`${selectedArea}`,
//     startDate:dateValue,
//     endDate:dateValue,
//     startingTime:timeValue,
//     hours:hoursValue,
//     slot:`${selectedSlot.number}`
//   },
//                      {

//                         headers: {
//                             Authorization: `bearer ${Cookies.get(('token'))}`,
//                         },
//                     }

//                 ).then(response => {
//                     setSpinVisible(false)
//                    console.log(response.data)
//                   setParkingBooked(true)
//                   setFormSubmitted(false);
                  

//                 }
//                 ).catch(error=>{
//                     setSpinVisible(false)
//                     console.log(error)

//                 })

//             } catch (error) {
//                 setSpinVisible(false)

//                 console.error('Error fetching data:', error);
//             }
//         }
   

//     const [screenWidth, setScreenWidth] = useState(null);

//     useEffect(() => {
//         const handleResize = () => {
//             setScreenWidth(window.innerWidth);
//         };


//         setScreenWidth(window.innerWidth);
//         window.addEventListener('resize', handleResize);

//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
//     useEffect(() => {
//         console.log('Selected Area:', selectedArea);
//     }, [selectedArea]);


  

//     return (
//         <>
//         <Spin spinning={spinVisible}>
//             <div className={style.BookParking} style={{ display: parkingSelected ? 'none' : '' }}>
//                 <div className={style.mainDiv}>
//                     <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'calibri' }}>Select Parking Slot from below</h1>
//                     <h5 style={{ textAlign: 'center', fontFamily: 'calibri', margin: 0 }}>Click on any of the slot below to proceed</h5>
//                     <div className={style.mainDivImageDiv}> <h1 style={{ position: 'absolute', top: '40%', fontWeight: 'bold' }}>Slot 1</h1> <img src="/assets/images/parkarea1.jpg" alt="parkingimg1"
//                         onClick={() => { setParkingSelected(true); setSelectedArea(1) }}
//                     /></div>
//                     <div className={style.mainDivImageDiv}>  <h1 style={{ position: 'absolute', top: '40%', fontWeight: 'bold' }}>Slot 2</h1> <img src="/assets/images/parkarea2.jpg" alt="parkingimg2"
//                         onClick={() => { setParkingSelected(true); setSelectedArea(2) }}
//                     /></div>
//                     <div className={style.mainDivImageDiv}>  <h1 style={{ position: 'absolute', top: '40%', fontWeight: 'bold' }}>Slot 3</h1> <img src="/assets/images/parkarea3.jpg" alt="parkingimg3"
//                         onClick={() => { setParkingSelected(true); setSelectedArea(3) }}
//                     /></div>

//                 </div>

//             </div>
//             <div className={style.formBookParking} style={{ display: parkingSelected ? '' : 'none' }}>
//                 <div className={style.backButtonDiv}
//                     style={{ display: parkingBooked ? 'none' : '' }}
//                 >
//                     <BiArrowBack className={style.backbutton}
//                         style={{ width: screenWidth < 600 ? '30px' : '50px', height: screenWidth < 600 ? '30px' : '50px' }}
//                         onClick={() => {
//                             setParkingSelected(false)
//                             setSlotSelected(false);
//                             setParkingBooked(false)
//                             setSelectedArea(1)
//                             setFormSubmitted(false)
//                             setSelectedSlot({})
//                             setDateValue('')
//                             setTimeValue('')
//                             setHoursValue('')
//                             formRef.current.resetFields(); 
//                         }}

//                     />
//                 </div>
//                 <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '40px', display: formSubmitted || parkingBooked ? 'none' : '' }}>You have selected area {selectedArea} for parking</h1>
//                 <p style={{ textAlign: 'center', marginTop: '10px', padding: ' 5px 20px 5px 20px', display: formSubmitted || parkingBooked ? 'none' : '' }}>You can reserve parking for only one day not more than that and you have to leave selected slot the same day you park it u can re-reserve the slot on next day. </p>

//                 <Form
//                     ref={formRef}
//                     form={form}
//                     name="control-hooks"
//                     onFinish={onFinish}
//                     style={{
//                         width: screenWidth < 500 ? '80%' : '50%', margin: '0 auto', alignItems: 'center', marginTop: '25px',
//                         display:  parkingSelected && !formSubmitted && !parkingBooked?'' : 'none'
//                     }}

//                 >
//                     <Form.Item
//                         name="date"
//                         label="Date"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Date is required',
//                             },
//                         ]}
//                         style={{ width: '90%' }}
//                     >
//                         <DatePicker onChange={onChangeDate} style={{ width: '100%' }} />
//                     </Form.Item>
//                     <Form.Item
//                         name="start time"
//                         label="Start Time"
//                         rules={[
//                             {
//                                 required: true,
//                             },
//                         ]}
//                         style={{ width: '90%' }}
//                     >
//                         <Select
//                             placeholder="Select Starting Time"
//                             onChange={onStartTimeChange}
//                             allowClear

//                             options={startTime.map((city) => ({
//                                 label: city,
//                                 value: city,
//                             }))}
//                         >

//                         </Select>
//                     </Form.Item>
//                     <Form.Item
//                         name="reserveHours"
//                         label="Reserve Hours"
//                         rules={[
//                             {
//                                 required: true,
//                             },
//                         ]}
//                         style={{ width: '90%' }}
//                     >
//                         <Select
//                             placeholder="Select Reserving hours"
//                             onChange={onReserveHoursChange}
//                             allowClear
//                             value={hoursValue}
//                             options={reserveHours.map((hour) => ({
//                                 label: hour,
//                                 value: hour,
//                             }))}
//                         >

//                         </Select>
//                     </Form.Item>
//                     <div className={style.buttonDiv}>

//                         <Button type="primary" htmlType="submit"
//                             style={{ backgroundColor: 'black' }}
//                             onClick={async () => {
//         setSpinVisible(true)
                                       
//                                 console.log( `http://localhost:4000/user/findAvailableParking?parkingArea=${selectedArea}&startDate=${dateValue}&startingTime=${timeValue}&hours=${hoursValue}&endDate=${dateValue}`)
//                                 try {

//                                     await axios.get(
//                                         `http://localhost:4000/user/findAvailableParking?parkingArea=${selectedArea}&startDate=${dateValue}&startingTime=${timeValue}&hours=${hoursValue}&endDate=${dateValue}`,
//                                          {

//                                             headers: {
//                                                 Authorization: `bearer ${Cookies.get(('token'))}`,
//                                             },
//                                         }

//                                     ).then(response => {
//                                        console.log(response.data)
//                                         setParkings(response.data.selectedArea)
//                                         setSpinVisible(false)

//                                     }
//                                     )
                                        
                                           
                                      
                                    

//                                 } catch (error) {
//         setSpinVisible(false)

//                                     console.error('Error fetching data:', error);
//                                 }
//                                 setTimeout(() => {
//                                     window.scrollTo({
//                                         top: document.documentElement.scrollHeight,
//                                         behavior: 'smooth'
//                                     });
//                                 }, 100);
//                             }}
//                         >
//                             Find Slot
//                         </Button>
//                     </div>

//                 </Form>
//                 <div className={style.parkingAreaDiv} style={{ display: formSubmitted && !parkingBooked ? '' : 'none' }}>
//                     <h2>Complete Preview</h2>
//                     <h4>Booked slots are marked as <text style={{ color: 'red' }}>red</text> where available are marked as <text style={{ color: 'green' }}>green</text></h4>
//                     <p>Note: click on the available (green) boxes for booking</p>
//                     {(selectedArea === 1 && parkings.length===2) && parkings.map((group, outerIndex) => (
//                         <div key={`row-${outerIndex}`} className={style.smallPreviewRow}>
//                             {group.map((slot, innerIndex) => (
//                                 <div
//                                     key={`slot-${outerIndex}-${innerIndex}`}
//                                     className={style.smallPreviewColumn}
//                                     style={{
//                                         border: '1px solid white',
//                                         margin: '5px',
//                                         padding: '5px',
//                                         pointerEvents: slot.value === 'booked' ? 'none' : 'auto',
//                                         backgroundColor: slot.value === 'booked' ? '#D2122E' : 'green'
//                                     }}
//                                     onClick={() => {
//                                         setSlotSelected(true);
//                                         setSelectedSlot(slot);
//                                         setTimeout(() => {
//                                             window.scrollTo({
//                                                 top: document.documentElement.scrollHeight,
//                                                 behavior: 'smooth'
//                                             });
//                                         }, 100); // 1000 milliseconds = 1 second
//                                     }}
//                                 ></div>
//                             ))}
//                         </div>
//                     ))}
//                     {
//                         (<div className={style.smallPreviewRow}
//                             style={{
//                                 width: screenWidth < 1000 ? '90%' : '60%',
//                                 display: selectedArea === 2 ? '' : 'none'
//                             }}
//                         >
//                             {(parkings.length ===10) && parkings.map((slot, index) => (
//                                 <div
//                                     key={index}
//                                     className={style.smallPreviewColumn}
//                                     style={{
//                                         border: '1px solid black',
//                                         margin: '5px',
//                                         padding: '5px',
//                                         pointerEvents: slot.value === 'booked' ? 'none' : 'auto',
//                                         backgroundColor: slot.value === 'booked' ? '#D2122E' : 'green'

//                                     }}

//                                     onClick={() => {
//                                         console.log('done')
//                                         console.log(slot)
//                                         setSlotSelected(true)
//                                         setSelectedSlot(slot)
//                                         setTimeout(() => {
//                                             window.scrollTo({
//                                                 top: document.documentElement.scrollHeight,
//                                                 behavior: 'smooth'
//                                             });
//                                         }, 100); // 1000 milliseconds = 1 second
//                                     }}
//                                 >
//                                 </div>
//                             ))}
//                         </div>)
//                     }
//                     {
//                         (<div className={style.smallPreviewRow}
//                             style={{
//                                 width: screenWidth < 1000 ? '90%' : '60%',
//                                 display: selectedArea === 3 ? '' : 'none'
//                             }}
//                         >
//                             { parkings.length ===7 && parkings.map((slot, index) => (
//                                 <div
//                                     key={index}
//                                     className={style.smallPreviewColumn}
//                                     style={{
//                                         border: '1px solid white',
//                                         margin: '5px',
//                                         padding: '5px',
//                                         pointerEvents: slot.value === 'booked' ? 'none' : 'auto',
//                                         backgroundColor: slot.value === 'booked' ? '#D2122E' : 'green'

//                                     }}

//                                     onClick={() => {
//                                         console.log('done')
//                                         console.log(slot)
//                                         setSlotSelected(true)
//                                         setSelectedSlot(slot)
//                                         setTimeout(() => {
//                                             window.scrollTo({
//                                                 top: document.documentElement.scrollHeight,
//                                                 behavior: 'smooth'
//                                             });
//                                         }, 100); 
//                                     }}
//                                 >
//                                 </div>
//                             ))}
//                         </div>)
//                     }
//                     <div className={style.selectedSlot} style={{ display: slotSelected ? '' : 'none', width: screenWidth < 900 ? '90%' : '60%' }}>
//                         <h1>'Slot {(selectedSlot.number)}' Selected</h1>
//                         <h4
//                             style={{
//                                 display: slotSelected ? '' : 'none',

//                             }}>you are selecting slot {selectedSlot.number} as your reserves, click on confirm slot to book your slot.</h4>
//                         <Button type="primary" htmlType="submit"
//                             style={{
//                                 backgroundColor: 'black', marginBottom: '20px',
//                                 display: slotSelected ? '' : 'none',
//                                 width: 'auto',
//                                 padding: '10px',
//                                 height: 'auto'
//                             }}
//                             onClick={
//                                 handleBookParkingClick
//                             }
//                         >
//                             Confirm Slot
//                         </Button>
                       

//                     </div>

//                 </div>
//                 <div className={style.congratulatingDiv} style={{
//                     display: parkingBooked ? '' : 'none'
//                 }}>
//                     <h1>Congratulations! Your parking slot has been booked</h1>
//                     <p>We have sent a confirmation email to {Cookies.get('email')}</p>
//                     <Button type='primary'
//                         style={{ backgroundColor: 'black', marginTop: '20px', width: '200px', height: '50px' }}
//                         onClick={() => {
//                             router.push('/User/viewbooking');
//                         }}

//                     >View Parking</Button>
//                 </div>
//             </div>
//             </Spin>
//         </>
//     )
// }

// export default BookParking


