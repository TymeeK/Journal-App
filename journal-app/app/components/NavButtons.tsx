'use client';
import React from 'react';
import Link from 'next/link';
import { auth } from '@/firebase-config';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';

const NavButtons = () => {
    const [user, loading, error] = useAuthState(auth);
    const [signOut, loadSignout, signOuterror] = useSignOut(auth);

    if (loadSignout) {
    }

    return (
        <>
            {user ? (
                <>
                    {' '}
                    <button className='btn btn-ghost'>
                        <Link href='/login'> {user.displayName} </Link>
                    </button>
                    <button
                        className='btn btn-ghost'
                        onClick={async () => {
                            const success = await signOut();
                            if (success) alert('You are signed out');
                        }}
                    >
                        Sign out
                    </button>
                </>
            ) : (
                <>
                    {' '}
                    <button className='btn btn-ghost'>
                        <Link href='/login'> Login </Link>
                    </button>
                    <button className='btn btn-ghost'>
                        <Link href='/signup'>Sign up</Link>
                    </button>
                </>
            )}
        </>
    );
};

export default NavButtons;
