import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    author: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: params?.id })
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => setActiveImage(imageURL);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, quantity); // truyền quantity
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id, quantity); // truyền quantity
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-white shadow-lg rounded-xl overflow-hidden p-2 relative">
            <img
              src={activeImage}
              className="h-full w-full object-contain transition-transform duration-200 ease-in-out"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-white p-1 rounded shadow-xl -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] scale-150"
                  style={{
                    background: `url(${activeImage}) no-repeat`,
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                    backgroundSize: 'cover'
                  }}
                />
              </div>
            )}
          </div>

          <div className="h-full flex gap-3 lg:flex-col overflow-x-auto lg:overflow-y-auto">
            {loading
              ? new Array(4).fill(null).map((_, index) => (
                <div key={index} className="h-20 w-20 bg-slate-200 rounded-lg animate-pulse" />
              ))
              : data?.productImage?.map((imgURL) => (
                <div key={imgURL} className="h-20 w-20 bg-white rounded-lg p-1 shadow hover:shadow-md transition">
                  <img
                    src={imgURL}
                    className="w-full h-full object-contain cursor-pointer"
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded-full animate-pulse w-1/3"></div>
              <div className="h-8 bg-slate-200 rounded animate-pulse w-2/3"></div>
              <div className="h-6 bg-slate-200 rounded animate-pulse w-1/4"></div>
              <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="h-16 bg-slate-200 rounded animate-pulse w-full"></div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-gray-800">{data?.productName}</h2>

              <p className="text-base text-gray-500 capitalize">{data?.category}</p>

              <p className="text-base text-gray-600">Tác giả: <span className="font-medium">{data?.author}</span></p>

              <div className="flex text-yellow-500">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
              </div>

              <div className="flex items-center gap-3 text-xl font-medium">
                <span className="text-red-600">{displayINRCurrency(data.sellingPrice)}</span>
                <span className="line-through text-gray-400">{displayINRCurrency(data.price)}</span>
              </div>

              {/* Số lượng */}
              <div className="flex items-center gap-3">
                <p className="text-gray-700 font-medium">Số lượng:</p>
                <button
                  className="border px-3 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >-</button>
                <span className="min-w-[24px] text-center">{quantity}</span>
                <button
                  className="border px-3 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >+</button>
              </div>

              {/* Nút hành động */}
              <div className="flex gap-4">
                <button
                  className="border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >Mua ngay</button>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >Thêm vào giỏ hàng</button>
              </div>

              <div>
                <p className="text-gray-900 font-semibold mb-1">Mô Tả:</p>
                <p className="text-gray-700 text-base whitespace-pre-line">{data?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {Array.isArray(data.category) && (
        <CategroyWiseProductDisplay
          category={data.category}
          heading={"Gợi Ý Cho Bạn"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
