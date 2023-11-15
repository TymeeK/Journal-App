'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkIfLoggedIn, createUser, googleLogin } from '@/firebase-config';
import { useRouter } from 'next/navigation';
import { Unsubscribe } from 'firebase/auth';

interface Inputs {
    email: string;
    password: string;
    confirmPw: string;
}

const FormFields = (props) => {
    const [pwEqual, setPwEqual] = useState<boolean>(true);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = (data) => {
        if (data.password !== data.confirmPw) {
            setPwEqual(false);
            return;
        }
        setPwEqual(true);
        createUser(data.email, data.password);
        router.push('/');
    };

    const onClickGoogleButton = () => {
        googleLogin();
    };

    useEffect(() => {
        const isUserSignedIn = async () => {
            setLoggedIn(await checkIfLoggedIn());
            if (loggedIn) router.push('/');
        };
        isUserSignedIn();
    }, [loggedIn]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='label'>
                    <span className='label-text'>Email</span>
                </label>
                <input
                    type='text'
                    className={props.classname}
                    {...register('email', { required: true })}
                    placeholder='Email'
                />
                {errors.email && (
                    <label className='label'>
                        <span className='label-text-alt text-primary'>
                            This field is required
                        </span>
                    </label>
                )}
                <label className='label'>
                    <span className='label-text'>Password</span>
                </label>
                <input
                    type='password'
                    className={props.classname}
                    {...register('password', { required: true })}
                    placeholder='Password'
                />
                {errors.password && (
                    <label className='label'>
                        <span className='label-text-alt text-primary'>
                            This field is required
                        </span>
                    </label>
                )}
                <label className='label'>
                    <span className='label-text'>Confirm Password</span>
                </label>
                <input
                    type='password'
                    className={props.classname}
                    {...register('confirmPw', { required: true })}
                    placeholder='Confirm Password'
                />
                {errors.confirmPw && (
                    <label className='label'>
                        <span className='label-text-alt text-primary'>
                            This field is required
                        </span>
                    </label>
                )}
                {!pwEqual && (
                    <label className='label'>
                        <span className='label-text-alt text-primary'>
                            Your passwords do not match
                        </span>
                    </label>
                )}
                <div className='flex justify-center'>
                    <button className='btn btn-ghost m-5 '> Sign up</button>
                </div>
            </form>
            <div className='flex justify-center'>
                <button className='btn btn-ghost' onClick={onClickGoogleButton}>
                    Sign in with Google
                </button>
            </div>
        </>
    );
};

export default FormFields;
