import axios from "axios";

export const getAllShowTimeByCityAndCinema = async (id: number) => {
    try {
        const { data } = await axios.get(`/filter/movie/${id}/showtime`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export const getSeatMapByIDShowTime = async (id: number) => {
    try {
        const { data } = await axios.get(`/show-seat-map/${id}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw error;
    }
}

export const paymentBookingByMOMO = async (booking: any) => {
    try {
        const { data } = await axios.post('/client/momo/create', booking);
        return data;
    } catch (error: any) {
        throw error;
    }
}

export const paymentBookingByVNPAY = async (booking: any) => {
    try {
        const { data } = await axios.post('/pay/vnpay', booking);
        return data;
    } catch (error) {
        throw error;
    }
}

export const paymentBookingByVNPAYConfirm = async (booking: any) => {
    try {
        const { data } = await axios.post('/pay/vnpay/send', booking);
        return data;
    } catch (error) {
        throw error;
    }
}

export const paymentBookingConfirm = async (booking: any) => {
    try {
        const { data } = await axios.post(`/client/momo/success`, booking);
        return data;
    } catch (error: any) {
        throw error;
    }
}

export const getAllServiceClient = async () => {
    try {
        const { data } = await axios.get('/service');
        return data
    } catch (error) {
        throw error
    }
}

export const chooseSeatBooking = async ({ id, showtime_id }: any) => {
    try {
        const { data } = await axios.post('/status', { id, showtime_id });
        return data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const cancelSeatBooking = async (seat: any) => {
    try {
        const { data } = await axios.post("/cancel", seat);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}