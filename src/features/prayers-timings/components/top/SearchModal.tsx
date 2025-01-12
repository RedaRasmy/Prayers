import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SyntheticEvent, useRef, useState } from "react"
import SelectCity from "../SelectCity";
import useLocalStorage from "../../hooks/useLocalstorage";
import { CityType } from "../../utils/types";
// import { useQueryClient } from "@tanstack/react-query";


export default function SearchModal() {
    const modalRef = useRef<HTMLDialogElement>(null)
    const [selectedCity,setSelectedCity] = useState<CityType|null>(null)
    const [city,setCity] = useLocalStorage<CityType>('city')
    
    const buttonDisabled = (city?.frenshCityName === selectedCity?.frenshCityName) || (selectedCity === null) || (city ===undefined)

    const handleOpen = () => {
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }

    const handleSelect = (e:SyntheticEvent<Element, Event>,newValue:CityType|null) => {
        setSelectedCity(newValue)
    }


    const handleChange = () => {
        if (selectedCity && modalRef.current){
            setCity(selectedCity)
            window.location.reload()
        }
    }

    return (
        <div>
            <FontAwesomeIcon
                className='size-5 mr-2 cursor-pointer'
                icon={faLocationDot}
                onClick={()=>handleOpen()}
            />
            <dialog className="modal" ref={modalRef}>
                <div className="modal-box bg-gray1 text-blacky">
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-md text-lg btn-circle btn-ghost absolute right-2 top-2 text-green">✕</button>
                        </form>
                    </div>
                    <SelectCityTitle/>
                    <div className="flex justify-center items-center p-4 flex-col gap-5">
                        <SelectCity onChange={handleSelect} />
                        <button 
                        onClick={handleChange}
                        disabled={buttonDisabled}
                        className="btn outline-none px-10 hover:bg-lime-950 disabled:text-black disabled:text-opacity-40 bg-green text-gray1 ">
                            Change
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}



export function SelectCityTitle() {
    return (
        <h3 className="text-xl text-blacky font-semibold flex justify-center items-center tracking-wider mb-5">
            <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2 size-8 text-green" 
            />
            <span>
                SELECT A CITY
            </span>
        </h3>
    )
}
