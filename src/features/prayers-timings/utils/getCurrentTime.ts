

export default function getCurrentTime() {
    const today = new Date();
    const dayNum = today.getDate()
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const weekDay = weekdays[today.getDay()]
    const seconds = today.getSeconds()
    const hours = today.getHours()
    const minutes = today.getMinutes()
    
    return {
        dayNum,
        weekdays,
        weekDay,
        seconds,
        hours,
        minutes
    }
}
