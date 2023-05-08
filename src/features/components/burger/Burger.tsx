import {FC, useState} from 'react';
import BurgerButton from "./BurgerMenu/BurgerButton";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Burger: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="burger absolute z-10">
            <BurgerButton onClick={toggleMenu}/>
            <BurgerMenu isOpen={isOpen}/>
        </div>
    );
}

export default Burger;