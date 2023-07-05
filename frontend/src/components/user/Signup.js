import React, { useContext, useState } from 'react'
import signuplogo from '../../assets/driver.png'
import { GlobalState } from '../../middlewares/global-states';
import Cookies from 'js-cookie'
import axios from 'axios'


const Signup = () => {
    const { dispatch } = useContext(GlobalState)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(18);
    const [gender, setGender] = useState('None');

    const [isLoading, setIsLoading] = useState(false);

    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await axios.post(`${process.env.REACT_APP_API_URL}/user/create`, {name, email, password,age,gender})
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


    return (
        <div className="max-w-5xl w-full flex bg-white absolute top-10 ">
            <div className="w-1/2">
                <form onSubmit={handleSubmit} className='p-8'>
                    <div className="space-y-3">
                        <label htmlFor="name" className="flex flex-col">
                            <span className="">Name</span>
                            <input type="text" id='name' className="input-form" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label htmlFor="email" className="flex flex-col">
                            <span className="">Email</span>
                            <input type="email" id='email' className="input-form" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label htmlFor="password" className="flex flex-col">
                            <span className="">Password</span>
                            <input type="password" id='password' className="input-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label htmlFor="age" className="flex flex-col">
                            <span className="">Age</span>
                            <input type="number" id='age' className="input-form" value={age} onChange={(e) => setAge(e.target.value)} />
                        </label>
                        <label htmlFor="gender" className="flex flex-col">
                            <span className="">Gender</span>
                            <select name="gender" id="gender" className="input-form" defaultValue="None" onChange={(e) => setGender(e.target.value)}>
                                <option value="None">Preferred not to say</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <p>Already have an account?<span className="text-blue-500 underline cursor-pointer" onClick={(e) =>openLoginModal(e)}>Log In</span></p>
                    </div>
                    <div className='flex justify-between mt-8'>
                        <button type='cancel' className='px-8 py-2 border-[1px] border-slate-500 rounded-md text-sm text-slate-500 font-semibold'
                            onClick={(e) => closeModal(e)}
                        >
                            Back
                        </button>
                        <button type="submit" className={`btn font-semibold bg-secondary ${isLoading ? 'opacity-60' : ""}`} disabled={isLoading}>{!isLoading ? "Submit" : "Submiting..."}</button>
                    </div>

                </form>
            </div>
            <div className='w-1/2 bg-primary flex p-8'>
                <img src={signuplogo} alt="signup-logo" />
            </div>
        </div>
    )
}

export default Signup