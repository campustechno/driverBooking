import React, { useContext, useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-web';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../middlewares/global-states'
const animationData = require('../../assets/waiting.json');

const Hero = () => {
    const { dispatch } = useContext(GlobalState);
    const [currentBooking, setCurrentBooking] = useState(null)
    const heroContainer = useRef(null);

    const navigate = useNavigate();
    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: heroContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });

        return () => {
            anim.destroy();
        };
    }, []);

    useEffect(()=> {
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        axios.get(`${process.env.REACT_APP_API_URL}/bookings/lastbook`, {headers})
        .then(res => {
            setCurrentBooking(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    console.log(currentBooking)

    //opens sign up modal
    const openCancelModal = () => {
        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }
        axios.delete(`${process.env.REACT_APP_API_URL}/bookings/delCurrentBooking`, {headers}, {bookingId:currentBooking._id})
        .then(res => {
            navigate('/user')
            dispatch({ type: "FIRE_MODAL", payload: "" })
        })
        .catch(err => {
            console.log(err)
            alert("Failed to cancel. Contact Support")
        })
    }

    const openCloseModal = () => {
        dispatch({ type: "FIRE_MODAL", payload: "" })
    }

    return (
        <>
            {currentBooking &&
            <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
                <div className="w-[50%] px-6 py-2 h-full flex flex-col justify-between">
                    <div className='text-blackk '>
                        <h1 className='text-3xl font-bold mb-4 border-b-blackk border-b-2'>Booking Details</h1>
                        <div className='space-y-4'>
                            <div className='text-xl font-semibold'>
                                <h1>Meetup Location:</h1>
                                <p className='text-primary'>{currentBooking.location}</p>
                            </div>
                            <div className='flex text-xl font-semibold'>
                                <h1>Time:</h1>
                                <p className='text-primary'>{" "} AT {currentBooking.hours}:{currentBooking.minutes} {currentBooking.amPm}</p>
                            </div>
                            <div className='flex text-xl font-semibold'>
                                <h1>Booked For: </h1>
                                <p className='text-primary'>{currentBooking.hoursNeeded} hours</p>
                            </div>
                            <div className='flex text-xl font-semibold'>
                                <h1>Status: </h1>
                                <p className='text-secondary'>{currentBooking.status.toUpperCase()}</p>
                            </div>
                            <div className='text-xl font-semibold'>
                                <h1>Driver Assigned: </h1>
                                <p className='text-secondary'>Please Wait while we assign you a driver</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-x-4 mt-5">
                        <button className="btn bg-secondary" onClick={openCancelModal}>Cancel Booking</button>
                        <button className="btn bg-primary" onClick={openCloseModal}>Close</button>
                    </div>
                </div>
                <div className="max-w-sm w-fit h-fit" ref={heroContainer} key="hero-animation">
                        </div>
            </div>
            }
        </>
    )
}

export default Hero