import getNextPrayer from "../getNextPrayer";
import getHoursAndMinutes from "../getHoursAndMinutes";

jest.mock("../getHoursAndMinutes")

describe('Next Prayer' , () => {
    it('should return the next prayer time based on the current time' , () =>{
        (getHoursAndMinutes as jest.Mock).mockImplementation((timeString?: string) => { 
            if (timeString) { 
                // Call for prayer time
                const [hours, minutes] = timeString.split(':').map(Number); 
                return [hours, minutes]; 
            } else { 
                // Call for current time 
                return [14, 30];
            }
        });

        const prayers: [string, string][] = [
            ['Fajr', '05:00'],
            ['Dhuhr', '12:30'],
            ['Asr', '15:00'],
            ['Maghrib', '18:00'],
            ['Isha', '20:00'],
        ];
        const nextPrayer = getNextPrayer(prayers);
        expect(nextPrayer).toEqual(['Asr', '15:00']);
    })
    it('should return the first prayer if current time passed Isha' , () =>{
        (getHoursAndMinutes as jest.Mock).mockImplementation((timeString?: string) => { 
            if (timeString) { 
                // Call for prayer time
                const [hours, minutes] = timeString.split(':').map(Number); 
                return [hours, minutes]; 
            } else { 
                // Call for current time 
                return [21, 30];
            }
        });
        const prayers: [string, string][] = [ 
            ['Fajr', '05:00'], 
            ['Dhuhr', '12:30'],
            ['Asr', '15:00'], 
            ['Maghrib', '18:00'], 
            ['Isha', '20:00'], 
        ];
        const nextPrayer = getNextPrayer(prayers);
        expect(nextPrayer).toEqual(['Fajr', '05:00']);
    })
})