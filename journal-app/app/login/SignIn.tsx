'use client';
import React from 'react';
import { auth, provider } from '@/firebase-config';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Loading from './loading';

const SignIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const router = useRouter();
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading) {
        return <Loading />;
    }
    if (user) {
        router.push('/');
    }
    return (
        <div className='w-full flex justify-center'>
            <button
                className='btn btn-ghost'
                onClick={() => signInWithGoogle()}
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SignIn;
