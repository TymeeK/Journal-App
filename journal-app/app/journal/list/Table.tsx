'use client';
import { auth } from '@/firebase-config';
import React from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

const Table = () => {
    const [user, loading, error] = useIdToken(auth);

    return (
        <div className='overflow-x-auto'>
            <table className='table'>
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Journal Title</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr className='hover hover:'>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
