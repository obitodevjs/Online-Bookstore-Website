import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast(dataApi.message)
                navigate("/login")
            }
            if (dataApi.error) {
                toast(dataApi.message)
            }

        } else {
            toast("Please check your password and confirm passowrd")

        }
    }


    return (
        <section id='signup' className="min-h-screen flex items-center justify-center">
            <div className='bg-white p-8 w-full max-w-md mx-auto rounded-lg shadow-xl'>
                <div className='w-24 h-24 mx-auto mb-4'>
                    <img src={loginIcons} alt="Sign Up" />
                </div>

                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-semibold">Name:</label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='w-full bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500' />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full bg-gray-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500' />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Password:</label>
                        <div className='bg-gray-100 p-3 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-red-500'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full bg-transparent outline-none' />
                            <div className='cursor-pointer text-xl text-gray-600' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Confirm Password:</label>
                        <div className='bg-gray-100 p-3 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-red-500'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                className='w-full bg-transparent outline-none' />
                            <div className='cursor-pointer text-xl text-gray-600' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>

                    <button className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105'>
                        Sign Up
                    </button>
                </form>

                <p className='mt-6 text-center'>Already have an account? <Link to={"/login"} className='text-red-600 hover:underline'>Login</Link></p>
            </div>
        </section>
    );
};

export default SignUp;
