import { useState } from "react";



export default function useSelector(options: any[]) {
    const [index, setIndex] = useState(0);
    function next() {
        setIndex((index + 1) % options.length);
    }
    function prev() {
        setIndex((index - 1 + options.length) % options.length);
    }
    return [options[index], next, prev];
}
