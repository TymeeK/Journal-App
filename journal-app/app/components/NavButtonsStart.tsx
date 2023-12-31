'use client';
import { auth, createEntry } from '@/firebase-config';
import Link from 'next/link';
import React from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

const NavButtonsStart = () => {
    const [user, loading, error] = useIdToken(auth);
    const router = useRouter();

    if (loading) {
        return <Loading />;
    }
    const clickButton = async () => {
        const entryID: string | undefined = await createEntry(user);
        if (entryID === undefined) return;
        router.push(`/journal/${entryID}`);
    };

    return (
        <>
            {user && (
                <>
                    <li>
                        <button onClick={clickButton}>
                            Create new journal
                        </button>
                    </li>
                    <li>
                        <Link href='/journal/list'>View all journals</Link>
                    </li>
                    <li>
                        <Link href='/about'>About</Link>
                    </li>
                </>
            )}
        </>
    );
};

export default NavButtonsStart;
