import { Autocomplete, TextField } from '@mui/material'
import React, { SyntheticEvent } from 'react'
import useCities from '../hooks/useCities'
import { CityType } from '../utils/types'

export default function SelectCity({onChange}:{
    onChange : (e: SyntheticEvent<Element, Event>, newValue: CityType | null) => void
}) {
    const { cities,isPending} = useCities()

    return (
        <Autocomplete
            className=''
            disablePortal
            loading={isPending}
            options={cities || []}
            getOptionLabel={option=>option.frenshCityName}
            sx={{ width: 300 }}
            onChange={onChange}
            renderInput={ (params) =>
                <TextField 
                    className='!outline-white'
                    {...params}
                    label="City"
                />
            }
        />
    )
}
