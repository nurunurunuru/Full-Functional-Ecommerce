import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';
import { FaHeart, FaStar } from 'react-icons/fa';
import { FaStarHalfStroke, FaTruckFast } from 'react-icons/fa6';
import Footer from '../components/Footer';
import RelatedProducts from '../components/RelatedProducts';
import { TbShoppingBagPlus } from 'react-icons/tb';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState({});
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

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
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 mt-8 xl:mt-10">
        <div className="flex flex-col xl:flex-row gap-12 bg-white shadow-lg rounded-3xl overflow-hidden">
          {/* Product Image Section */}
          <div className="flex flex-col xl:flex-[0.5] p-6">
            <div className="flex gap-4 mb-4">
              {product.image.map((item, i) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={i}
                  alt={`Product thumbnail ${i}`}
                  className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                    image === item ? 'border-tertiary' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <img
                src={image}
                alt="Selected product"
                className="w-full h-96 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex-1 p-6 xl:p-10">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating and Price */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfStroke />
                <span className="text-gray-600">(122 reviews)</span>
              </div>
              <h2 className="text-3xl font-semibold text-tertiary">
                {currency}{product.price}
              </h2>
            </div>

            {/* Product Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Select Size:</h3>
                <div className="flex gap-2">
                  {[...product.sizes]
                    .sort((a, b) => {
                      const order = ['S', 'M', 'L', 'XL', 'XXL'];
                      return order.indexOf(a) - order.indexOf(b);
                    })
                    .map((item, i) => (
                      <button
                        onClick={() => setSize(item)}
                        key={i}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                          size === item
                            ? 'bg-tertiary text-white border-tertiary'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={()=>addToCart(product._id, size)} className="bg-tertiary text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow hover:shadow-lg transition">
                Add to Cart
                <TbShoppingBagPlus className="text-lg text-secondary" />
              </button>
              <button className="p-3 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition">
                <FaHeart className="text-red-500" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <FaTruckFast className="text-xl text-tertiary bg-secondary" />
              <span>Free Delivery Over $500</span>
            </div>

            {/* Extra Info */}
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>✅ Cash on Delivery Available</p>
              <p>✅ Easy Returns Within 7 Days</p>
              <p>✅ 100% Genuine Products</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <RelatedProducts category={product.category} subCategory={product.subCategory} />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Product;
