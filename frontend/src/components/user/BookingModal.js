import React, { useContext, useState } from 'react'
import MapContainer from '../MapContainer';
import { GlobalState } from '../../middlewares/global-states';

import Cookies from 'js-cookie'
import axios from 'axios'


const BookingModal= () => {
    const { dispatch } = useContext(GlobalState)
    const [location, setLocation] = useState("");
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [amPm, setamPm] = useState("AM");
    const [hoursNeeded, sethoursNeeded] = useState(1);

    const [isLoading, setIsLoading] = useState(false);


      


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = Cookies.get('authToken');
        const headers = { 'Authorization': `Bearer ${token}` }

        await axios.post(`${process.env.REACT_APP_API_URL}/bookings/create`, {location, hours, minutes, amPm,hoursNeeded}, {headers})
            .then(res => {
                // console.log(res.data);
                dispatch({ type: "FIRE_MODAL", payload: "BOOKING_STATUS" })
                // navigate('/')
            })
            .catch(err => alert(err.message))

        setIsLoading(false)
    }



    const closeModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'FIRE_MODAL', payload: "" })
    }


    const setCurrentLocation = (address) => {
        setLocation(address);
    }


    return (
        <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className='p-8 h-full flex flex-col justify-between'>
                    <h1 className='text-3xl font-bold mb-4 border-b-blackk border-b-2'>Book at your time</h1>
                    <div className="space-y-3">
                        <div className=''>
                            <label htmlFor="location" className="flex flex-col mb-2">
                                <span className="">Location</span>
                                <input type="text" id='location' className="input-form" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </label>
                                <h1 className='text-xl text-bold'>Booking Time</h1>
                            <div className='flex space-x-5'>
                                <label htmlFor="hours" className="flex flex-col">
                                    <span className="">Hours</span>
                                    <input type="number" id='hours' className="input-form w-14" value={hours} onChange={(e) => setHours(e.target.value)} />
                                </label>
                                <label htmlFor="minutes" className="flex flex-col">
                                    <span className="">Minutes</span>
                                    <input type="number" id='minutes' className="input-form w-14" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                                </label>
                                <label htmlFor="amPm" className="flex flex-col">
                                    <span className="">AM/PM</span>
                                    <select name="amPm" id="amPm" className="input-form" defaultValue="None" onChange={(e) => setamPm(e.target.value)}>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <label htmlFor="neededHours" className="flex flex-col">
                            <span className="">Hire For (in Hours)</span>
                            <input type="number" id='neededHours' className="input-form" value={hoursNeeded} onChange={(e) => sethoursNeeded(e.target.value)} />
                        </label>
                    </div>
                    <div className='flex justify-between mt-8'>
                        <button type='cancel' className='px-8 py-2 border-[1px] border-slate-500 rounded-md text-sm text-slate-500 font-semibold'
                            onClick={(e) => closeModal(e)}
                        >
                            Back
                        </button>
                        <button type="submit" className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Book" : "Booking..."}</button>
                    </div>

                </form>
            </div>
            <div className='w-1/2 bg-primary '>
                <MapContainer onLocationChange={setCurrentLocation}/>
            </div>
        </div>
    )
}

export default BookingModal;
