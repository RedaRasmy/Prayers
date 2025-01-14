import getCurrentTime from "./getCurrentTime";
import getHoursAndMinutes from "./getHoursAndMinutes";


export default function getTimeLeft(timing:string)  {
    const [timingHours, timingMinutes] = getHoursAndMinutes(timing)
    const {seconds , hours, minutes} = getCurrentTime()
    const secondsLeft = (59-seconds).toString().padStart(2,'0')

    let hoursLeft;
    let minutesLeft;

    if (timingMinutes <= minutes) {
        hoursLeft = timingHours - hours + (timingHours > hours ? -1 : 23);
        minutesLeft = 59 - minutes + timingMinutes;
    } else {
        hoursLeft = timingHours - hours + (timingHours >= hours ? 0 : 24);
        minutesLeft = timingMinutes - minutes - 1 ;
    }

    const stringTime = (
        hoursLeft.toString().padStart(2,'0')
        + ":" 
        + minutesLeft.toString().padStart(2,'0')
        + ":"
        + secondsLeft
    )
    return stringTime
}