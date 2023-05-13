import { FC } from 'react';

interface ChildProps {
    toggleNext: () => void;
    toggleBack: () => void;
}
const DateSwitcher : FC<ChildProps> = ({toggleBack, toggleNext}) => {
    return(
    <div className="flex flex-row items-center rounded-br-3xl rounded-tr-3xl">
        <div
            onClick={toggleBack}
            className="flex h-full items-center justify-center text-5xl cursor-pointer w-14 bg-purple-500 hover:bg-purple-400 active:bg-purple-300">
            <div>←</div>
        </div>
        <div
            onClick={toggleNext}
            className="flex h-full items-center justify-center text-5xl cursor-pointer w-14 bg-purple-500 hover:bg-purple-400 active:bg-purple-300 rounded-br-3xl rounded-tr-3xl">
            <div>→</div>
        </div>
    </div>
    );
}

export default DateSwitcher;