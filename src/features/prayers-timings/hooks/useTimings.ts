import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCities, getTimingsByCityId } from "../api/apis";
import getNextPrayer from "../utils/getNextPrayer";
import getCurrentTime from "../utils/getCurrentTime";
import useTimeLeft from "./useTimeLeft";

export default function useTimings() {
    const id = localStorage.getItem("currentCityId") || "59";

    const [currentCityId, setCurrentCityId] = useState(id);
    const { dayNum, weekDay } = getCurrentTime();

    const citiesQuery = useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
    });
    const timingsQuery = useQuery({
        queryKey: ["timings", { cityId: currentCityId }],
        queryFn: () => getTimingsByCityId(currentCityId),
    });

    type Timing = {
        date: {
        gregorian: {
            day: number;
        };
        };
        prayers: {
        [key: string]: string;
        };
    };

    function getPrayers(query) {
        if (query.status === "success") {
        const timing = query.data?.data.timings.find(
            (timing: Timing) => timing.date.gregorian.day === dayNum
        );
        if (timing) {
            const array: [string, string][] = Object.entries(timing.prayers);
            return array;
        }
        }
    }

    function getDate(query) {
        if (query.status === "success") {
        const timing = query.data?.data.timings.find(
            (timing: Timing) => timing.date.gregorian.day === dayNum
        );
        if (timing) {
            return timing.date;
        }
        }
    }

    const currentDate = getDate(timingsQuery);
    const prayers = getPrayers(timingsQuery);
    const nextPrayer = prayers ? getNextPrayer(prayers) : []
    const timeLeft = useTimeLeft(nextPrayer[1]);

    return {
        citiesQuery,
        timingsQuery,
        currentCityId,
        setCurrentCityId,
        getPrayers,
        getDate,
        currentDate,
        weekDay,
        prayers,
        nextPrayer,
        timeLeft,
        isSuccess: timingsQuery.isSuccess,
        isPending: timingsQuery.isPending,
        isError: timingsQuery.isError,
    };
}
