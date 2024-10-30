import { useEffect, useState } from "react";

const rerenders = new Map();
let unique_key = 0;

export function setSharedState(key: string|any, newValue: any) {
  for (const setValue of rerenders.get(key).values()) {
    console.log({ setValue });
    setValue(newValue);
  }
}

export default function useSync(key: string, default_value: any) {
  const [value, setValue] = useState(default_value);
  useEffect(() => {
    const uKey = unique_key++;

    if (!rerenders.get(key)) {
      rerenders.set(key, new Map());
    }
    rerenders.get(key).set(uKey, setValue);

    return () => {
      rerenders.get(key).delete(uKey);
    };
  });

  return [
    value,
    (newValue) => {
      setSharedState(key, newValue);
    }
  ];
}
