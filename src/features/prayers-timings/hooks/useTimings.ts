import { useQuery} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTimingsByCityId } from "../api/apis";
import getNextPrayer from "../utils/getNextPrayer";
import getCurrentTime from "../utils/getCurrentTime";
import useTimeLeft from "./useTimeLeft";
import { selectDate, selectPrayers } from "../utils/selectors";

export default function useTimings() {
    const [currentCityId, setCurrentCityId] = useState("59");
    useEffect(()=>{
        const id = localStorage.getItem("currentCityId") || '59'
        setCurrentCityId(id)
    },[])

    const { dayNum, weekDay } = getCurrentTime();

    const {
        data,
        isSuccess,
        isPending,
        isError
    } = useQuery({
        queryKey: ["timings", { cityId: currentCityId }],
        queryFn: () => getTimingsByCityId(currentCityId),
    });



    const currentDate = isSuccess ? selectDate(data.data,dayNum) : undefined
    const prayers = isSuccess ? selectPrayers(data.data,dayNum) : undefined
    const nextPrayer = prayers ? getNextPrayer(prayers) : []
    const timeLeft = useTimeLeft(nextPrayer[1]) 

    return {
        currentCityId,
        setCurrentCityId,
        currentDate,
        weekDay,
        prayers,
        nextPrayer,
        timeLeft,

        data,
        isSuccess,
        isPending,
        isError
    };
}
