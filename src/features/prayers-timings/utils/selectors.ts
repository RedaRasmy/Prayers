import { Data } from "./types";



export function selectPrayers(data:Data,dayNum:number) {

    const timing = data.timings.find(
        timing => timing.date.gregorian.day === dayNum
    );

    if (timing) {
        const array: [string, string][] = Object.entries(timing.prayers);
        return array;
    }
    
}

export function selectDate(data:Data,dayNum:number) {

    const timing = data.timings.find(
        timing => timing.date.gregorian.day === dayNum
    );

    if (timing) {
        return timing.date;
    }
    
}