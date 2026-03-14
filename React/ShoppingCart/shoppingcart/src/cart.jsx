import { Navbar } from "./navbar";
import { useContext } from "react";
import { StoreContext } from "./main";

export function Cart(){
    const [cart, setCart] = useContext(StoreContext);

    return(
        <>
            <Navbar/>
            <h1>Your items:</h1>
            <ul>
                {
                    cart.map((item, i) => {
                        return (<li>{item.name} - {item.value}</li>);
                    })
                }
            </ul>
        </>
    );
}