'use client';
import React from 'react';
import Link from 'next/link';

const LoginButton = () => {
    return (
        <button className='btn btn-ghost'>
            <Link href='/login'> Login </Link>
        </button>
    );
};

export default LoginButton;
