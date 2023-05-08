import {FC} from 'react';

const DAYS_OF_WEEK: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS_OF_DAY: string[] = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const CalendarTable : FC = () => {
    return (
        <div className="calendar-table">
            <div className="flex w-calendar1550 m-auto mt-0 mb-0 bg-white relative top-24 rounded-3xl">
                {/* Calendar Grid*/}
                <div className="flex flex-grow gap-40 bg-gradient-to-br to-transparent from-emerald-300 to-emerald-600 rounded-3xl">
                    <table className="w-full">
                        <thead>
                        <tr>
                            {/* Empty cell for hours column */}
                            <th className=""></th>
                            {/* Days of week */}
                            {DAYS_OF_WEEK.map((dayOfWeek) => (
                                <th key={dayOfWeek} className="w-32 bg-gradient-to-br to-transparent from-emerald-300 to-emerald-400">
                                    {dayOfWeek}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {/* Hours of day and calendar cells */}
                        {HOURS_OF_DAY.map((hour) => (
                            <tr key={hour}>
                                {/* Hour column */}
                                <td className="w-20 text-right px-2">
                                    {hour}
                                </td>

                                {/* Calendar cells */}
                                {DAYS_OF_WEEK.map((dayOfWeek) => (
                                    <td key={`${hour}-${dayOfWeek}`} className="w-1/7 px-2 bg-white border border-r-0 border-b-0 text-right">
                                        <div className="flex flex-row">
                                            <div className="w-5/6"></div>
                                            <div className="cursor-pointer text-right w-1/6">+</div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/*Right Plane*/}
                <div className="bg-gradient-to-br to-transparent from-emerald-300 to-emerald-400 w-7 rounded-tr-3xl rounded-br-3xl"></div>
            </div>
        </div>
    );
}

export default CalendarTable;