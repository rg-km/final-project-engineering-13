import React, { useState } from 'react';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";

import dataStore from '../../store/data';

const Register = () => {
const [username,setUsername] = useState('');
const [firstname,setFirstname] = useState('');
const [lastname,setLastname] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');



const navigate = useNavigate()

    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
    }

    const onChangeFirstname = (e) => {
        const value = e.target.value
        setFirstname(value)
    }

    const onChangeLastname = (e) => {
        const value = e.target.value
        setLastname(value)
    }
        const onChangeEmail = (e) => {
           const value = e.target.value
         setEmail(value)
    }
    
    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // const response = await axios.post('https://reqres.in/api/register',{email: "eve.holt@reqres.in", password: "pistol"})
            const form = {
                "email": email,
                "username": username,
                "first_name": firstname,
                "last_name": lastname,
                "photo": "link photo",
                "password": password,
                "contact": " "
            }
            const response = await axios.post('/api/v1/auth/register',form)
            console.log(response, 'dari register')

            navigate('/login')
            console.log('jalan dari register ke home')
        } catch(err) {
            console.log(err.response)
            console.log(err.request)
            console.log(err.message)
        }
    }



    return(
        <div className='registBg'>
            <div className='container'>
                <div className="card row justify-content-center col-md-6 p-4 mx-auto">
                    <div className="card-header">
                        <h2>Ruang Event</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label  className="form-label">Username</label>
                            <input type="text" className="form-control"  placeholder="Username" value={username} onChange={onChangeUsername}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">First Name</label>
                            <input type="text" className="form-control"  placeholder="First Name" value={firstname} onChange={onChangeFirstname}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Last Name</label>
                            <input type="text" className="form-control"  placeholder="Last Name" value={lastname} onChange={onChangeLastname}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Email</label>
                            <input type="email" className="form-control"  placeholder="Email" value={email} onChange={onChangeEmail}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Password</label>
                            <input type="password" className="form-control"  placeholder="Password" value={password} onChange={onChangePassword}/>
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-success" type="button" onClick={handleSubmit}>Registrasi</button>
                            <NavLink to="/login">
                                Already have an account? Click here!
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;