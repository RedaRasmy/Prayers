
import useTimings from '../../hooks/useTimings'
import Location from './Location'

export default function TopContent() {
    const {nextPrayer, timeLeft ,isSuccess,isPending} = useTimings()
    return (
        <div className='flex px-[5vw] flex-col  h-full justify-between'>
            <div className='h-[12%] flex justify-between'></div>
            <div className='flex-1 flex items-center justify-center'>
                {
                    isPending &&
                    <span className="loading loading-ring loading-lg"></span>
                }
                {
                    isSuccess &&
                    <div className='flex flex-col items-center space-y-2'>
                        <p className='text-3xl lg:text-5xl capitalize'>{nextPrayer && nextPrayer[0]}</p>
                        <h1 className='text-7xl lg:text-9xl'>{nextPrayer && nextPrayer[1] }</h1>
                        <p className='text-2xl lg:text-4xl tracking-wider'>
                            -{timeLeft}
                        </p>
                    </div>
                }
            </div>
            <Location/>
        </div>
    )
}
