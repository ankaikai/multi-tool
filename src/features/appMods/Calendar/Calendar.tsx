import { FC } from 'react';
import CalendarTable from "./CalendarTable/CalendarTable";
import PeriodSwitcher from "./PeriodSwitcher/PeriodSwitcher";

const Calendar: FC = () => {
    return(
        <div className="calendar">
            <PeriodSwitcher />
            <CalendarTable />
        </div>
    );
};

export default Calendar;
