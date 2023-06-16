import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      var value;
      if (typeof window !== "undefined") {
        // value = localStorage.getItem("favoriteNumber") || ""
        value = window.localStorage.getItem(key);
      }
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      setState(value);
    } catch (error) {
      // console.log(error);
    }
  };

  const removeValue = (value) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  return [state, setValue, removeValue];
};

export default useLocalStorage;