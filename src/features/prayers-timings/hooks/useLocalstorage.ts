import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue?: T) {
    // State to store the current value
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        try {
            // Check if we are running on the client side
            if (typeof window !== 'undefined') {
                // Get value from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or, if undefined, return initialValue
                return item ? JSON.parse(item) : initialValue;
            } else {
                return initialValue;
            }
        } catch (error) {
            console.warn(error);
            return initialValue;
        }
    });

    // Function to update the value in local storage
    const setValue = (value: T | ((val: T|undefined) => T)) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const storedValue = window.localStorage.getItem(key);
        if (storedValue !== null) {
            setStoredValue(JSON.parse(storedValue));
        }
    }, [key]);

    // console.log('from useLocalStorage :' ,storedValue)
    
    return [storedValue, setValue] as const;
}
