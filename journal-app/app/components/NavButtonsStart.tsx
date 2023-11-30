'use client';
import { auth } from '@/firebase-config';
import Link from 'next/link';
import React from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';
import Loading from './Loading';

const NavButtonsStart = () => {
    const [user, loading, error] = useIdToken(auth);

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            {user && (
                <>
                    <button className='btn btn-ghost'>
                        Create new journal
                    </button>
                    <button className='btn btn-ghost'>
                        <Link href='/journal/list'>View all journals</Link>
                    </button>
                </>
            )}
        </>
    );
};

export default NavButtonsStart;
