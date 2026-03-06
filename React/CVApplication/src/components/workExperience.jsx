import { Looper } from "./helper";
import { useState } from "react";

export function WorkExperience(props){
    const [times, setTimes] = useState(1);

    return(
        <div className="work-info">
            <h2>Work experience:</h2>
            <Looper times = {times} fields = {props.storageNames} storage = {props.storage}/>
            <button onClick={() => setTimes(times+1)}>Add</button>
        </div>
    )
}