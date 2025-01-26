import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';
import { FaStar } from 'react-icons/fa';
import { FaStarHalfStroke } from 'react-icons/fa6';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [product, setProduct] = useState({});
  const [image, setImage] = useState('');
  const [size, setSize] = useState(''); // Add state for size

  const fetchProductData = () => {
    if (!products || products.length === 0) return;

    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image?.[0] || '');
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!product || !product.image) {
    return <div>Loading...</div>; // Handle loading or invalid product gracefully
  }

  return (
    <section>
      <div className="max-padd-container">
        <div className="max-padd-container flex gap-12 flex-col xl:flow-row bg-white py-16 rounded-2xl">
          {/* Product-Image */}
          <div className="flex flex-1 gap-x-2 xl:flex-1">
            <div className="flexCenter flex-col gap-[7px] flex-wrap">
              {product.image.map((item, i) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={i}
                  alt="productImg"
                  className="max-h-[89px] rounded-lg"
                />
              ))}
            </div>
            <div className="max-h-[377px] w-auto flex">
              <img src={image} alt="" className="rounded-xl bg-gray-10" />
            </div>
          </div>
          {/* Product-Info */}
          <div>
            <h3>{product.name}</h3>
            {/* Rating & Price */}
            <div>
              <h3>{currency}{product.price}</h3>
            </div>
            <div>
              <div>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfStroke />
              </div>
              <span>(122)</span>
            </div>
          </div>
          <p>{product.description}</p>
          <div>
            <div>
              {product.sizes && [...product.sizes]
                .sort((a, b) => {
                  const order = ["S", "M", "L", "XL", "XXL"];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map((item, i) => (
                  <button
                    onClick={() => setSize(item)}
                    key={i}
                    className={`${item === size ? "bg-tertiary text-white" : "border-slate-900/5"} border-[1.5px] border-tertiary h-8 w-10 bg-primary rounded-md`}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
