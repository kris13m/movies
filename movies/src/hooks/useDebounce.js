// hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * A custom hook that debounces a value.
 * @param {any} value The value to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {any} The debounced value.
 */
function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set up a timer to update the debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Clean up the timer if the value changes (e.g., user is still typing)
      // or if the component unmounts.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Re-run the effect only if value or delay changes
  );

  return debouncedValue;
}

export default useDebounce;