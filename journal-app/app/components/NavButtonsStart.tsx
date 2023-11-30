'use client';
import { auth } from '@/firebase-config';
import React from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

const NavButtonsStart = () => {
    const [user, loading, error] = useIdToken(auth);
    return (
        <>
            {user && (
                <>
                    <button className='btn btn-ghost'>
                        Create new journal
                    </button>
                    <button className='btn btn-ghost'>View all journals</button>
                </>
            )}
        </>
    );
};

export default NavButtonsStart;
