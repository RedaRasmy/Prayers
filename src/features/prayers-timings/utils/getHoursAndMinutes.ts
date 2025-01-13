

export default function getHoursAndMinutes(timing:string) {

    const list = timing.split(':').map(Number)
    if (list.length !== 2 && list.length !== 3 ) {
        throw new Error('getHoursAndMinutes function accept only xx:xx and xx:xx:xx formats')
    }

    return timing.split(':').map(Number)
}

