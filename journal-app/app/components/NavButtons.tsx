'use client';
import React, { useEffect, useState } from 'react';
import { addUser, auth } from '@/firebase-config';
import {
    useSignOut,
    useSignInWithGoogle,
    useIdToken,
} from 'react-firebase-hooks/auth';

const NavButtons = () => {
    const [signOut, loadSignout, signOuterror] = useSignOut(auth);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [userId, idLoading, idError] = useIdToken(auth);

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
                            window.location.reload();
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

export default NavButtons;
