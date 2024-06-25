
export const formatDateToString = (input: string): string => {
    const inputDate = new Date(input);
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
};

export const formatDateString = (inputDate: any) => {
    const parts = inputDate.split('-');
    return inputDate && `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = days[dateObj.getUTCDay()];
    const monthName = months[dateObj.getUTCMonth()];
    const day = ("0" + dateObj.getUTCDate()).slice(-2);
    const year = dateObj.getUTCFullYear();
    return `${dayName}, ${monthName} ${day} ${year}`;
}