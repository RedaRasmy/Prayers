'use client'
import useLocalStorage from "@/features/prayers-timings/hooks/useLocalstorage";
import Buttom from "./components/Buttom";
import Top from "./components/Top";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import SelectCity from "@/features/prayers-timings/components/SelectCity";
import { SyntheticEvent, useEffect, useState } from "react";
import { CityType } from "@/features/prayers-timings/utils/types";
import { SelectCityTitle } from "@/features/prayers-timings/components/top/SearchModal";
const queryClient = new QueryClient()

export default function Home() {
    const [isClient , setIsClient] = useState(false)
    const [city,setCity] = useLocalStorage<CityType>('city')

    useEffect(()=>{
        setIsClient(true)
    },[])

    const handleChange = (e: SyntheticEvent<Element, Event>, newValue: CityType | null) => {
        if (newValue) {
            setCity(newValue)
        }
    }

    if (isClient) return (
        <QueryClientProvider client={queryClient}>
            {
            city 
            ?
                <div className="h-full">
                    <Top/>
                    <Buttom/>
                </div>
            :
                <div className="h-full flex justify-center items-center">
                    <div className="bg-gray1 rounded-xl gap-5 h-1/3 w-[clamp(200px,90%,500px)]  flex flex-col justify-center items-center">
                        <SelectCityTitle/>
                        <SelectCity onChange={handleChange}/>
                    </div>
                </div>
            }
        </QueryClientProvider>
    )
}
