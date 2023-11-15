import React from 'react';
import FormFields from './FormFields';

const SignupPage = () => {
    return (
        <div className='flex justify-center items-center  outline-primary h-screen '>
            <div className='form-control w-full max-w-xs border-2 p-5 rounded-xl '>
                <FormFields classname='input input-bordered w-full max-w-xs' />
            </div>
        </div>
    );
};

export default SignupPage;
