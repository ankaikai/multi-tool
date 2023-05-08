import {FC} from 'react';

const BurgerButton: FC<{ onClick: () => void }> = ({onClick}) => {

    return (
        <div onClick={onClick}
             className="absolute left-2 right-2 flex flex-col justify-center items-center cursor-pointer w-10 h-10 p-2">
            <div className="block w-6 h-0.5 bg-gray-600 rounded-full"></div>
            <div className="block w-6 h-0.5 bg-gray-600 mt-1 rounded-full"></div>
            <div className="block w-6 h-0.5 bg-gray-600 mt-1 rounded-full"></div>
        </div>
    );
};

export default BurgerButton;