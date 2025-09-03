import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const keyword = searchParams.get("q")

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        if (!keyword) return;
        setLoading(true)

        try {
            const response = await fetch(SummaryApi.searchProduct.url + `?q=${encodeURIComponent(keyword)}`)
            const dataResponse = await response.json()
            setData(dataResponse.data || [])
        } catch (err) {
            console.error("Error fetching products:", err)
            setData([])
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [keyword])

    return (
        <div className='container mx-auto p-4'>
            {loading && (
                <p className='text-lg text-center'>Loading ...</p>
            )}

            <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

            {!loading && data.length === 0 && (
                <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
            )}

            {!loading && data.length !== 0 && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    )
}

export default SearchProduct

