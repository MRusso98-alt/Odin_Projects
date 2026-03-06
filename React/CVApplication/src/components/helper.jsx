import { useState } from "react";

export function Input(props){
    const [value, setValue] = useState("");
    props.storage[props.index] = value;

    return(
        <div className = "input-text">
            <label htmlFor = {props.id}>{props.id}</label>
            <input type = "text" id = {props.id} value = {value} autoComplete="off" onChange = {(event) => setValue(event.target.value)}></input>
        </div>
    )
}

export function Looper(props){
    let loopedFields = [];
    for(let i = 0; i < props.times; i++){
        loopedFields.push(
            <div className = "inputs" key = {i}>
                {
                    props.fields.map((name, index) => {
                        return <Input key = {`${name}-${i}`} storage = {props.storage} index = {i * props.fields.length + index} id = {name} />
                    })
                }
            </div>
        );
    }

    return loopedFields;
}

export function Iterate(props){
    let allElements = []
    for(let i = 0; i < props.elements.length; i++){
        allElements.push(
            <h3 key = {i}>{props.names[i%props.numOfFields] + ": " + props.elements[i]}</h3>
        );
    }

    return allElements;
}