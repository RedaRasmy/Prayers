
import useLocalStorage from '../../hooks/useLocalstorage'
import useTimings from '../../hooks/useTimings'
import { CityType } from '../../utils/types'
import SearchModal from './SearchModal'


export default function Location() {
    const [city,] = useLocalStorage<CityType>('city')
    const {isSuccess} = useTimings()

    return (
        <div
        className='h-[12%] flex items-center'>
            {
            isSuccess &&
            <>
                <SearchModal/>
                <div className='px-2 flex items-center'> Morocco,
                    <span
                    className='p-2'>
                        {city?.frenshCityName}
                    </span>
                </div>
            </>
            }
        </div>
    )
}

