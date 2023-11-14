import React from 'react';
import LoginButton from '../components/LoginButton';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const LoginPage = () => {
    async function create(formData: FormData): Promise<void> {
        'use server';
        //Do stuff in the database
        console.log(formData.get('username')?.valueOf());
        console.log(formData.get('password')?.valueOf());
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
                        <span className='label-text-alt'>
                            Don't have an account?
                        </span>
                        <span className='label-text-alt text-primary hover:cursor-pointer'>
                            Signup!
                        </span>
                    </label>
                    <button className='btn btn-ghost'> Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
