import axios from "axios";

export const getTotalRevenue = async () => {
    try {
        const { data } = await axios.get('/dashboard/statistic/total-revenue');
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTotalRevenueByCinema = async (cinema: any) => {
    try {
        const { data } = await axios.get(`/dashboard/statistic/cinema-revenue/${cinema}`);
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getTotalRevenueByAllMovie = async () => {
    try {
        const { data } = await axios.get("/dashboard/statistic/cinema-revenue-films");
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTotalRevenueDashBoard = async (uri: string) => {
    try {
        const { data } = await axios.get(uri);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}