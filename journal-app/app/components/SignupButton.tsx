'use client';
import React from 'react';
import Link from 'next/link';

const SignupButton = () => {
    return (
        <button className='btn btn-ghost'>
            <Link href='/signup'>Signup</Link>
        </button>
    );
};

export default SignupButton;
