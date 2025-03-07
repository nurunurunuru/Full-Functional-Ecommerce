import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

  const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const verifyPayment = async()=>{
   try {
    if(!token){
      return;
    }
    const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {token}})
    if(response.data.success){
      setCartItems({});
      toast.success("Payment Successful");
      navigate('/orders')
    }else{
      toast.error("Payment Failed");
      navigate('/')
    }
   } catch (error) {
     console.log(error)
     toast.error(error.message)
   }
  }

  useEffect(()=>{
   verifyPayment();
  }, [token]);
  return (
    <div>Verify</div>
  )
}

export default Verify