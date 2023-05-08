import './App.css';
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './features/appMods/Calendar/Calendar';
import ToDo from './features/appMods/ToDo/ToDo';
import Weather from './features/appMods/Weather/Weather';
import Burger from "./features/components/burger/Burger";
const App : FC = () => {
    return (
        <div className="App h-screen bg-gradient-to-br from-yellow-400 via-pink-500 to-transparent">
            <Burger />
                <Routes>
                    <Route path='/' element={<Calendar />}/>
                    <Route path='/calendar' element={<Calendar />}/>
                    <Route path='/todo' element={<ToDo />}/>
                    <Route path='/weather' element={<Weather />}/>
                </Routes>
        </div>
    );
}

export default App;