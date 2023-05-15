import React, {FC, useState, useEffect} from 'react';
import DateSwitcher from './DateSwitcher';

interface Note {
    hour: string;
    dayOfWeek: string;
    content: string;
}

const CalendarTable: FC = () => {
    const [hoveredCell, setHoveredCell] = useState<string | null>(null);
    const [currentWeek, setCurrentWeek] = useState<number>(1);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>(new Date());
    const [notes, setNotes] = useState<Note[]>([]);


    // TIME HANDLE
    //generate dates
    useEffect(() => {
        const today = new Date();
        const firstDay = today.getDate() - today.getDay() + (7 * (currentWeek - 1));
        const firstDayOfWeek = new Date(today.setDate(firstDay));
        setFirstDayOfWeek(firstDayOfWeek);
    }, [currentWeek]);


    const getFormattedDate = (dayOfWeek: number, dayOfMonth: number) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const newDate = new Date(currentYear, currentMonth, dayOfMonth);
        newDate.setDate(newDate.getDate() + dayOfWeek); // Устанавливаем правильный день недели
        return newDate.toLocaleDateString();
    };

    // match time in current range
    const isTimeInRange = (time: string, start: string, end: string): boolean => {
        return time >= start && time < end;
    };

    // currents timing
    const currentMonth: number = new Date().getMonth() + 1;
    const currentDayDate: number = new Date().getDate();
    const currentYear: number = new Date().getFullYear();
    const currentDate: string = `${currentMonth}/${currentDayDate}/${currentYear}`;
    //current time in 24-hour format
    const currentTime: string = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});

    const DAYS_OF_WEEK: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const HOURS_OF_DAY: string[] = Array.from({length: 24}, (_, i) => {
        const hour = ((i + 5) % 24).toString().padStart(2, '0');
        return `${hour}:00`;
    });

    // NOTES HANDLE
    useEffect(() => {
        // Restoring Notes from the Cache when Component Load
        const cachedNotes = localStorage.getItem('calendarNotes');
        if (cachedNotes) {
            setNotes(JSON.parse(cachedNotes));
        }
    }, []);

// add new notes and save to cash
    const handleAddNote = (hour: string, dayOfWeek: string) => {
        const content = prompt('Enter your note:');
        if (content) {
            const newNote: Note = {hour, dayOfWeek, content};
            setNotes((prevNotes) => {
                const updatedNotes = [...prevNotes, newNote];
                // Сохранение заметок в кэше после добавления
                localStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));
                return updatedNotes;
            });
        }
    };

// delete all notes and clear cash
    const handleClearNotes = () => {
        setNotes([]);
        // Очистка кэша при удалении всех заметок
        localStorage.removeItem('calendarNotes');
    };

// STYLES ACTION
// mouse enter on table cell
    const handleMouseEnter = (cellIndex: string) => {
        setHoveredCell(cellIndex);
    };

// mouse leave from table cell
    const handleMouseLeave = () => {
        setHoveredCell(null);
    };

// WEEKS SWITCHER
// swapping to next week
    const handleToggleWeekNext = () => {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    };

// swapping to back week
    const handleToggleWeekBack = () => {
        setCurrentWeek((prevWeek) => prevWeek - 1);
    };

    return (
        <div className="calendar-table">
            <div className="flex w-calendar1550 m-auto mt-0 mb-0 bg-white relative top-14 rounded-3xl">
                {/* Calendar Grid*/}
                <div
                    className="flex flex-grow gap-40 bg-gradient-to-br to-transparent from-purple-500 to-purple-600 rounded-3xl">
                    <table className="w-full">
                        {/*HEADERS*/}
                        <thead>
                        <tr>
                            {/* Empty cell for hours column */}
                            <th className="w"></th>
                            {/* Days of week */}
                            {DAYS_OF_WEEK.map((dayOfWeek, index) => (

                                <th
                                    key={dayOfWeek}
                                    className={`cursor-default w-32 ${
                                        getFormattedDate(index, currentWeek * 7 + 7) === currentDate ? 'bg-emerald-500' : 'bg-purple-500'
                                    }`}
                                >
                                    {dayOfWeek} {getFormattedDate(index, currentWeek * 7 + 7)} {/* Formatted Date */}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        {/*COLUMNS*/}
                        <tbody>
                        {/* Hours of day and calendar cells */}
                        {HOURS_OF_DAY.map((hour) => (
                            <tr key={hour}>
                                {/* Hour column */}
                                <td className="cursor-default w-20 text-right px-2">{hour}</td>

                                {/* Calendar cells */}
                                {DAYS_OF_WEEK.map((dayOfWeek, cellIndex) => {
                                    const note = notes.find((note) => note.hour === hour && note.dayOfWeek === dayOfWeek && currentDate);
                                    const cellTime = `${hour}:00`;
                                    const nextHour = ((parseInt(hour) + 1) % 24).toString().padStart(2, '0');
                                    const cellEndTime = `${nextHour}:00`;
                                    const isCurrentTime = isTimeInRange(currentTime, cellTime, cellEndTime);
                                    const isToday =
                                        cellIndex === (firstDayOfWeek.getDay() + cellIndex) % 7 &&
                                        getFormattedDate(cellIndex, currentWeek * 7) === currentDate;

                                    return (
                                        <td
                                            onMouseEnter={() => handleMouseEnter(`${hour}-${dayOfWeek}`)}
                                            onMouseLeave={handleMouseLeave}
                                            key={`${hour}-${dayOfWeek}`}
                                            className={`
                                            w-1/7 h-9 px-2 bg-gray-100
                                             border border-purple-300 
                                             border-r-0 border-b-0 text-right
                                             ${isToday && isCurrentTime ? 'bg-emerald-200' : ''}
                                             ${hoveredCell === `${hour}-${dayOfWeek}` && isToday && isCurrentTime ? 'bg-emerald-300' : ''} 
                                             ${hoveredCell === `${hour}-${dayOfWeek}` ? 'bg-gray-200' : ''}                                                                                   
                                            `}
                                        >
                                            <div className="flex flex-row">
                                                <div className="w-3/12 opacity-25 cursor-default text-left">{hour}</div>
                                                <div className="w-8/12"></div>
                                                {hoveredCell === `${hour}-${dayOfWeek}` && (
                                                    <div
                                                        className="cursor-pointer text-right w-1/12"
                                                        onClick={() => handleAddNote(hour, dayOfWeek)}
                                                    >
                                                        +
                                                    </div>
                                                )}
                                            </div>
                                            {note && <div className="note">{note.content}</div>} {/* Render note */}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/*buttons to back and next weeks*/}
                <DateSwitcher toggleNext={handleToggleWeekNext} toggleBack={handleToggleWeekBack}/>
            </div>
            <button onClick={handleClearNotes} className="absolute right-5 top-5" type="button">Clear all notes X
            </button>
        </div>
    );
};

export default CalendarTable;