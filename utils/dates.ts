import {
    eachDayOfInterval,
    eachWeekOfInterval,
    endOfMonth,
    endOfWeek,
    startOfMonth,
} from "date-fns";

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const generateDatesByMonth = (date: string | number | Date) => {
    const weeks = eachWeekOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date)
    });

    const dates = weeks.map((date) => {
        return eachDayOfInterval({
            start: date,
            end: endOfWeek(date)
        });
    });

    return dates;
};