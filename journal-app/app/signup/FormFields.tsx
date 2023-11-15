'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
    username: string;
    password: string;
    confirmPw: string;
};

const FormFields = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = (data) => {
        console.log(data);
        console.log(data.username);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='label'>
                    <span className='label-text'>Username</span>
                </label>
                <input
                    type='text'
                    className={props.classname}
                    {...register('username', { required: true })}
                    placeholder='Username'
                />
                {errors.username && (
                    <label className='label'>
                        <span className='label-text-alt'>
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
                        <span className='label-text-alt'>
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
                <div className='flex justify-center'>
                    <button className='btn btn-ghost m-5 '> Sign up</button>
                </div>
            </form>
        </>
    );
};

export default FormFields;
