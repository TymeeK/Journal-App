'use client';
import React from 'react';
import Link from 'next/link';
import { auth } from '@/firebase-config';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const NavButtons = () => {
    const [user, loading, error] = useAuthState(auth);
    const [signOut, loadSignout, signOuterror] = useSignOut(auth);
    const route = useRouter();

    return (
        <>
            {user ? (
                <>
                    <button className='btn btn-ghost'>
                        <Link href='/login'>Welcome {user.displayName}! </Link>
                    </button>
                    <button
                        className='btn btn-ghost'
                        onClick={async () => {
                            const success = await signOut();
                            if (success) alert('You are signed out');
                            route.push('/');
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
