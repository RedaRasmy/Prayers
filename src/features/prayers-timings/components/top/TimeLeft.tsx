import React from 'react'
import useTimeLeft from '../../hooks/useTimeLeft'

export default function TimeLeft({timing}:{
    timing:string
}) {
    const timeLeft = useTimeLeft(timing) 
    
    return (
        <p className='text-2xl lg:text-4xl tracking-wider'>
            -{timeLeft}
        </p>
    )
}
