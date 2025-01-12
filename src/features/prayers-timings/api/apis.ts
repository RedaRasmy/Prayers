import axios from "axios";
import { CityType, Data } from "../utils/types";

export const getCities = async () => {
    const res = await axios.get('https://habous-prayer-times-api.onrender.com/api/v1/available-cities');
    return res.data as {cities:CityType[]}
}

export const getTimingsByCityId = async (id:string|undefined) => {
    if (!id) throw new Error('cityId is undefined')
        
    const res = await axios.get(`https://habous-prayer-times-api.onrender.com/api/v1/prayer-times?cityId=${id}`)
    return res.data as {data:Data}
}