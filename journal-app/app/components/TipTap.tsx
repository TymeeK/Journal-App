'use client';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { EditorContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useState } from 'react';
import { GrBold, GrItalic, GrStrikeThrough, GrUnderline } from 'react-icons/gr';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import {
    CiTextAlignCenter,
    CiTextAlignLeft,
    CiTextAlignRight,
} from 'react-icons/ci';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase-config';
import Home from './Home';

const content: string =
    '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';
const TipTap = () => {
    const [contentState, setContentState] = useState<string>(content);
    const [user, loading, error] = useAuthState(auth);

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
        ],
        content,
        onUpdate: ({ editor }) => {
            const html: string = editor.getHTML();
            setContentState(html);
            console.log(contentState);
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
                                    editor?.isActive({ textAlign: 'center' })
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
                                    editor?.isActive('heading', { level: 1 })
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
                                    editor?.isActive('heading', { level: 2 })
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
                                    editor?.isActive('heading', { level: 3 })
                                        ? 'is-active btn join-item bg-primary'
                                        : 'btn join-item'
                                }
                            >
                                <LuHeading3 />
                            </button>
                        </div>
                    </div>
                </EditorContent>
            </>
        );
    }
};

export default TipTap;
