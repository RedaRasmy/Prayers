import { useQuery} from "@tanstack/react-query";
import { getTimingsByCityId } from "../api/apis";
import getNextPrayer from "../utils/getNextPrayer";
import getCurrentTime from "../utils/getCurrentTime";
import useTimeLeft from "./useTimeLeft";
import { selectDate, selectPrayers } from "../utils/selectors";
import { CityType } from "../utils/types";
import useLocalStorage from "./useLocalstorage";

export default function useTimings() {
    const [city] = useLocalStorage<CityType>('city')
    
    const { dayNum, weekDay } = getCurrentTime();

    console.log(city?.frenshCityName)

    const {
        data,
        isSuccess,
        isPending,
        isError,
    } = useQuery({
        enabled : !!city ,
        queryKey: ["timings", { cityId: city?.id }],
        queryFn: () => {
            if (city?.id) {
                return getTimingsByCityId(city.id)
            }
            return Promise.reject('City ID is undefined')
        },
    });


    const currentDate = isSuccess ? selectDate(data.data,dayNum) : undefined
    const prayers = isSuccess ? selectPrayers(data.data,dayNum) : undefined
    const nextPrayer = prayers ? getNextPrayer(prayers) : []
    const timeLeft = useTimeLeft(nextPrayer[1]) 

    return {
        data,
        isSuccess,
        isPending,
        isError,
        //
        currentDate,
        weekDay,
        prayers,
        nextPrayer,
        timeLeft,
    };
}
