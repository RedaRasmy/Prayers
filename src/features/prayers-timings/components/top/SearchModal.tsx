import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SyntheticEvent, useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useCities from "../../hooks/useCities";



export default function SearchModal() {
    const { citiesNames ,isPending} = useCities()
    const modalRef = useRef<HTMLDialogElement>(null)

    const [selectedCity,setSelectedCity] = useState<string|null>(null)

    const handleOpen = () => {
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }
    const handleSelect = (e:SyntheticEvent<Element, Event>,newValue:string|null) => {
        setSelectedCity(newValue)
    }

    const handleChange = () => {

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
                <h3 className="text-xl font-semibold flex justify-center items-center tracking-wider mb-5">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2 size-8 text-green" />
                    <span>SELECT A CITY</span>
                </h3>
                <div className="flex justify-center items-center p-4 flex-col gap-5">
                    <Autocomplete
                        disablePortal
                        loading={isPending}
                        options={citiesNames || []}
                        sx={{ width: 300 }}
                        onChange={handleSelect}
                        renderInput={ (params) =>
                            <TextField 
                                {...params}
                                label="City"
                            />
                        }
                    />
                    <button 
                    onClick={handleChange}
                    disabled={selectedCity === null}
                    className="btn outline-none px-10 hover:bg-lime-950 disabled:text-black disabled:text-opacity-40 bg-green text-gray1 ">
                        Change
                    </button>
                </div>
            </div>
            </dialog>
        </div>
    )
}
