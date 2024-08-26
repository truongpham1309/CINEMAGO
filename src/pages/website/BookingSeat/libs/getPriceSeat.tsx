export const getSeatPrices = (seats: any) => {
    const prices = {
        normal: new Set(),
        vip: new Set(),
        double: new Set()
    };

    seats.forEach((row: any) => {
        row.forEach((seat: any) => {
            const { type, price } = seat;
            
            let newPrice = price + '';

            if (type.includes("Ghế thường")) {
                prices.normal.add(newPrice);
            } else if (type.includes("Ghế vip")) {
                prices.vip.add(newPrice);
            } else if (type.includes("Ghế đôi")) {
                prices.double.add(newPrice);
            }
        });
    });

    return {
        normal: Array.from(prices.normal)[0],
        vip: Array.from(prices.vip)[0],
        double: Array.from(prices.double)[0]
    };
};