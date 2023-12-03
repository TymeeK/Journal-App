'use client';
import React, { useEffect } from 'react';
import splash from '../Images/splash.jpg';
import { useIdToken, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, createEntry, createUser } from '@/firebase-config';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface props {
    WELCOME: string;
    MESSAGE: string;
    BUTTON_MESSAGE: string;
    buttonAction: () => void;
}

const HeroPage = (props: props) => {
    return (
        <div
            className='hero min-h-screen'
            style={{
                backgroundImage: `url(${splash.src})`,
            }}
        >
            <div className='hero-overlay bg-opacity-60'></div>
            <div className='hero-content text-center text-neutral-content'>
                <div className='max-w-md'>
                    <h1 className='mb-5 text-5xl font-bold'>{props.WELCOME}</h1>
                    <p className='mb-5'>{props.MESSAGE}</p>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            props.buttonAction();
                        }}
                    >
                        {props.BUTTON_MESSAGE}
                    </button>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const router: AppRouterInstance = useRouter();
    const [userID, idLoading, idError] = useIdToken(auth);

    useEffect(() => {
        createUser(userID);
    }, [userID]);

    const LOGGED_OUT = {
        WELCOME: 'Hello there welcome to my Journal App',
        MESSAGE: 'Click to login and get started',
        BUTTON_MESSAGE: 'Get started',
    };

    const navigateToJournal = async () => {
        const entryID: string | undefined = await createEntry(userID);
        if (entryID === undefined) return;
        router.push(`/journal/${entryID}`);
    };
    const LOGGED_IN = {
        WELCOME: `Hello there ${userID?.displayName}`,
        MESSAGE: 'Click the button below to create a journal entry!',
        BUTTON_MESSAGE: 'Create Journal Entry',
        buttonAction: navigateToJournal,
    };

    if (idLoading) {
        return <Loading />;
    }
    if (!userID) {
        return (
            <HeroPage
                buttonAction={signInWithGoogle}
                WELCOME={LOGGED_OUT.WELCOME}
                MESSAGE={LOGGED_OUT.MESSAGE}
                BUTTON_MESSAGE={LOGGED_OUT.BUTTON_MESSAGE}
            />
        );
    } else {
        return (
            <HeroPage
                WELCOME={LOGGED_IN.WELCOME}
                MESSAGE={LOGGED_IN.MESSAGE}
                BUTTON_MESSAGE={LOGGED_IN.BUTTON_MESSAGE}
                buttonAction={LOGGED_IN.buttonAction}
            />
        );
    }
};

export default HomePage;
