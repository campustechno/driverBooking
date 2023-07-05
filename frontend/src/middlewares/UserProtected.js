import React, { useContext, useEffect } from 'react';
import { GlobalState } from './global-states';
import Cookies from 'js-cookie';
import axios from 'axios';

const UserProtected = ({ children }) => {
    const { dispatch } = useContext(GlobalState);
    let headers
    const token = Cookies.get('authToken');

    useEffect(() => {
        headers = { 'Authorization': `Bearer ${token}` }

        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, { headers })
                .then(res => {
                    dispatch({ type: 'SET_USER', payload: res.data })
                    dispatch({ type: 'IS_LOGGED', payload: true })
                })
                .catch(err => {
                    console.log(err);
                    // navigate('/verify')
                })
        }
        fetchData();

    }, [token]);

    return (
        <>
            {children}
        </>
    )
}

export default UserProtected