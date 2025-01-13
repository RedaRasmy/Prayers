import { renderHook, act } from "@testing-library/react";
import useTimeLeft from "../useTimeLeft";
import getHoursAndMinutes from "../../utils/getHoursAndMinutes";
import getCurrentTime from "../../utils/getCurrentTime";

// Mock the time utility functions
jest.mock("../../utils/getHoursAndMinutes");
jest.mock("../../utils/getCurrentTime");

// Cast `getHoursAndMinutes` as a Jest mock function
const mockedGetHoursAndMinutes = getHoursAndMinutes as jest.MockedFunction<
    typeof getHoursAndMinutes
    >;
    const mockedGetCurrentTime = getCurrentTime as jest.MockedFunction<
    typeof getCurrentTime
    >;

    describe("useTimeLeft", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should update time left every second", () => {
        // Mock the initial time
        mockedGetHoursAndMinutes.mockReturnValue([18, 46]);
        mockedGetCurrentTime.mockReturnValue({
        dayNum: 0,
        weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        weekDay: "Monday",
        seconds: 0,
        hours: 18,
        minutes: 20,
        });

        const { result } = renderHook(() => useTimeLeft("18:46"));

        // Fast-forward time by one second
        act(() => {
        jest.advanceTimersByTime(1000);
        });

        // Update the mock to return the new current time
        (
        getCurrentTime as jest.MockedFunction<typeof getCurrentTime>
        ).mockReturnValue({
        dayNum: 0,
        weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        weekDay: "Monday",
        seconds: 1,
        hours: 18,
        minutes: 20,
        });

        expect(result.current).toBe("00:25:59");

        act(() => {
        jest.advanceTimersByTime(1000);
        });

        // Update the mock to return the new current time
        (
        getCurrentTime as jest.MockedFunction<typeof getCurrentTime>
        ).mockReturnValue({
        dayNum: 0,
        weekdays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        weekDay: "Monday",
        seconds: 2,
        hours: 18,
        minutes: 20,
        });
        expect(result.current).toBe("00:25:58");
    });

    it("should return undefined if no timing is provided", () => {
        const { result } = renderHook(() => useTimeLeft(undefined));

        expect(result.current).toBeUndefined();
    });
});
