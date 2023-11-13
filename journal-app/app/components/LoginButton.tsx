'use client';
import React from 'react';
import Link from 'next/link';

const LoginButton = () => {
    return (
        <button className='btn btn-ghost' onClick={() => console.log('Hello')}>
            <Link href='/login'> Login </Link>
        </button>
    );
};

export default LoginButton;
