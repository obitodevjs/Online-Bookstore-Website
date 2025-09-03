
import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Select from 'react-select';

const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#f1f5f9', // bg-slate-100
        borderColor: state.isFocused ? '#ef4444' : '#e5e7eb', // red-500 or gray-200
        borderRadius: '0.375rem',
        padding: '2px',
        boxShadow: state.isFocused ? '0 0 0 1px #ef4444' : null,
        '&:hover': {
            borderColor: '#ef4444',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
            ? '#fee2e2' // hover red-100
            : state.isSelected
                ? '#ef4444'
                : '#fff',
        color: state.isSelected ? '#fff' : '#111827',
        padding: 10,
        cursor: 'pointer',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#f87171',
        color: '#fff',
        borderRadius: '0.375rem',
        padding: '2px 6px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#fff',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#fff',
        ':hover': {
            backgroundColor: '#dc2626',
            color: '#fff',
        },
    }),
};

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        author: "",
        category: [],
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: [...newProductImage]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData?.message);
            onClose();
            fetchData();
        }

        if (responseData.error) {
            toast.error(responseData?.message);
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Thêm Sản Phẩm</h2>
                    <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Tên Sản Phẩm:</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Nhập tên sản phẩm'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='author' className='mt-3'>Tác Giả:</label>
                    <input
                        type='text'
                        id='author'
                        placeholder='Nhập tác giả'
                        name='author'
                        value={data.author}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'>Danh Muc:</label>
                    <Select
                        isMulti
                        name="category"
                        options={productCategory.map(el => ({
                            value: el.value,
                            label: el.label
                        }))}
                        styles={customSelectStyles}
                        value={productCategory.filter(opt => data.category.includes(opt.value))}
                        onChange={(selectedOptions) => {
                            const values = selectedOptions.map(option => option.value);
                            setData(prev => ({
                                ...prev,
                                category: values
                            }));
                        }}
                    />

                    <label htmlFor='productImage' className='mt-3'>Ảnh Sản Phẩm :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex flex-col items-center gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Tải ảnh sản phẩm lên</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>

                    <div className='flex gap-2 flex-wrap'>
                        {data.productImage.length > 0 ? data.productImage.map((img, index) => (
                            <div className='relative group' key={img}>
                                <img
                                    src={img}
                                    alt="product"
                                    className='w-20 h-20 object-cover bg-slate-100 border cursor-pointer'
                                    onClick={() => {
                                        setFullScreenImage(img);
                                        setOpenFullScreenImage(true);
                                    }}
                                />
                                <div
                                    className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                    onClick={() => handleDeleteProductImage(index)}
                                >
                                    <MdDelete />
                                </div>
                            </div>
                        )) : (
                            <p className='text-red-600 text-xs'>*Vui lòng thêm ảnh sản phẩm</p>
                        )}
                    </div>

                    <label htmlFor='price' className='mt-3'>Giá :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Nhập giá'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='sellingPrice' className='mt-3'>Giá Bán :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Nhập giá bán'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-3'>Mô Tả :</label>
                    <textarea
                        id='description'
                        placeholder='Nhập mô tả sản phảm'
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                        className='h-28 bg-slate-100 border resize-none p-2 rounded'
                        rows={3}
                    />

                    <button type='submit' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>
                        Thêm Sản Phẩm
                    </button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
};

export default UploadProduct;
