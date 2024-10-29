import { useState } from "react";

const rerenders = new Map();

export function UseList(initial_data: any[]) {
  const [list, setList] = useState(initial_data as any[]);
  const [placeHolder, setPlaceHolder] = useState(false);


  if (!rerenders.get(initial_data)) {
    rerenders.set(initial_data, []);
  }
  rerenders.get(initial_data).push(() => setPlaceHolder(!placeHolder));

  function triggerRerender() {
    console.log({rerenders, initial_data});
    for (const rerender of rerenders.get(initial_data)) {
      rerender();
    }
  }

  function deleteUser(id: number|any) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
        break;
      }
    }
    triggerRerender();
  }
  function addNewItem() {
    const newUser = {
      id: list.length + 1,
      name: 'Abhi',
      age: 21,
      country: 'India',
      city: 'Delhi'
    };
    list.concat(newUser);
    triggerRerender();
  }
  function sortList(field: string) {
    list.sort((a, b) => a[field] > b[field] ? 1 : -1);
    triggerRerender();
  }
  function clearList() {
    list.splice(0, list.length);
    triggerRerender();
  }
  function updateUser(id: number|any, key:string, value: any) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i][key] = value;
        break;
      }
    }
    triggerRerender();
  }

  function swap(index1: number, index2: number) {
    const temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
    triggerRerender();
  }

  return [list, deleteUser, addNewItem, sortList, clearList, updateUser, swap];

}




