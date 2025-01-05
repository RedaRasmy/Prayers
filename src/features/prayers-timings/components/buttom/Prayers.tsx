import React from 'react'

export default function Prayers() {
    const prayers = [1,2,3,4,5,6]

    return (
        <div className='h-[86%]  grid grid-row-6 '>
            {prayers.map((p,i)=>(
                <Prayer key={i}  />
            ))}
        </div>
    )
}

type PrayerType = {
    name? : string,
    time? : string
}
const Prayer = ({prayer}:PrayerType) => {
    return (
        <div className='flex px-[5vw] hover:bg-green hover:text-gray1 items-center justify-between sm:justify-around'>
            <p className='font-semibold'>Fajr</p>
            <p className='font-semibold tracking-wider'>3:25</p>
        </div>
    )
}