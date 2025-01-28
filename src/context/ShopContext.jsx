import { createContext, useEffect, useState } from "react";
import { products } from "../assets/data.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "S";
  const delivery_charges = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Adding items to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    const cartData = { ...cartItems };

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success("Item added to cart!",{
        position: "bottom-right",
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalCount += cartItems[items][size];
        }
      }
    }
    return totalCount;
  };

 const updateQuantity = async (itemId, size, quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity;
    setCartItems(cartData)
 }

  const contextvalue = {
    products,
    currency,
    delivery_charges,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity
  };

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
