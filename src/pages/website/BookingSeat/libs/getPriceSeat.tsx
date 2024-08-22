export const getSeatPrices = (seats: any) => {
    const prices = {
        normal: new Set(),
        vip: new Set(),
        double: new Set()
    };

    seats.forEach((row: any) => {
        row.forEach((seat: any) => {
            const { type, price } = seat;

            if (type.includes("Ghế thường")) {
                prices.normal.add(price);
            } else if (type.includes("Ghế vip")) {
                prices.vip.add(price);
            } else if (type.includes("Ghế đôi")) {
                prices.double.add(price);
            }
        });
    });

    // Chuyển Set thành mảng
    return {
        normal: Array.from(prices.normal)[0],
        vip: Array.from(prices.vip)[0],
        double: Array.from(prices.double)[0]
    };
};