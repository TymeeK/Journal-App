import { MantineProvider } from '@mantine/core';
import TipTap from './components/TipTap';
import HomePage from './components/Home';
import { useJournalStore } from './zustand';

export default function Home() {
    return (
        <div className=' h-screen w-screen flex justify-center '>
            <HomePage />
        </div>
    );
}
