import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import { CityType } from '../../types'
import useTimings from '../../hooks/useTimings'

export default function Location() {
    const ref = useRef(null)
    const {editMode,setEditMode,isClicked} = useClickOutside(ref)
    const [currentCity, setCurrentCity] = useState("Mohammadia")

    const {citiesQuery,currentCityId,setCurrentCityId} = useTimings()
    

    useEffect(()=>{
        if (citiesQuery.status === 'success'){
            const cities = citiesQuery.data.cities
            const exist = cities.find((e:CityType) => e.frenshCityName === currentCity)
            if (exist) {
                setEditMode(false)
                setCurrentCityId(exist.id)
            } else {
                setEditMode(false)
                const {frenshCityName} = cities.find((e:CityType)=> e.id === currentCityId)
                setCurrentCity(frenshCityName)
            }
        }
    },[isClicked])

    function handleEnter() {
        if (citiesQuery.status === 'success'){
            const exist = citiesQuery.data.cities.find((e:CityType) => e.frenshCityName === currentCity)
            if (exist) {
                setEditMode(false)
                setCurrentCityId(exist.id)
            }
        }
    }

    return (
        <div 
        ref={ref}
        onClick={()=>{setEditMode(true)}}
        className='h-[12%] flex items-center cursor-pointer'>
            <FontAwesomeIcon icon={faLocationDot} className='size-5' style={{color: "#ffffff",}} />
            <div className='px-2'> Morocco,
                {!editMode ?
                <span
                onClick={()=>{setEditMode(true)}}
                className='p-2'>
                    {currentCity}
                </span> :
                <div className='inline p-2'>
                    <input 
                    onKeyDown={e=>{if(e.key==='Enter'){handleEnter()}}}
                    autoFocus
                    className='bg-transparent outline-none'
                    value={currentCity}
                    onChange={(e)=>setCurrentCity(e.target.value)}
                    type='text'
                    list='cities' />
                    {
                        citiesQuery.status === "error" &&
                        <h1>{JSON.stringify(citiesQuery.error)}</h1>
                    }
                    {
                        citiesQuery.status === 'pending' &&
                        <span className="loading loading-dots loading-xs"/>
                    }
                    {
                        citiesQuery.status === "success" &&
                        <Suggestions cities={citiesQuery.data.cities}/>    
                    }
                </div>
                }
            </div>
        </div>
    )
}


function Suggestions({cities}:{
    cities:CityType[]
}) {
    return (
        <datalist id='cities'>
            {(cities) &&
            cities.map((city,i)=>(
                <option key={i} id={city.id} value={city.frenshCityName}></option>
            ))}
        </datalist>
    )
}