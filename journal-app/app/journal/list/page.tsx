import { auth } from '@/firebase-config';
import React from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

const EntryList = () => {
    const [user, loading, error] = useIdToken(auth);
    return <div></div>;
};

export default EntryList;
