
export type CityType = {
    id : string,
    arabicCityName: string,
    frenshCityName: string
}

export type Data = {
    city :{
        ar:string,
        fr:string
    },
    timings : Timing[]
}

export type Timing = {
    date : Date,
    prayers : Prayers
}

export type Prayers = {
    fajr: string,
    sunrise: string,
    dhuhr : string,
    asr : string,
    maghrib : string,
    ishaa : string 
}

export type Date = {
    readable : string,
    formatedData : string,
    gregorian : MiniDate,
    hijri: MiniDate,
}

export type MiniDate = {
    day:number,
    month:string,
    year:number
}

