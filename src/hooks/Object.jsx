import { useState } from "react";

export function UseObject(data) {
  // const [data, setData] = useState(initial_data);
  const [placeHolder, setPlaceHolder] = useState(false);
  function triggerRerender() {
    setPlaceHolder(!placeHolder);
  }


  function deleteItem(key) {
    delete data[key];
    triggerRerender();
  }

  function updateItem(key, value) {
    data[key] = value;
    triggerRerender();
  }

  function addItem(key, value) {
    data[key] = value;
    triggerRerender();
  }

  function swap(key1, key2) {
    const temp = data[key1];
    data[key1] = data[key2];
    data[key2] = temp;
    triggerRerender();
  }

  function clear() {
    for (const key in data) {
      delete data[key];
    }
    triggerRerender();
  }



  return [data, deleteItem, addItem, swap, clear, updateItem, placeHolder];
}
