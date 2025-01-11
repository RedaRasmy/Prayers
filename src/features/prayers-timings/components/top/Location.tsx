
import SearchModal from './SearchModal'


export default function Location() {
    const currentCity = 'Mohammadia'


    return (
        <div
        className='h-[12%] flex items-center'>
            <SearchModal/>
            <div className='px-2 flex items-center'> Morocco,
                <span
                className='p-2'>
                    {currentCity}
                </span>
            </div>
        </div>
    )
}

