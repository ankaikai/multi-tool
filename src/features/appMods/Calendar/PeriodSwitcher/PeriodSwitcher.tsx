import { FC, ChangeEvent, useState } from 'react';

const Switcher: FC = () => {
    const currentYear = new Date().getFullYear();
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    const months: string[] = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const years: number[] = Array.from({ length: 100 }, (_, i) => currentYear + i);

    const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <div className="flex flex-row absolute top-4 right-4">
            {/*Select Year*/}
            <select className="w-32 h-8 text-center rounded-l-xl  bg-gradient-to-br to-transparent from-emerald-300 to-emerald-600 hover:bg-emerald-300 cursor-pointer" value={selectedYear} onChange={handleYearChange}>
                {years.map((year) => (
                    <option className="w-32" key={year} value={year}>{year}</option>
                ))}
            </select>

            {/*Select Month*/}
            <select className="w-32 h-8 text-center rounded-r-xl  bg-gradient-to-br to-transparent from-emerald-300 to-emerald-600 hover:bg-emerald-300 cursor-pointer" value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                    <option className="w-32" key={index} value={month}>{month}</option>
                ))}
            </select>
        </div>
    );
};

export default Switcher;
