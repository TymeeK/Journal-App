import React, { Suspense } from 'react';
import FormFields from './FormFields';
import { checkIfLoggedIn } from '@/firebase-config';

const SignupPage = async () => {
    const currentUser = await checkIfLoggedIn();
    console.log(currentUser);

    return (
        <div className='flex justify-center items-center  outline-primary h-screen '>
            <div className='form-control w-full max-w-xs border-2 p-5 rounded-xl '>
                <FormFields classname='input input-bordered w-full max-w-xs' />
            </div>
        </div>
    );
};

export default SignupPage;
