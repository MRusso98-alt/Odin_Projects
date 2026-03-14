import { Navbar } from "./navbar";
import { Cards } from "./cards";

export function Shop(){
    return(
        <>
            <Navbar/>
            <h1>Items:</h1>
            <div className="shop-items">
                <Cards/>
            </div>
        </>
    );
}