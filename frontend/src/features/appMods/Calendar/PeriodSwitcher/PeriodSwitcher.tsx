import {FC, ChangeEvent, useState} from 'react';

const Switcher: FC = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear();
    const currentMonthName = currentDate.toLocaleString('en-US', { month: 'long' });
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    const months: string[] = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const years: number[] = Array.from({length: 100}, (_, i) => currentYear + i);

    const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value));
    };



    return (
        <div className="flex flex-row absolute top-2 right-4">
            {/*Select Year*/}
            <select
                className="w-32 h-10 font-bold text-center text-xl p-1 rounded-l-xl  bg-gradient-to-br to-transparent from-purple-500 to-purple-600 hover:bg-purple-500 cursor-pointer"
                value={selectedYear} onChange={handleYearChange}>
                <option>{currentYear}</option>
                {years.map((year) => (
                    <option className="w-32" key={year} value={year}>{year}</option>
                ))}
            </select>

            {/*Select Month*/}
            <select
                className="w-32 h-10 font-bold text-center text-xl p-1 rounded-r-xl  bg-gradient-to-br to-transparent from-purple-500 to-purple-600 hover:bg-purple-500 cursor-pointer"
                value={selectedMonth} onChange={handleMonthChange}>
                <option>{currentMonthName}</option>
                {months.map((month, index) => (
                    <option className="w-32" key={index} value={month}>{month}</option>
                ))}
            </select>
        </div>
    );
};

export default Switcher;
