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
import { FaBold, FaItalic, FaRegSave, FaUnderline } from 'react-icons/fa';
import {
    CiTextAlignCenter,
    CiTextAlignLeft,
    CiTextAlignRight,
} from 'react-icons/ci';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { useIdToken } from 'react-firebase-hooks/auth';
import { auth, readEntry, updateEntry } from '@/firebase-config';
import Home from './Home';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'next/navigation';

const TipTap = () => {
    const [user, loading, error] = useIdToken(auth);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const params = useParams();
    let idTemp: string | string[] = params.id;
    let id = idTemp as string;

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
            setContent(html);
        },
    });

    useEffect(() => {
        const getContent = async () => {
            const data: DocumentData | undefined = await readEntry(user, id);
            if (data === undefined) return;
            editor?.commands.setContent(data.content);
            setContent(data.content);
            if (data.title !== '') setTitle(data.title);
        };
        getContent();
    }, [user, editor]);

    if (loading) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <div>
                    <span className='loading loading-spinner loading-lg'></span>
                </div>
            </div>
        );
    }

    const updateJournal = () => {
        updateEntry(user, id, content, title);
    };

    if (!user) {
        return <Home />;
    } else {
        return (
            <>
                <EditorContent
                    editor={editor}
                    className='max-w-screen-md border border-primary bg-white  min-w-[768px] pl-5 pr-5 text-primary-content'
                    onKeyDown={(e) => {
                        if (e.ctrlKey && e.key === 's') {
                            updateJournal();
                        }
                    }}
                >
                    <div
                        className='flex justify-center items-center padding-5 
                    bg-secondary-content mb-5 -ml-5 -mr-5 gap-x-10 '
                    >
                        <div className='join'>
                            <div className='tooltip' data-tip='cmd+b/ctrl+b'>
                                <button
                                    onClick={() =>
                                        editor
                                            ?.chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
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
                            </div>
                            <div className='tooltip' data-tip='cmd+i/ctrl+i'>
                                <button
                                    onClick={() =>
                                        editor
                                            ?.chain()
                                            .focus()
                                            .toggleItalic()
                                            .run()
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
                            </div>
                            <div className='tooltip' data-tip='cmd+u/ctrl+u'>
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
                            </div>
                            <div
                                className='tooltip'
                                data-tip='cmd+shift+x/ctrl+shift+x'
                            >
                                <button
                                    onClick={() =>
                                        editor
                                            ?.chain()
                                            .focus()
                                            .toggleStrike()
                                            .run()
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
                        </div>
                        <div className='join'>
                            <div
                                className='tooltip'
                                data-tip='cmd+shift+l/ctrl+shift+l'
                            >
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
                            </div>
                            <div
                                className='tooltip'
                                data-tip='cmd+shift+e/ctrl+shift+e'
                            >
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
                            </div>
                            <div
                                className='tooltip'
                                data-tip='cmd+shift+r/ctrl+shift+r'
                            >
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
                        </div>
                        <div className='join'>
                            <div className='tooltip' data-tip='#'>
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
                            </div>
                            <div className='tooltip' data-tip='##'>
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
                            </div>
                            <div className='tooltip' data-tip='###'>
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
                        </div>
                        <div className='join'>
                            <div className='tooltip' data-tip='ctrl + s'>
                                <button
                                    className='btn join-item'
                                    onClick={updateJournal}
                                >
                                    <FaRegSave />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='border-b-2 border-black-500 mb-5 pb-5'>
                        <input
                            type='text'
                            className='bg-white focus:outline-none text-3xl w-full'
                            placeholder='Add A Title'
                            value={title !== '' ? title : ''}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>
                </EditorContent>
            </>
        );
    }
};

export default TipTap;
