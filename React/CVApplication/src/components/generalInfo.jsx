import { Input } from "./helper"

export function GeneralInfo(props){
    return(
        <div className="general-info">
            <h2>General information:</h2>
            <div className = "inputs">
                {
                    props.storageNames.map((name, index) => {
                        return <Input key = {name} storage = {props.storage} index = {index} id = {name} />
                    })
                }
            </div>
        </div>
    )
}