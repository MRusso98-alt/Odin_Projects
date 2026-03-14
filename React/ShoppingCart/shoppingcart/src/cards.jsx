import { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "./main";

function decreaseValue(value, setValue){
    if(value > 0) setValue(value-1);
}

function increaseValue(value, setValue){
    if(value < 990) setValue(value+1);
}

async function getItemData(id, setImageURL, setError, setLoading, setName, setPrice){
    try{
        const response = await fetch('https://fakestoreapi.com/products/' + id);
        const json = await response.json();
        setImageURL(json.image);
        setName(json.title);
        setPrice(json.price);
        setLoading(false);
    } catch (error){
        setError(error);
    }
}

function addToCart(cart, setCart, name, value) {
  let added = false;

  const newCart = cart.map((item) => {
    if (item.name === name) {
      added = true;
      return { ...item, value: item.value + value };
    }
    return item;
  });

  if (!added) {
    setCart([...cart, { name, value }]);
  } else {
    setCart(newCart);
  }
}

function SingleItem(props){
    const [cart, setCart] = useContext(StoreContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [value, setValue] = useState(0);
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getItemData(props.id, setImageURL, setError, setLoading, setName, setPrice);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;

    return(
        <>  
            <h2>{name}</h2>
            <div className="image-container">
                <img src = {imageURL}></img>
            </div>
            <h2>{price}$</h2>
            <div className = "item-quantity">
                <button onClick={() => decreaseValue(value, setValue)}>-</button>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
                <button onClick={() => increaseValue(value, setValue)}>+</button>
            </div>
            <button onClick={() => addToCart(cart, setCart, name, value)}>Add to cart</button>
        </>
    )
};

export function Cards(){
    const items = Array.from({ length: 20 });

    return (
        <>
            {items.map((_, i) => (
                <div className="item" key={i}>
                    <SingleItem  id={i + 1} />
                </div>
            ))}
        </>
    );
}