
import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(8).fill(null)

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
    setData(categoryProduct?.data)
    setLoading(false)
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
          className='flex gap-5 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1'
          ref={scrollElement}
        >
          {(loading ? loadingList : data).map((product, index) => (
            <div
              key={index}
              className='min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 flex overflow-hidden border'
            >
              <Link
                to={product?._id ? `/product/${product._id}` : '#'}
                className='flex w-full'
              >
                <div className='bg-slate-100 w-36 p-3 flex items-center justify-center'>
                  {loading ? (
                    <div className='w-full h-28 bg-slate-200 animate-pulse rounded' />
                  ) : (
                    <img
                      src={product?.productImage?.[0]}
                      alt={product?.productName}
                      className='object-contain h-28 transition-transform duration-200 hover:scale-105 mix-blend-multiply'
                    />
                  )}
                </div>

                <div className='p-4 flex flex-col justify-between flex-1'>
                  {loading ? (
                    <>
                      <div className='h-5 bg-slate-200 rounded animate-pulse w-3/4 mb-1' />
                      <div className='h-4 bg-slate-200 rounded animate-pulse w-1/2 mb-1' />
                      <div className='flex gap-2 mb-1'>
                        <div className='h-4 w-20 bg-slate-200 rounded animate-pulse' />
                        <div className='h-4 w-16 bg-slate-200 rounded animate-pulse' />
                      </div>
                      <div className='h-8 bg-slate-200 rounded animate-pulse w-full' />
                    </>
                  ) : (
                    <>
                      <h2 className='font-semibold text-base text-gray-800 line-clamp-2 leading-snug'>
                        {product?.productName}
                      </h2>
                      <p className='text-sm text-gray-500 capitalize'>
                        {product?.author || product?.category}
                      </p>
                      <div className='flex gap-2 items-center mt-1'>
                        <p className='text-red-600 font-semibold text-sm'>
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className='text-gray-400 line-through text-sm'>
                          {displayINRCurrency(product?.price)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product?._id)}
                        className='mt-2 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full font-medium transition-all w-fit'
                      >
                        Thêm vào giỏ hàng
                      </button>
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

export default HorizontalCardProduct
