import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/apis";
import { useEffect, useState } from "react";
import { CityType } from "../utils/types";


export default function useCities() {
    const [
        cities,
        setCities
    ] = useState< CityType[] | undefined >(undefined)

    const {
        data,
        isSuccess,
        isPending
    } = useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
        staleTime:Infinity
    });

    useEffect(() => { 
        if (isSuccess) { 
            const array = data.cities
            .filter(
                city => (city.frenshCityName !== undefined) && (city.id !== "303")
            )
            setCities(array);
        } 
    }, [isSuccess, data]);

    return {
        data,
        cities,
        isPending,
    }
}