export const convertTo24Hour = (time: string) => {
    // Tách các thành phần của chuỗi thời gian (giờ, phút và AM/PM)
    let [timePart, modifier] = time.split(' ');

    // Tách giờ và phút
    let [hours, minutes]: any[] = timePart.split(':');

    // Chuyển đổi giờ từ chuỗi sang số
    hours = parseInt(hours);

    // Nếu giờ là 12 AM, đổi thành 0 (midnight)
    if (modifier === 'AM' && +hours === 12) {
        hours = 0;
    }

    // Nếu giờ là PM và không phải 12 PM, cộng thêm 12 giờ
    if (modifier === 'PM' && +hours !== 12) {
        hours += 12;
    }

    // Định dạng lại giờ và phút thành chuỗi hai chữ số
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    return `${hours}:${minutes}:00`;
}
