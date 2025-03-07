import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/data.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('');


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
      cartData[itemId] = {} 
      cartData[itemId][size] = 1
    }

    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{ token }})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        
      }
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

  //Updated the Quantity
 const updateQuantity = async (itemId, size, quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity;
    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        
      }
    }
 }

 //Getting Total Cartamount
 const getCartAmount = ()=>{
  let totalAmount = 0
  for (const items in cartItems){
    let itemInfo = products.find((product)=>product._id == items)
    for(const item in cartItems[items]){
      try{
          if(cartItems[items][item] > 0){
             totalAmount += itemInfo.price * cartItems[items]
             [item]
          }
      }catch (error){
            console.log(error);
            
      }
    }
  }
  return totalAmount;
 }


 const getProductsData = async ()=>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }  
    } catch (error) {
      console.log(error);  
      toast.error(error.message)
    }
 }

 const getUserCart = async (token)=> {
  try {
    const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
    if(response.data.success){
      setCartItems(response.data.cartData)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }
 }

 useEffect(()=>{
  if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
    setUserId(localStorage.getItem('userId'));
    getUserCart(localStorage.getItem('token'))
  }
  getProductsData()
 },[])

 const [orderData, setOrderData] = useState([]); 

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
    setCartItems,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl,
    orderData,       
    setOrderData,
    userId,
    setUserId,
  };

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
