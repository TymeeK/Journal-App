'use client';
import React from 'react';
import Link from 'next/link';
import { auth } from '@/firebase-config';
import {
    useAuthState,
    useSignOut,
    useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const NavButtons = () => {
    const [signOut, loadSignout, signOuterror] = useSignOut(auth);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <>
            {user ? (
                <>
                    <button className='btn btn-ghost'>
                        <Link href='/login'>
                            Welcome {user.user.displayName}!
                        </Link>
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
