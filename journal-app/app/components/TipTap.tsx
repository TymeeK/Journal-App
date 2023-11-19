'use client';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { EditorContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Heading from '@tiptap/extension-heading';
import { useState } from 'react';

const content =
    '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';
const TipTap = () => {
    const [contentState, setContentState] = useState<string>(content);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
        onUpdate: ({ editor }) => {
            const html: string = editor.getHTML();
            setContentState(html);
            console.log(contentState);
        },
    });

    return (
        <>
            <EditorContent editor={editor}>
                <div className='flex justify-center items-center padding-5'>
                    <button
                        onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                        }
                        disabled={
                            !editor?.can().chain().focus().toggleBold().run()
                        }
                        className='m-5'
                    >
                        Bold
                    </button>
                    <button
                        onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                        }
                        disabled={
                            !editor?.can().chain().focus().toggleItalic().run()
                        }
                    >
                        Italics
                    </button>
                    <button
                        onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                        }
                        disabled={
                            !editor?.can().chain().toggleUnderline().run()
                        }
                    >
                        Underline
                    </button>
                </div>
            </EditorContent>
        </>
    );
};

export default TipTap;
