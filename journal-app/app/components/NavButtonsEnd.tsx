'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase-config';
import {
    useSignOut,
    useSignInWithGoogle,
    useIdToken,
} from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const NavButtonsEnd = () => {
    const [signOut, loadSignout, signOuterror] = useSignOut(auth);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [userId, idLoading, idError] = useIdToken(auth);
    const router = useRouter();

    if (idLoading || loading) {
        return (
            <div className='flex justify-center items-center'>
                <div>
                    <span className='loading loading-spinner loading-lg'></span>
                </div>
            </div>
        );
    }
    if (error) {
        console.error(error);
    }

    return (
        <>
            {userId ? (
                <>
                    <button className='btn btn-ghost'>
                        Welcome {userId.displayName}!
                    </button>
                    <button
                        className='btn btn-ghost'
                        onClick={async () => {
                            await signOut();
                            router.push('/');
                        }}
                    >
                        Sign out
                    </button>
                </>
            ) : (
                <>
                    <button
                        className='btn btn-ghost'
                        onClick={() => signInWithGoogle()}
                    >
                        Sign in with Google
                    </button>
                </>
            )}
        </>
    );
};

export default NavButtonsEnd;
