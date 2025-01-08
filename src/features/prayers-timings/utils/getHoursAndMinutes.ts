

export default function getHoursAndMinutes(timing?:string) {
    if (!timing) {
        const now = new Date();
        return [now.getHours(),now.getMinutes()]
    }
    return timing.split(':').map(Number)
}
