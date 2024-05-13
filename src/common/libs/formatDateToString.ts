
export const formatDateToString = (input: string): string => {
    const inputDate = new Date(input);
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
    const day = ('0' + inputDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
};


