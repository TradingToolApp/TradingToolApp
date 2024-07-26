import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        let currentValue;
        try {
            currentValue = JSON.parse(
                localStorage.getItem(key) || String(initialValue)
            );
        } catch (error) {
            currentValue = initialValue;
        }

        return currentValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key]);

    return [storedValue, setStoredValue];
}