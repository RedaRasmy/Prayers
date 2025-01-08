import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { CityType } from '../../types'
import useEditMode from '../../hooks/useEditMode'


export default function Location() {
    
    const searchRef = useRef<HTMLDivElement>(null)
    const {
        editMode,
        currentCity,
        handleEnter,
        inputValue,
        setInputValue,
        citiesQuery,
        setEditMode
    } = useEditMode(searchRef)


    return (
        <div
        className='h-[12%] flex items-center'>
            <FontAwesomeIcon icon={faLocationDot} className='scale-150 mr-3' style={{color: "#ffffff",}} />
            <div className='px-2 flex items-center'> Morocco,
                {
                    !editMode
                    ?
                        <span
                        className='p-2'>
                            {currentCity}
                        </span>
                    :
                        <div 
                        data-testid="cityInput"
                        className='inline p-2'>
                            <input 
                            placeholder='Search...'
                            onKeyDown={e=>{if(e.key==='Enter'){handleEnter()}}}
                            autoFocus
                            className='bg-transparent outline-none'
                            value={inputValue}
                            onChange={(e)=>setInputValue(e.target.value)}
                            type='text'
                            list='cities' />
                            {
                                citiesQuery.isError &&
                                <h1>{JSON.stringify(citiesQuery.error)}</h1>
                            }
                            {
                                citiesQuery.isPending &&
                                <span className="loading loading-dots loading-xs"/>
                            }
                            {
                                citiesQuery.isSuccess &&
                                <Suggestions cities={citiesQuery.data.cities}/>    
                            }
                        </div>
                }
                <div
                    className='inline cursor-pointer ml-2'
                    ref={searchRef}
                    onClick={()=>{setEditMode(true)}}
                    data-testid='clickable'
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
        </div>
    )
}


function Suggestions({cities}:{
    cities:CityType[]
}) {
    return (
        <datalist id='cities' >
            {(cities) &&
            cities.map((city,i)=>(
                <option  key={i} id={city.id} value={city.frenshCityName}></option>
            ))}
        </datalist>
    )
}