import Location from './Location'

export default function TopContent() {

    return (
        <div className='flex px-[5vw] flex-col  h-full justify-between'>
            <div className='h-[12%] flex justify-between'></div>
            <div className='flex-1 flex items-center justify-center'>
                <div className='flex flex-col items-center space-y-2'>
                    <p className='text-3xl lg:text-5xl'>Asr</p>
                    <h1 className='text-7xl lg:text-9xl'>17:39</h1>
                    <p className='text-2xl lg:text-4xl tracking-wider'>-00:05:16</p>
                </div>
            </div>
            <Location/>
        </div>
    )
}
