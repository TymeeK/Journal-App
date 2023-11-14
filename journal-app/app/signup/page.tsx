import React from 'react';

const SignupPage = () => {
    async function create(formData: FormData): Promise<void> {
        'use server';
        //Do database stuff
    }
    return (
        <div className='flex justify-center items-center  outline-primary h-screen '>
            <div className='form-control w-full max-w-xs border-2 p-5 rounded-xl '>
                <form action={create}>
                    <label className='label'>
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
                        <span className='label-text'>Confirm Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className='input input-bordered w-full max-w-xs'
                    />
                    <button className='btn btn-ghost m-5'> Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
