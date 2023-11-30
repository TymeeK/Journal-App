'use client';
import {
    auth,
    deleteEntry,
    entryObject,
    readAllEntries,
} from '@/firebase-config';
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

    const onDelete = (e) => {
        const dataId = e.target.attributes.getNamedItem('data-id').value;
        document.getElementById('my_modal_1').showModal();
        // deleteEntry(user, dataId);
        // window.location.reload();
    };

    return (
        <>
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
                                                <button className='btn btn-ghost'>
                                                    View
                                                </button>
                                            </Link>{' '}
                                        </td>
                                        <td>
                                            <button
                                                className='btn'
                                                onClick={onDelete}
                                                data-id={entry.id}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    <dialog id='my_modal_1' className='modal'>
                                        <div className='modal-box'>
                                            <h3 className='font-bold text-lg'>
                                                Hello!
                                            </h3>
                                            <p className='py-4'>
                                                Warning you are about to delete
                                                one of your journal entries.
                                                Proceed?
                                            </p>
                                            <div className='modal-action'>
                                                <form method='dialog'>
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button
                                                        className='btn bg-red-600 mr-5'
                                                        onClick={() => {
                                                            deleteEntry(
                                                                user,
                                                                entry.id
                                                            );
                                                            window.location.reload();
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button className='btn'>
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
