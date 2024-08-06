import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export function BackButton() {
    const router = useRouter();
    return (
        <button onClick={() => router.back()}>
            <ArrowLeftIcon className="w-6 h-6" />
        </button>
    );
}
