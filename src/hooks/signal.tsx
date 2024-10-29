import { useState } from "react";

const rerenders = {}


export function useStore(store: any) {
    const [placeHolder, setPlaceHolder] = useState(false);
    if (!rerenders[store]) {
      rerenders[store] = [];
    }
    rerenders[store].push(() => setPlaceHolder(!placeHolder));
  
    function triggerRerender() {
      for (const rerender of rerenders[store]) {
        rerender();
      }
    }

    function setStore(...keys: any) {
      let place_to_set = store;
      for (let i = 0; i < keys.length-2; i++) {
        const current_key = keys[i];
        place_to_set = place_to_set[current_key];
      }
      if (keys[keys.length - 1] === undefined) {
        delete place_to_set[keys[keys.length - 2]];
      } else { 
        place_to_set[keys[keys.length - 2]] = keys[keys.length - 1];
      }
      triggerRerender();  

    }
  
    return [store, setStore]
  }