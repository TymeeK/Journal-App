import React from 'react';
import SignIn from './SignIn';

const LoginPage = () => {
    return (
        <div className='flex justify-center items-center  outline-primary h-screen '>
            <div className='form-control w-full max-w-xs p-5 rounded-xl'>
                <form>
                    {/* <label className='label'>
                        <span className='label-text'>Username</span>
                    </label>
                    <input
                        type='text'
                        placeholder='Username'
                        className='input input-bordered w-full max-w-xs'
                        name='username'
                    />
                    <label className='label'>
                        <span className='label-text'>Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Password'
                        className='input input-bordered w-full max-w-xs'
                        name='password'
                    />
                    <label className='label'>
                        <span className='label-text-alt'>
                            Don't have an account?
                        </span>
                        <span className='label-text-alt text-primary hover:cursor-pointer'>
                            Signup!
                        </span>
                    </label>
                    <button className='btn btn-ghost'> Login</button> */}
                    <SignIn />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
