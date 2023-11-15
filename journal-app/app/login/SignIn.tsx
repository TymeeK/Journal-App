'use client';
import React from 'react';
import { auth, provider } from '@/firebase-config';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const router = useRouter();
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (user) {
        router.push('/');
    }
    return (
        <button className='btn btn-ghost' onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    );
};

export default SignIn;
