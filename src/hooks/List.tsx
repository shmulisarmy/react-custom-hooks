import { useEffect, useState } from "react";

const rerenders = new Map();

let current_key = 0;



function triggerRerender(data_based_on: Array<any>) {
  for (const rerender of rerenders.get(data_based_on).values()) {
    console.log({ rerender });
    rerender();
  }
}

function deleteUser(id: number | any) {
  for (let i = 0; i < this.length; i++) {
    if (this[i].id === id) {
      this.splice(i, 1);
      break;
    }
  }
  triggerRerender(this);
}
function addNewItem() {
  const newUser = {
    id: this.length + 1,
    name: "Abhi",
    age: 21,
    country: "India",
    city: "Delhi",
  };
  this.push(newUser);
  triggerRerender(this);
}
function sortList(field: string) {
  this.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  triggerRerender(this);
}
function clearList() {
  this.splice(0, this.length);
  triggerRerender(this);
}
function updateItem(id: number | any, key: string, value: any | Function) {
  for (let i = 0; i < this.length; i++) {
    if (this[i].id === id) {
      if (typeof value === "function") {
        this[i][key] = value(this[i][key]);
      } else {
        this[i][key] = value;
      }
      break;
    }
  }
  triggerRerender(this);
}

function swap(index1: number, index2: number) {
  const temp = this[index1];
  this[index1] = this[index2];
  this[index2] = temp;
  triggerRerender(this);
}





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

  return [
    initial_data,
    deleteUser.bind(initial_data),
    addNewItem.bind(initial_data),
    sortList.bind(initial_data),
    clearList.bind(initial_data),
    updateItem.bind(initial_data),
    swap.bind(initial_data),
  ];
}
