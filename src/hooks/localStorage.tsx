import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any, time: number = 0) {
    let last_updated = localStorage.getItem(`__last_updated_${key}__`)
    let time_amount
    if (last_updated  && (new Date().getTime() - parseInt(last_updated)) < time) {
        initialValue = JSON.parse(localStorage.getItem(key)!)
    } else {
        localStorage.setItem(key, JSON.stringify(initialValue))
        localStorage.setItem(`__last_updated_${key}__`, new Date().getTime().toString())
    }
    const [storedValue, setStoredValue] = useState(initialValue);
    function setValue(value: any) {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            localStorage.setItem(`__last_updated_${key}__`, new Date().getTime().toString());
            setStoredValue(valueToStore);
        } catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue];
}
export default useLocalStorage