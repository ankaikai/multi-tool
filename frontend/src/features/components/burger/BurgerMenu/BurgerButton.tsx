import {FC, useState} from 'react';

const BurgerButton: FC<{ onClick: () => void }> = ({onClick}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const isMouseEnter = () : void => {
        setHovered(true);
    }
    const isMouseLeave = () : void => {
        setHovered(false);
    }

    return (
        <div onClick={onClick} onMouseEnter={isMouseEnter} onMouseLeave={isMouseLeave}
             className="absolute left-3 top-3 flex flex-col justify-center items-center cursor-pointer w-10 h-10 p-2">
            <div className={`block w-7 h-0.5 ${hovered ? 'bg-gray-500' : 'bg-gray-600'} rounded-full`}></div>
            <div className={`block w-7 h-0.5 ${hovered ? 'bg-gray-500' : 'bg-gray-600'} mt-1.5 rounded-full`}></div>
            <div className={`block w-7 h-0.5 ${hovered ? 'bg-gray-500' : 'bg-gray-600'} mt-1.5 rounded-full`}></div>
        </div>
    );
};

export default BurgerButton;