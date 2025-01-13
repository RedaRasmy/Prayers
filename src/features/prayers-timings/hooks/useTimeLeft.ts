import { useEffect, useState } from "react";
import getHoursAndMinutes from "../utils/getHoursAndMinutes";
import getCurrentTime from "../utils/getCurrentTime";

export default function useTimeLeft(timing: string | undefined) {

    const [timingHours, timingMinutes] = timing ? getHoursAndMinutes(timing) : []

    const [timeLeft,setTimeLeft] = useState<string|undefined>(undefined)


    useEffect(()=>{
        if (!timing) return;
        const interval = setInterval(() => {
            const {seconds , hours, minutes} = getCurrentTime()
            const secondsLeft = (59-seconds).toString().padStart(2,'0')

            let hoursLeft;
            let minutesLeft;

            if (timingMinutes <= minutes) {
                hoursLeft = timingHours - hours + (timingHours > hours ? -1 : 23);
                minutesLeft = 59 - minutes + timingMinutes;
            } else {
                hoursLeft = timingHours - hours + (timingHours >= hours ? 0 : 24);
                minutesLeft = timingMinutes - minutes - 1 ;
            }

            const stringTime = (
                hoursLeft.toString().padStart(2,'0')
                + ":" 
                + minutesLeft.toString().padStart(2,'0')
                + ":"
                + secondsLeft
            )

            setTimeLeft(stringTime)
        }, 1000);
        return () => clearInterval(interval)
    },[timing,timingHours,timingMinutes])
    
    return timeLeft;
}
