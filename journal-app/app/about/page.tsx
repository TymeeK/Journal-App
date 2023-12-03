import React from 'react';

const page = () => {
    return (
        <>
            <div className='collapse bg-base-200'>
                <input type='radio' name='my-accordion-1' />
                <div className='collapse-title text-xl font-medium'>
                    Who are you?
                </div>
                <div className='collapse-content'>
                    <p>
                        Hi! My name is Tymee Kong and I am a computer science
                        graduate from CSULB. I am specializing in web
                        development using React!
                    </p>
                </div>
            </div>

            <div className='collapse bg-base-200'>
                <input type='radio' name='my-accordion-1' />
                <div className='collapse-title text-xl font-medium'>
                    What did you make this project with?
                </div>
                <div className='collapse-content'>
                    <p>
                        I made this project using Next.js, React, and TypeScript
                    </p>
                </div>
            </div>
            <div className='collapse bg-base-200'>
                <input type='radio' name='my-accordion-1' />
                <div className='collapse-title text-xl font-medium'>
                    What motivated you to make this project?
                </div>
                <div className='collapse-content'>
                    <p>
                        I wanted to experiment and learn two new technologies.
                        This is my first ever project using Next.js and
                        TypeScript!
                    </p>
                </div>
            </div>
            <div className='collapse bg-base-200'>
                <input type='radio' name='my-accordion-1' />
                <div className='collapse-title text-xl font-medium'>
                    Why did you decide to make a journal app?
                </div>
                <div className='collapse-content'>
                    <p>
                        I love to journal in a notebook and write my thoughts
                        down. It helps me think things through and helps me
                        gather my thoughts from the day. It helps me relax and
                        destress from the day and I thought that I should make
                        something that would help everyone destress in their
                        life!
                    </p>
                </div>
            </div>
        </>
    );
};

export default page;
