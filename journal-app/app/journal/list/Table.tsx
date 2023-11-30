'use client';
import { auth, entryObject, readAllEntries } from '@/firebase-config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

const Table = () => {
    const [user, loading, error] = useIdToken(auth);
    const [entries, setEntries] = useState<entryObject[]>([]);

    useEffect(() => {
        if (user === null || user === undefined) return;
        const getAllEntries = async () => {
            const temp: entryObject[] | undefined = await readAllEntries(user);
            if (temp === undefined) return;
            setEntries(temp);
        };
        getAllEntries();
    }, [user]);

    return (
        <div className='overflow-x-auto'>
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Journal Title</th>
                        <th>View Jounal</th>
                        <th>Delete Journal</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => {
                        return (
                            <React.Fragment key={entry.id}>
                                <tr className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{entry.title}</td>
                                    <td>
                                        <Link href={`/journal/${entry.id}`}>
                                            View
                                        </Link>{' '}
                                    </td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
