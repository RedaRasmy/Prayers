import React from 'react'
import useTimings from '../../hooks/useTimings'

export default function Prayers() {

    const {timingsQuery,prayers} = useTimings()

    return (
        <div className='h-[86%] grid grid-row-6 '>
            {
                timingsQuery.isError &&
                <div className='font-bold text-xl text-center' >
                    <h1>Something wrong happend</h1>
                    <h2>Try again later!</h2>
                </div>
            }
            {
                timingsQuery.isPending &&
                <span className="loading loading-spinner self-center justify-self-center size-12 bg-green"></span>
            }
            {
                (timingsQuery.isSuccess) &&
                prayers?.map((prayer,i)=>(
                    <Prayer key={i} prayer={prayer} />
                ))
            }
        </div>
    )
}

type PrayerType = {
    prayer : [string,string]
}

const Prayer = ({prayer}:PrayerType) => {
    return (
        <div className='flex px-[5vw] hover:bg-green hover:text-gray1 items-center justify-between sm:justify-around'>
            <p className='font-semibold capitalize'>{prayer[0]}</p>
            <p className='font-semibold tracking-wider'>{prayer[1]}</p>
        </div>
    )
}