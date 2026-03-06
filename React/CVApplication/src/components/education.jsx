import { Looper } from "./helper";
import { useState } from "react";

function AddHandler(times, setTimes, storage, setStorage, length){
    setTimes(times+1);
    let newArr = new Array(length).fill(0);
    setStorage([...storage, ...newArr]);
}

export function Education(props){
    const [times, setTimes] = useState(1);

    return(
        <div className="education-info">
            <h2>Education:</h2>
            <Looper times = {times} fields = {props.storageNames} storage = {props.storage}/>
            <button onClick={() => AddHandler(times, setTimes, props.storage, props.update, props.startLength)}>Add</button>
        </div>
    )
}