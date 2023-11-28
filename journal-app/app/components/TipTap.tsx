'use client';
import { Link } from '@mantine/tiptap';
import { EditorContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useState } from 'react';
import { GrBold, GrItalic, GrStrikeThrough, GrUnderline } from 'react-icons/gr';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import {
    CiTextAlignCenter,
    CiTextAlignLeft,
    CiTextAlignRight,
} from 'react-icons/ci';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { useIdToken } from 'react-firebase-hooks/auth';
import { auth, readEntry, updateJournalEntry } from '@/firebase-config';
import Home from './Home';

const TipTap = () => {
    const [contentState, setContentState] = useState<string>('');
    const [user, loading, error] = useIdToken(auth);
    const [journalID, setJournalID] = useState('');
    let item: string | null = '';
    if (typeof window !== 'undefined') {
        if (item === null) return;
        item = localStorage.getItem('journalID');
    }

    useEffect(() => {
        if (item === null) return;
        readEntry(user, item);
    }, [user]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,

            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: `Journal entry...`,
            }),
        ],
        onUpdate: ({ editor }) => {
            const html: string = editor.getHTML();
            setContentState(html);
        },
    });

    if (loading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <div>
                    <span className='loading loading-spinner loading-lg'></span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Home />;
    } else {
        return (
            <>
                <EditorContent
                    editor={editor}
                    className='max-w-screen-md border border-primary bg-white  min-w-[768px] pl-5 pr-5 text-primary-content'
                    onKeyDown={(event) => {
                        if (event.ctrlKey && event.key === 's') {
                            updateJournalEntry(user, contentState);
                        }
                    }}
                    data-placeholder='sdsdsd'
                >
                    <div
                        className='flex justify-center items-center padding-5 
                    bg-secondary-content mb-5 -ml-5 -mr-5 gap-x-10 '
                    >
                        <div className='join'>
                            <button
                                onClick={() =>
                                    editor?.chain().focus().toggleBold().run()
                                }
                                disabled={
                                    !editor
                                        ?.can()
                                        .chain()
                                        .focus()
                                        .toggleBold()
                                        .run()
                                }
                                className={
                                    editor?.isActive('bold')
                                        ? 'join-item btn bg-primary'
                                        : 'join-item btn'
                                }
                            >
                                {editor?.isActive('bold') ? (
                                    <>
                                        <FaBold />
                                    </>
                                ) : (
                                    <>
                                        <GrBold />
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() =>
                                    editor?.chain().focus().toggleItalic().run()
                                }
                                disabled={
                                    !editor
                                        ?.can()
                                        .chain()
                                        .focus()
                                        .toggleItalic()
                                        .run()
                                }
                                className={
                                    editor?.isActive('italic')
                                        ? 'join-item btn bg-primary'
                                        : 'join-item btn'
                                }
                            >
                                {editor?.isActive('italic') ? (
                                    <>
                                        <FaItalic />
                                    </>
                                ) : (
                                    <>
                                        <GrItalic />
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .toggleUnderline()
                                        .run()
                                }
                                disabled={
                                    !editor
                                        ?.can()
                                        .chain()
                                        .toggleUnderline()
                                        .run()
                                }
                                className={
                                    editor?.isActive('underline')
                                        ? 'join-item btn bg-primary'
                                        : 'join-item btn'
                                }
                            >
                                {editor?.isActive('underline') ? (
                                    <>
                                        <FaUnderline />
                                    </>
                                ) : (
                                    <>
                                        <GrUnderline />
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() =>
                                    editor?.chain().focus().toggleStrike().run()
                                }
                                className={
                                    editor?.isActive('strike')
                                        ? 'join-item btn bg-primary'
                                        : 'join-item btn'
                                }
                            >
                                <GrStrikeThrough />
                            </button>
                        </div>
                        <div className='join'>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .setTextAlign('left')
                                        .run()
                                }
                                className={
                                    editor?.isActive({ textAlign: 'left' })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <CiTextAlignLeft />
                            </button>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .setTextAlign('center')
                                        .run()
                                }
                                className={
                                    editor?.isActive({
                                        textAlign: 'center',
                                    })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <CiTextAlignCenter />
                            </button>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .setTextAlign('right')
                                        .run()
                                }
                                className={
                                    editor?.isActive({ textAlign: 'right' })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <CiTextAlignRight />
                            </button>
                        </div>
                        <div className='join'>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .toggleHeading({ level: 1 })
                                        .run()
                                }
                                className={
                                    editor?.isActive('heading', {
                                        level: 1,
                                    })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <LuHeading1 />
                            </button>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .toggleHeading({ level: 2 })
                                        .run()
                                }
                                className={
                                    editor?.isActive('heading', {
                                        level: 2,
                                    })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <LuHeading2 />
                            </button>
                            <button
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .toggleHeading({ level: 3 })
                                        .run()
                                }
                                className={
                                    editor?.isActive('heading', {
                                        level: 3,
                                    })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <LuHeading3 />
                            </button>
                        </div>
                        <div className='join'>
                            <button
                                onClick={() => {
                                    updateJournalEntry(user, contentState);
                                }}
                                className='btn join-item'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </EditorContent>
            </>
        );
    }
};

export default TipTap;
