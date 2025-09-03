import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const initialCategoryState = {};
  urlCategoryListinArray.forEach(el => {
    initialCategoryState[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(initialCategoryState);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      });

      const dataResponse = await response.json();
      let fetchedData = dataResponse?.data || [];

      if (sortBy === 'asc') {
        fetchedData = [...fetchedData].sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (sortBy === 'dsc') {
        fetchedData = [...fetchedData].sort((a, b) => b.sellingPrice - a.sellingPrice);
      }

      setData(fetchedData);
    } catch (error) {
      console.error("Fetch category product error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCategories = Object.keys(selectCategory).filter(category => selectCategory[category]);
    setFilterCategoryList(selectedCategories);

    const urlQuery = selectedCategories.map(c => `category=${c}`).join("&");
    navigate("/product-category?" + urlQuery);
  }, [selectCategory]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList, sortBy]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory(prev => ({
      ...prev,
      [value]: checked
    }));
  };

  const handleOnChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Sidebar */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value="asc" />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value="dsc" />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((category, index) => (
                <div className='flex items-center gap-3' key={category.value}>
                  <input
                    type='checkbox'
                    name='category'
                    checked={selectCategory[category.value] || false}
                    value={category.value}
                    id={category.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category.value}>{category.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>
            Search Results: {loading ? "Loading..." : data.length}
          </p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {loading ? (
              <p>Loading products...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p className='text-slate-500'>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
