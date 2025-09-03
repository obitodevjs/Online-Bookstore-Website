import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(8).fill(null)


  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
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

  return (
    <div className='container mx-auto px-4 my-10'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>{heading}</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          loading ? (
            loadingList.map((_, index) => (
              <div key={index} className='bg-white rounded-xl shadow-md p-4 animate-pulse flex flex-col gap-3'>
                <div className='h-40 bg-slate-200 rounded-lg'></div>
                <div className='h-4 bg-slate-200 rounded w-3/4'></div>
                <div className='h-4 bg-slate-200 rounded w-1/2'></div>
                <div className='h-10 bg-slate-200 rounded w-full'></div>
              </div>
            ))
          ) : (
            data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product._id}
                className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden'
                onClick={scrollTop}
              >
                <div className='bg-transparent h-48 flex justify-center items-center'>
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className='object-contain h-full transition-transform duration-300 hover:scale-105'
                  />
                </div>
                <div className='p-4 flex flex-col gap-2'>
                  <h2 className='text-lg font-semibold text-gray-800 line-clamp-1'>{product?.productName}</h2>
                  <p className='text-sm text-gray-500 capitalize line-clamp-1'>{product?.author}</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-red-600 font-semibold text-lg'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-gray-400 line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>
                  <button
                    className='mt-2 w-full text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition font-medium'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </Link>
            ))
          )
        }
      </div>
    </div>
  )
}

export default CategroyWiseProductDisplay
