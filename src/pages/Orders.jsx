import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Footer from '../components/Footer';
import axios from 'axios';

const Orders = () => {
  // const { backendUrl, token, currency } = useContext(ShopContext);
  const { products, currency, backendUrl, token, orderData, setOrderData  } = useContext(ShopContext);

  // const [orderData, setOrderData] = useState([])

  const loadOrderData = async ()=>{
    try {
  if(!token){
    return null
  }   
  const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
  if(response.data.success){
    let allOrdersItem = [];
    response.data.orders.map((order)=>{
      order.item?.map((item)=>{
        item['status'] = order.status
        item['payment'] = order.payment
        item['paymentMethod'] = order.paymentMethod
        item['date'] = order.date
        allOrdersItem.push(item)
      })
    }) 
    setOrderData(allOrdersItem.reverse())
  }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    loadOrderData()
  }, [token])

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Orders <span className="text-secondary">List</span>
        </h3>
        
        {/* Orders Container */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          {products.map((item, i) => (
            <div key={i} className="border-b border-gray-200 last:border-none pb-4 mb-4">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Image */}
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                
                {/* Order Info */}
                <div className="flex-1">
                  <h5 className="text-lg font-medium text-gray-900 line-clamp-1 capitalize">
                    {item.name}
                  </h5>
                  <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
                    <p><span className="font-semibold">Price:</span> {currency}{item.price}</p>
                    <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                    <p><span className="font-semibold">Size:</span> {item.size}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(item.date).toDateString()}</p>
                    <p><span className="font-semibold">Payment:</span> {item.paymentMethod}</p>
                    <p className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-green-500'} mr-2`}></span>
                      {item.status}
                    </p>
                  </div>
                </div>
                
                {/* Track Order Button   onClick={loadOrderData} */}
                <button onClick={loadOrderData} className="px-4 py-2 text-sm font-medium text-white btn-secondary rounded-lg shadow-md hover:bg-green-500 transition-all">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Orders;
