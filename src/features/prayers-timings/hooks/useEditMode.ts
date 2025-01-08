import {  RefObject, useEffect, useState } from "react"
import { CityType } from "../types"
import useClickOutside from "./useClickOutside"
import useTimings from "./useTimings"


export default function useEditMode(ref:RefObject<HTMLDivElement | null>) {
    const [currentCity, setCurrentCity] = useState("Mohammadia")
    useEffect(()=>{
        const city = localStorage.getItem("currentCity") || "Mohammadia"
        setCurrentCity(city)
    },[])

    const [inputValue, setInputValue] = useState("")
    const {editMode,setEditMode,isClicked} = useClickOutside(ref)
    const {citiesQuery,currentCityId,setCurrentCityId} = useTimings()
    
    useEffect(()=>{
        if (!editMode) return;
        if (inputValue === currentCity) {
            setEditMode(false)
        } else if (citiesQuery.isSuccess){
            const cities = citiesQuery.data.cities
            const exist = cities.find((e:CityType) => e.frenshCityName === inputValue)
            if (exist) {
                setEditMode(false)
                setCurrentCityId(exist.id)
                setCurrentCity(exist.frenshCityName)
                localStorage.setItem('currentCityId',exist.id)
                localStorage.setItem('currentCity',exist.frenshCityName)
                window.location.reload()
            }
        }
    },[isClicked])

    function handleEnter() {
        if (inputValue === currentCity) {
            setEditMode(false)
        } else if (citiesQuery.isSuccess) {
            const cities = citiesQuery.data.cities
            const exist = cities.find((e:CityType) => e.frenshCityName === inputValue)
            setEditMode(false)
            if (exist) {
                setCurrentCityId(exist.id)
                setCurrentCity(exist.frenshCityName)
                localStorage.setItem('currentCityId',exist.id)
                localStorage.setItem('currentCity',exist.frenshCityName)
                window.location.reload()
            } else {
                const {frenshCityName} = cities.find((e:CityType)=> e.id === currentCityId)
                setCurrentCity(frenshCityName)
            }
        }
    }

    return {
        inputValue,
        setInputValue,
        editMode,
        setEditMode,
        currentCity,
        setCurrentCity,
        handleEnter,
        citiesQuery
    }
}


