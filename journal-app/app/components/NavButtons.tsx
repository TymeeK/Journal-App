'use client';
import React from 'react';
import { auth } from '@/firebase-config';
import { useSignOut, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const NavButtons = () => {
    const [signOut, loadSignout, signOuterror] = useSignOut(auth);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <>
            {user ? (
                <>
                    <button className='btn btn-ghost'>
                        Welcome {user.user.displayName}!
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
                    {' '}
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
