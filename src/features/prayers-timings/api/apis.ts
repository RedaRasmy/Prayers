import axios from "axios";

export const getCities = async () => {
    const res = await axios.get('https://habous-prayer-times-api.onrender.com/api/v1/available-cities');
    return res.data;
}

export const getTimingsByCityId = async (id:string) => {
    const res = await axios.get(`https://habous-prayer-times-api.onrender.com/api/v1/prayer-times?cityId=${id}`)
    return res.data
}