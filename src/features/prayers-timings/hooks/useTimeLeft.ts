import { useEffect, useState } from "react";
import getHoursAndMinutes from "../utils/getHoursAndMinutes";
import getCurrentTime from "../utils/getCurrentTime";

export default function useTimeLeft(prayerTiming: string | undefined) {

    const [timingHours, timingMinutes] = getHoursAndMinutes(prayerTiming);

    const [timeLeft,setTimeLeft] = useState<string|undefined>(undefined)


    useEffect(()=>{
        if (!prayerTiming) return;
        const interval = setInterval(() => {
            const [hours, minutes] = getHoursAndMinutes();
            const {seconds} = getCurrentTime()

            let hoursLeft;
            let minutesLeft;
        
            if (timingMinutes < minutes) {
                hoursLeft = timingHours - hours + (timingHours > hours ? -1 : 23);
                minutesLeft = 60 - minutes + timingMinutes;
            } else {
                hoursLeft = timingHours - hours + (timingHours > hours ? 0 : 24);
                minutesLeft = timingMinutes - minutes;
            }
            const stringTime = hoursLeft.toString().padStart(2,'0')+":"+minutesLeft.toString().padStart(2,'0')+":"+(59-seconds).toString().padStart(2,'0')
            setTimeLeft(stringTime)
        }, 1000);

        return () => clearInterval(interval)
    })
    
    return timeLeft;
}
