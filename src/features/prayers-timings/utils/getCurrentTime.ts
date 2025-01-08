

export default function getCurrentTime() {
    const today = new Date();
    const dayNum = today.getDate()
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const weekDay = weekdays[today.getDay()]
    const seconds = today.getSeconds()
    return {
        today,
        dayNum,
        weekdays,
        weekDay,
        seconds
    }
}
