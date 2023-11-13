import React from 'react';

const LoginPage = () => {
    return (
        <div className='flex justify-center items-center  outline-primary h-screen '>
            <div className='form-control w-full max-w-xs border-2 p-5 rounded-xl '>
                <label className='label'>
                    <span className='label-text'>Username</span>
                </label>
                <input
                    type='text'
                    placeholder='Username'
                    className='input input-bordered w-full max-w-xs'
                />
                <label className='label'>
                    <span className='label-text'>Password</span>
                </label>
                <input
                    type='password'
                    placeholder='Password'
                    className='input input-bordered w-full max-w-xs'
                />
                <label className='label'>
                    <span className='label-text-alt'>
                        Don't have an account?
                    </span>
                    <span className='label-text-alt text-primary hover:cursor-pointer'>
                        Signup!
                    </span>
                </label>
            </div>
        </div>
    );
};

export default LoginPage;
