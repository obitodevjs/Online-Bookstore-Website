import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if (dataApi.err) {
            toast.error(dataApi.message)
        }
    };

    return (
        <section id='login' className="min-h-screen flex items-center justify-center">
            <div className='bg-white p-8 w-full max-w-md mx-auto rounded-lg shadow-xl'>
                <div className='w-24 h-24 mx-auto mb-4'>
                    <img src={loginIcons} alt="Login" />
                </div>

                <form className='space-y-6' onSubmit={handleSubmit}>
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

                    <Link to={'/forgot-password'} className='block text-sm text-red-600 hover:underline text-right'>
                        Forgot password?
                    </Link>

                    <button className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105'>
                        Login
                    </button>
                </form>

                <p className='mt-6 text-center'>Don't have an account? <Link to={"/sign-up"} className='text-red-600 hover:underline'>Sign up</Link></p>
            </div>
        </section>
    );
};

export default Login;
