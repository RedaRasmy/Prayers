import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGreaterThan} from '@fortawesome/free-solid-svg-icons'
import useTimings from '../../hooks/useTimings'


export default function DatesSlider() {
    return (
        <div className="h-[14%] px-[5vw] flex justify-between md:justify-around items-center border-b border-gray-300"> 
            <FontAwesomeIcon className='size-5 text-blacky opacity-80 rotate-180' icon={faGreaterThan} />
            <SliderContent/>
            <FontAwesomeIcon className='size-5 text-blacky opacity-80' icon={faGreaterThan}  />
        </div>
    )
}



const SliderContent = () => {
    const {currentDate,weekDay} = useTimings()

    return (
        <div className='flex flex-col items-center'>
            <p className='font-[600]'>{weekDay}, {currentDate?.gregorian.month} {currentDate?.gregorian.day}</p>
            <p className='opacity-50 font-semibold text-sm flex gap-2'>{currentDate?.hijri.day} <span className='flex justify-center items-center'>{currentDate?.hijri.month}</span> {currentDate?.hijri.year}</p>
        </div>
    )
}