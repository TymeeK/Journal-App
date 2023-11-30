import TipTap from '@/app/components/TipTap';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div className=' h-screen w-screen flex justify-center '>
            <TipTap />
        </div>
    );
};

export default page;
