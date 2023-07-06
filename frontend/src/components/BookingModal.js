// import React, { useState } from 'react';
// import MapContainer from './MapContainer';

// const BookingModal = () => {
//   const [location, setLocation] = useState('');
//   const [hour, setHour] = useState('');
//   const [minutes, setMinutes] = useState('');
//   const [amPm, setAmPm] = useState('');


//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const handleHourChange = (event) => {
//     setHour(event.target.value);
//   };

//   const handleMinutesChange = (event) => {
//     setMinutes(event.target.value);
//   };

//   const handleAmPmChange = (event) => {
//     setAmPm(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Combine hour, minutes, and AM/PM into a single time value
//     const time = `${hour}:${minutes} ${amPm}`;

//     // Perform booking submission logic here
//     console.log('Booking submitted:', {
//       location,
//       time
//     });

//     // Reset form fields
//     setLocation('');
//     setHour('');
//     setMinutes('');
//     setAmPm('');
//   };

//   return (
//     <div className="max-w-5xl w-full flex bg-white absolute top-10 overflow-y-auto">
//         <div className="p-4 flex flex-col">
//           <h2 className="text-2xl font-bold mb-4">Book a Driver</h2>
//           <div>
//                 <label className="text-lg font-medium">Map Location</label>
//                 <div className=" w-full">
//                     <MapContainer />
//                 </div>
//           </div>

//           <div className="flex flex-col space-y-4">
//             <div>
//               <label htmlFor="location" className="text-lg font-medium">
//                 Location
//               <input
//                 type="text"
//                 id="location"
//                 className="input-form"
//                 value={location}
//                 onChange={handleLocationChange}
//               />
//               </label>
//             </div>

//             <div className="flex space-x-2">
//               <div>
//                 <label htmlFor="hour" className="text-lg font-medium">
//                   Hour
//                 <input
//                   type="text"
//                   id="hour"
//                   className="input-form"
//                   value={hour}
//                   onChange={handleHourChange}
//                 />
//                 </label>
//               </div>

//               <div>
//                 <label htmlFor="minutes" className="text-lg font-medium">
//                   Minutes
//                 <input
//                   type="text"
//                   id="minutes"
//                   className="input-form"
//                   value={minutes}
//                   onChange={handleMinutesChange}
//                 />
//                 </label>
//               </div>

//               <div>
//                 <label htmlFor="amPm" className="text-lg font-medium">
//                   AM/PM
//                 <input
//                   type="text"
//                   id="amPm"
//                   className="input-form"
//                   value={amPm}
//                   onChange={handleAmPmChange}
//                 />
//                 </label>
//               </div>

//             </div>


//             <div className="flex justify-end">
//               <button
//                 className="input-form"
//                 onClick={handleSubmit}
//               >
//                 Book
//               </button>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default BookingModal;

import React, { useContext, useState } from 'react'
import MapContainer from './MapContainer';
import { GlobalState } from '../middlewares/global-states';
import Cookies from 'js-cookie'
import axios from 'axios'


const BookingModal= () => {
    const { dispatch } = useContext(GlobalState)
    const [location, setLocation] = useState("");
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [amPm, setamPm] = useState("AM");
    const [hoursNeeded, sethoursNeeded] = useState(1);
    const [gender, setGender] = useState('None');

    const [isLoading, setIsLoading] = useState(false);

    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await axios.post(`${process.env.REACT_APP_API_URL}/user/create`, {hours, minutes, amPm,hoursNeeded,gender})
            .then(res => {
                Cookies.set("authToken", res.data.token);
                // console.log(res.data);
                dispatch({ type: "FIRE_MODAL", payload: "" })
                // navigate('/')
            })
            .catch(err => alert(err.message))
        setIsLoading(false)
    }



    const closeModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'FIRE_MODAL', payload: "" })
    }

    const openLoginModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'FIRE_MODAL', payload: "LOGIN" })
    }

    const setCurrentLocation = (e) => {
        
    }


    return (
        <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className='p-8 h-full flex flex-col justify-between'>
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
                                        <option value="am">AM</option>
                                        <option value="pm">PM</option>
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
