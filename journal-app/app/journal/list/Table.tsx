'use client';
import Loading from '@/app/components/Loading';
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
    const [entryToDelete, setEntryToDelete] = useState<string>('');

    useEffect(() => {
        if (user === null || user === undefined) return;
        const getAllEntries = async () => {
            const temp: entryObject[] | undefined = await readAllEntries(user);
            if (temp === undefined) return;
            setEntries(temp);
        };
        getAllEntries();
    }, [user]);

    if (loading) {
        <Loading />;
    }

    const popModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        const deleteModal = document.getElementById(
            'my_modal_1'
        ) as HTMLDialogElement;
        if (deleteModal === null) return;
        deleteModal.showModal();
        setEntryToDelete(e.currentTarget.getAttribute('data-id') as string);
    };
    const confirmDelete = () => {
        deleteEntry(user, entryToDelete);
        window.location.reload();
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
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className='btn bg-primary'
                                                onClick={popModal}
                                                data-id={entry.id}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <dialog id='my_modal_1' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Hello!</h3>
                    <p className='py-4'>
                        Warning you are about to delete one of your journal
                        entries. Proceed?
                    </p>
                    <div className='modal-action'>
                        <form method='dialog'>
                            <button
                                className='btn bg-primary mr-5'
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                            <button className='btn'>Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Table;
