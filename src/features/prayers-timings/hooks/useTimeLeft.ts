import { useEffect, useState } from "react";
import getTimeLeft from "../utils/getTimeLeft";

export default function useTimeLeft(timing: string | undefined) {


    const [timeLeft,setTimeLeft] = useState<string|undefined>(undefined)

    useEffect(()=>{
        if (!timing) return;
        const interval = setInterval(() => {
            const stringTime = getTimeLeft(timing)

            setTimeLeft(stringTime)
        }, 1000);
        return () => clearInterval(interval)
    },[timing])
    

    return timeLeft;
}
