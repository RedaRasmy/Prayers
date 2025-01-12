import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/apis";
import { useEffect, useState } from "react";


export default function useCities() {
    const [
        citiesNames,
        setCitiesNames
    ] = useState< string[] | undefined >(undefined)

    const {
        data,
        isSuccess,
        isPending
    } = useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
    });

    useEffect(() => { 
        if (isSuccess) { 
            const array = data.cities
            .filter(
                city => (city.frenshCityName !== undefined) && (city.id !== "303")
            )
            .map(
                city => city.frenshCityName
            )
            setCitiesNames(array);
        } 
    }, [isSuccess, data]);

    return {
        data,
        citiesNames,
        isPending,
    }
}