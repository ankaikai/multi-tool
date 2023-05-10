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
    const [notes, setNotes] = useState<Note[]>([]);

    const DAYS_OF_WEEK: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const HOURS_OF_DAY: string[] = Array.from({length: 24}, (_, i) => {
        const hour = ((i + 5) % 24).toString().padStart(2, '0');
        return `${hour}:00`;
    });

    useEffect(() => {
        setNotes([]); // Очищаем заметки при изменении текущей недели
    }, [currentWeek]);

    const handleMouseEnter = (cellIndex: string) => {
        setHoveredCell(cellIndex);
    };

    const handleMouseLeave = () => {
        setHoveredCell(null);
    };

    const handleToggleWeekNext = () => {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    };

    const handleToggleWeekBack = () => {
        setCurrentWeek((prevWeek) => prevWeek - 1);
    };

    const handleAddNote = (hour: string, dayOfWeek: string) => {
        // Показать блок редактирования заметки для соответствующей ячейки
        // Здесь вы можете использовать модальное окно или другой компонент, который позволяет ввести заметку
        // После ввода заметки, сохраните ее и обновите массив заметок
        // Пример сохранения заметки:
        const content = prompt('Enter your note:');
        if (content) {
            const newNote: Note = {hour, dayOfWeek, content};
            setNotes((prevNotes) => [...prevNotes, newNote]);
        }
    };

    const getFormattedDate = (dayOfWeek: number, dayOfMonth: number) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const newDate = new Date(currentYear, currentMonth, dayOfMonth);
        newDate.setDate(newDate.getDate() + dayOfWeek); // Устанавливаем правильный день недели
        return newDate.toLocaleDateString();
    };

    const todayDate : string = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`

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
                                        getFormattedDate(index, currentWeek * 7) === todayDate ? 'bg-emerald-500 rounded-lg' : 'bg-purple-500'
                                    }`}
                                >
                                    {dayOfWeek} {getFormattedDate(index, currentWeek * 7)} {/* Formatted Date */}
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
                                    const note = notes.find((note) => note.hour === hour && note.dayOfWeek === dayOfWeek);
                                    return (
                                        <td
                                            onMouseEnter={() => handleMouseEnter(`${hour}-${dayOfWeek}`)}
                                            onMouseLeave={handleMouseLeave}
                                            key={`${hour}-${dayOfWeek}`}
                                            className="w-1/7 h-9 px-2 bg-gray-100 border border-purple-300 border-r-0 border-b-0 text-right"
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
                <DateSwitcher toggleNext={handleToggleWeekNext} toggleBack={handleToggleWeekBack}/>
            </div>
        </div>
    );
};

export default CalendarTable;