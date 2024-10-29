import { useEffect, useState } from "react";

const rerenders = new Map();

let current_key = 0;

export function UseList(initial_data: any[]) {
  const [_, setPlaceHolder] = useState(0);

  
  useEffect(() => {
    const key = current_key++;
    if (!rerenders.get(initial_data)) {
      rerenders.set(initial_data, new Map());
    }
    rerenders
      .get(initial_data)
      .set(key, () => setPlaceHolder((prev) => prev + 1));

    return () => {
      rerenders.get(initial_data).delete(key);
    };
  });

  function triggerRerender() {
    for (const rerender of rerenders.get(initial_data).values()) {
      console.log({ rerender });
      rerender();
    }
  }

  function deleteUser(id: number | any) {
    for (let i = 0; i < initial_data.length; i++) {
      if (initial_data[i].id === id) {
        initial_data.splice(i, 1);
        break;
      }
    }
    triggerRerender();
  }
  function addNewItem() {
    const newUser = {
      id: initial_data.length + 1,
      name: "Abhi",
      age: 21,
      country: "India",
      city: "Delhi",
    };
    initial_data.concat(newUser);
    triggerRerender();
  }
  function sortList(field: string) {
    initial_data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    triggerRerender();
  }
  function clearList() {
    initial_data.splice(0, initial_data.length);
    triggerRerender();
  }
  function updateItem(id: number | any, key: string, value: any | Function) {
    for (let i = 0; i < initial_data.length; i++) {
      if (initial_data[i].id === id) {
        if (typeof value === "function") {
          initial_data[i][key] = value(initial_data[i][key]);
        } else {
          initial_data[i][key] = value;
        }
        break;
      }
    }
    triggerRerender();
  }

  function swap(index1: number, index2: number) {
    const temp = initial_data[index1];
    initial_data[index1] = initial_data[index2];
    initial_data[index2] = temp;
    triggerRerender();
  }

  return [
    initial_data,
    deleteUser,
    addNewItem,
    sortList,
    clearList,
    updateItem,
    swap,
  ];
}
