import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const scrollElement = useRef()
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='relative'>
        <button
          className='bg-white shadow-md rounded-full p-2 absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block'
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className='bg-white shadow-md rounded-full p-2 absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block'
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        <div
          className='flex gap-6 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1'
          ref={scrollElement}
        >
          {(loading ? loadingList : data).map((product, index) => (
            <div
              key={index}
              className='min-w-[280px] md:min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 flex flex-col'
            >
              <Link
                to={product?._id ? `/product/${product._id}` : '#'}
                className='block'
              >
                <div className='bg-slate-100 h-64 p-3 flex justify-center items-center rounded-t-2xl overflow-hidden'>
                  {loading ? (
                    <div className='w-full h-full bg-slate-200 animate-pulse rounded' />
                  ) : (
                    <img
                      src={product?.productImage?.[0]}
                      alt={product?.productName}
                      className='object-contain h-full transition-transform hover:scale-105 mix-blend-multiply'
                    />
                  )}
                </div>

                <div className='p-4 flex flex-col flex-grow'>
                  {loading ? (
                    <>
                      <div className='h-5 bg-slate-200 rounded animate-pulse w-3/4' />
                      <div className='h-4 bg-slate-200 rounded animate-pulse w-1/2' />
                      <div className='h-4 bg-slate-200 rounded animate-pulse w-2/3' />
                      <div className='h-8 bg-slate-200 rounded animate-pulse w-full mt-2' />
                    </>
                  ) : (
                    <>
                      {/* Tiêu đề sản phẩm, giới hạn chỉ 2 dòng */}
                      <h2 className='font-semibold text-base text-gray-800 line-clamp-2 overflow-hidden leading-snug h-[48px]'>
                        {product?.productName}
                      </h2>
                      <p className='capitalize text-sm text-gray-500'>
                        {product?.author}
                      </p>
                      <div className='flex gap-2 items-center'>
                        <p className='text-red-600 font-semibold'>
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className='text-sm text-gray-400 line-through'>
                          {displayINRCurrency(product?.price)}
                        </p>
                      </div>

                      {/* Căn giữa nút thêm vào giỏ hàng */}
                      <div className='mt-2 flex justify-center'>
                        <button
                          onClick={(e) => handleAddToCart(e, product?._id)}
                          className='text-sm w-full bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold transition-all'
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerticalCardProduct
