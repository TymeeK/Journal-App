import { MantineProvider } from '@mantine/core';
import TipTap from './components/TipTap';

export default function Home() {
    return (
        <div className=' h-screen w-screen flex justify-center '>
            <TipTap />
        </div>
    );
}
