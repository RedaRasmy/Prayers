import { useQuery } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import { getCities, getTimingsByCityId } from "../api/apis";


export default function useTimings() {
    const [currentCityId , setCurrentCityId ] = useState("59")
    const [prayersArray , setPrayersArray] = useState<[string,string][]|null>(null)

    const today = new Date(); 
    const dayNum = today.getDate()

    const citiesQuery = useQuery({
        queryKey:['cities'],
        queryFn: getCities,
    })
    const timingsQuery = useQuery({
        queryKey: ["timings"],
        queryFn:  () => getTimingsByCityId(currentCityId),
    })
    type Timing = {
        date:{
            gregorian :{
                day : number
            }
        },
        prayers :{
            fajr : string
        }
    }

    useEffect(()=>{
        if (timingsQuery.status === 'success') {
            const prayersObj = timingsQuery.data.data.timings.find(
                (timing:Timing)=>timing.date.gregorian.day === dayNum
            ).prayers
            if (prayersObj) {
                const array : [string,string][] = Object.entries(prayersObj)
                setPrayersArray(array)
            }
        }
    },[currentCityId,dayNum,timingsQuery.status,timingsQuery.data])

    return {
        citiesQuery,
        timingsQuery,
        currentCityId,
        setCurrentCityId,
        prayersArray
    }
}
