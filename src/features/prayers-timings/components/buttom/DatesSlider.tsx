
import useTimings from '../../hooks/useTimings'


export default function DatesSlider() {
    return (
        <div className="h-[14%] px-[5vw] flex justify-center items-center border-b border-gray-300"> 
            <SliderContent/>
        </div>
    )
}



const SliderContent = () => {
    const {currentDate,weekDay,isSuccess} = useTimings()

    if (isSuccess) return (
        <div className='flex flex-col items-center '>
            <p className='font-[600]'>{weekDay}, {currentDate?.gregorian.month} {currentDate?.gregorian.day}</p>
            <p className='opacity-50 font-semibold text-sm flex gap-2'>
                {currentDate?.hijri.day} 
                <span className='flex justify-center items-center'>
                    {currentDate?.hijri.month}
                </span> 
                {currentDate?.hijri.year}
            </p>
        </div>
    )
}