import {FC} from 'react';
import ModSwitcher from "../ModNavigation/ModNavigation";

const BurgerMenu: FC<{ isOpen: boolean }> = ({isOpen}) => {
    return (
        <div>
            {
                isOpen &&
                (
                    <div className="w-60 h-screen bg-white rounded-r-3xl bg-gradient-to-tl from-purple-600 via-purple-700 to-transparent">
                        <ModSwitcher/>
                    </div>
                )
            }
        </div>

    );
};

export default BurgerMenu;