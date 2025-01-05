import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGreaterThan} from '@fortawesome/free-solid-svg-icons'


export default function DatesSlider() {
    return (
        <div className="h-[14%] px-[5vw] flex justify-between md:justify-around items-center border-b border-gray-300"> 
            <FontAwesomeIcon className='size-5 text-blacky opacity-80 rotate-180' icon={faGreaterThan}  size='xs' />
            <SliderContent/>
            <FontAwesomeIcon className='size-5 text-blacky opacity-80' icon={faGreaterThan}  />
        </div>
    )
}

type ContentType = {
    miladi?: string,
    hijri?: string
}

const SliderContent = ({miladi,hijri}:ContentType) => {
    return (
        <div className='flex flex-col items-center'>
            <p className='font-[600]'>{miladi}Tuesday, May 15</p>
            <p className='opacity-50 font-semibold text-sm'>{hijri}07 Ramadan 1439</p>
        </div>
    )
}