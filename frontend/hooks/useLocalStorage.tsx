import { useState } from "react";

export default function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved || defaultValue;
    }
  });

  return value;
}
