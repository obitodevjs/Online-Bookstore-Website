
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import productCategory from '../helpers/productCategory';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(10).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);

    // Loại trùng
    const unique = {};
    const filtered = [];

    dataResponse.data.forEach((product) => {
      const category = product.categoryRepresentative;
      if (!unique[category]) {
        unique[category] = true;
        filtered.push(product);
      }
    });

    setCategoryProduct(filtered);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const getLabelByValue = (value) => {
    const found = productCategory.find((item) => item.value === value);
    return found ? found.label : value;
  };

  return (
    <div className="container mx-auto p-4">
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 5 },
          768: { slidesPerView: 7 },
          1024: { slidesPerView: 10 },
        }}
      >
        {loading
          ? categoryLoading.map((_, index) => (
              <SwiperSlide key={"loading" + index}>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-20 w-20 rounded-full bg-slate-200 animate-pulse"></div>
                  <div className="h-4 w-14 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </SwiperSlide>
            ))
          : categoryProduct.map((product) => {
              const categoryValue = product.categoryRepresentative;
              return (
                <SwiperSlide key={categoryValue}>
                  <Link
                    to={`/product-category?category=${categoryValue}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shadow-md">
                      <img
                        src={product.productImage?.[0] || ''}
                        alt={getLabelByValue(categoryValue)}
                        className="h-full w-full object-contain mix-blend-multiply p-2 hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center text-xs md:text-sm whitespace-nowrap">
                      {getLabelByValue(categoryValue)}
                    </p>
                  </Link>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default CategoryList;

