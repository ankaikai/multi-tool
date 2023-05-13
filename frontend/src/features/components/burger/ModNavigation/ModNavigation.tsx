import {FC} from 'react';
import {Link, useLocation} from "react-router-dom";

const ModNavigation: FC = () => {
    const location = useLocation();
    const apps: string[] = [
        'Calendar', 'To-Do', 'Weather'
    ];

    return (
        <div className="flex flex-row justify-center relative top-20">
            {/*Select Apps Mod*/}
            <nav>
                <ul className="flex flex-col gap-4 justify-start">
                    {apps.map((app, index) => (
                        <li className={
                            location.pathname ===
                            `/${app.toLowerCase().replace('-', '')}`
                                ? 'text-xl text-pink-600' : 'text-xl flex flex-col'}
                            key={index} value={app}>
                            <Link to={`/${app.toLowerCase().replace('-', '')}`}>
                                {app}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ModNavigation;