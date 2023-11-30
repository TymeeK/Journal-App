'use client';
import { auth, entryObject, readAllEntries } from '@/firebase-config';
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
            console.log(temp);
            setEntries(temp);
            console.log(entries);
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
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}

                    {entries.map((entry, index) => {
                        return (
                            <React.Fragment key={entry.id}>
                                <tr className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{entry.title}</td>
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
