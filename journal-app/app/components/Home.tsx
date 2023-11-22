'use client';
import React from 'react';
import splash from '../Images/splash.jpg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase-config';

const Home = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <div
            className='hero min-h-screen'
            style={{
                backgroundImage: `url(${splash.src})`,
            }}
        >
            <div className='hero-overlay bg-opacity-60'></div>
            <div className='hero-content text-center text-neutral-content'>
                <div className='max-w-md'>
                    <h1 className='mb-5 text-5xl font-bold'>
                        Hello there welcome to my Journal App
                    </h1>
                    <p className='mb-5'>Click to login and get started</p>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            signInWithGoogle();
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
