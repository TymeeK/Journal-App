import React from 'react';

const Loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        </div>
    );
};

export default Loading;
