import { useRef } from 'react'
import { CityType } from '../../types'
import useEditMode from '../../hooks/useEditMode'
import SearchModal from './SearchModal'


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
            <SearchModal/>
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
                        className=' p-2 flex'>
                            <input 
                            placeholder='Search...'
                            onKeyDown={e=>{if(e.key==='Enter'){handleEnter()}}}
                            autoFocus
                            className='bg-transparent outline-none max-w-[50%] sm:max-w-none'
                            value={inputValue}
                            onChange={(e)=>setInputValue(e.target.value)}
                            type='text'
                            list='cities' />
                            {
                                citiesQuery.isSuccess &&
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
        <datalist id='cities' className='' >
            {(cities) &&
            cities.map((city,i)=>(
                <option  key={i} id={city.id} value={city.frenshCityName}></option>
            ))}
        </datalist>
    )
}