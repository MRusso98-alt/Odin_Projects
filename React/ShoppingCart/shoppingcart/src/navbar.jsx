import { useContext } from "react";
import { Link } from "react-router-dom"
import { StoreContext } from "./main";

function calculateNumberOfItems(cart){
    let accumulator = 0;
    for(let i = 0; i < cart.length; i++){
        accumulator += cart[i].value;
    }
    return accumulator;
}

export function Navbar(){
    const [cart, setCart] = useContext(StoreContext);

    return (
        <div className="navbar">
            <Link to="/">Homepage</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart: {calculateNumberOfItems(cart)}</Link>
        </div>
    );
}