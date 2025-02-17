import { useQuery} from "@tanstack/react-query";
import { getTimingsByCityId } from "../api/apis";
import getNextPrayer from "../utils/getNextPrayer";
import getCurrentTime from "../utils/getCurrentTime";
import { selectDate, selectPrayers } from "../utils/selectors";
import { CityType } from "../utils/types";
import useLocalStorage from "./useLocalstorage";
import getHoursAndMinutes from "../utils/getHoursAndMinutes";
import getTimeLeft from "../utils/getTimeLeft";

export default function useTimings() {
    // console.log('useTimings..')
    const [city] = useLocalStorage<CityType>('city')
    
    const { dayNum, weekDay } = getCurrentTime();

    // hours and minutes left until midnight : to refetch data
    const time = getTimeLeft('00:00')
    const [hours,minutes] = time ? getHoursAndMinutes(time) : []


    const {
        data,
        isSuccess,
        isPending,
        isError,
    } = useQuery({
        enabled : !!city && !!time,
        queryKey: ["timings", { cityId: city?.id }],
        queryFn: () => {
            // console.log('fetch timings..')
            if (city?.id) {
                return getTimingsByCityId(city.id)
            }
            return Promise.reject('City ID is undefined')
        },
        staleTime: 60000*(minutes+hours*60)
    });


    const currentDate = isSuccess ? selectDate(data.data,dayNum) : undefined
    const prayers = isSuccess ? selectPrayers(data.data,dayNum) : undefined
    const nextPrayer = prayers ? getNextPrayer(prayers) : []
    

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
    };
}
