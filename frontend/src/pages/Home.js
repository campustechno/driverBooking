import React, { useContext, useEffect, useState } from 'react';
import UserSignup from '../components/user/Signup';
import { GlobalState } from '../middlewares/global-states';
import UserLogin from '../components/user/Login';
import Hero from '../components/user/Hero';
import HeroLogged from '../components/user/HeroLogged';
import MapContainer from '../components/MapContainer';
import BookingModal from '../components/user/BookingModal';
import BookingStatus from '../components/user/BookingStatus';
import Navbar from '../components/Navbar';

// import Testimonials from '../components/home/Testimonials'
// import Aboutus from '../components/home/Aboutus'
// import Footer from '../components/home/Footer'

const Home = () => {
    const { data } = useContext(GlobalState)
    const [states, setStates] = useState(null)
    useEffect(() => {
        setStates(data)
    }, [data])

    return (
        <>
                <Navbar userData={data.loggedUser} />
            {states && states.activeModal === "SIGNUP" ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-full flex flex-col items-center">
                        <UserSignup />
                    </div>
                </div>
            ) : null}
            {states && states.activeModal === "LOGIN" ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-full flex flex-col items-center">
                        <UserLogin />
                    </div>
                </div>
            ) : null}
            {states && states.activeModal === "BOOKING" ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-full flex flex-col items-center">
                        <BookingModal/>
                    </div>
                </div>

            ) : null}
            {states && states.activeModal === "BOOKING_STATUS" ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
                    <div className="w-full flex flex-col items-center">
                        <BookingStatus/>
                    </div>
                </div>

            ) : null}
            <div className="w-full flex flex-col items-center">
                <div className="relative">
                    <Hero/>
                    {/* <HeroLogged /> */}
                    {/* <BookingStatus /> */}
                    {/* <BookingModal/> */}
                    {/* <MapContainer/> */}
                    {/* <Features />
                    <Testimonials/>
                    <Aboutus/>
                    <Footer/> */}
                </div>
            </div>
        </>
    );

}

export default Home