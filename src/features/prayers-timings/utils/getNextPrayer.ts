import getCurrentTime from "./getCurrentTime";
import getHoursAndMinutes from "./getHoursAndMinutes";

export default function getNextPrayer(prayers:[string,string][]):[string,string] {
    const {hours,minutes} = getCurrentTime()
    let output = prayers[0]

    for (const prayer of prayers) {
        const [timingHours,timingMinutes] = getHoursAndMinutes(prayer[1])
        if ((timingHours > hours) || (timingHours === hours && timingMinutes > minutes)) {
            output = prayer
            break
        }
    }
    return output
}
