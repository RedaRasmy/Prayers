import getNextPrayer from "../getNextPrayer";
import getCurrentTime from "../getCurrentTime";

jest.mock("../getCurrentTime")

describe('Next Prayer' , () => {
    it('should return the next prayer time based on the current time' , () =>{
        (getCurrentTime as jest.Mock).mockReturnValue({
            dayNum : 5,
            weekdays : [],
            weekDay : 'monday',
            seconds : 0,
            hours : 14,
            minutes : 0
        })
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
        (getCurrentTime as jest.Mock).mockReturnValue({
            dayNum : 5,
            weekdays : [],
            weekDay : 'monday',
            seconds : 0,
            hours : 21,
            minutes : 0
        })
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