
import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const context = useContext(Context);
    const navigate = useNavigate();
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            });

            const responseData = await response.json();
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error("Fetch Cart Error:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
        };
        loadData();
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };

    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            });

            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id })
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        for (const id of selectedItems) {
            await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: id })
            });
        }

        setSelectedItems([]);
        fetchData();
        context.fetchUserAddToCart();
        // navigate("/checkout");
        navigate("/checkout", { state: selectedData });
    };

    const selectedData = data.filter(item => selectedItems.includes(item._id));
    const totalQty = selectedData.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = selectedData.reduce((prev, curr) => prev + (curr.quantity * (curr?.productId?.sellingPrice || 0)), 0);

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* Product View */}
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={"loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded' />
                        ))
                    ) : (
                        data.map((product) => {
                            const productInfo = product?.productId;
                            return (
                                <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[32px,128px,1fr]'>
                                    {/* Checkbox */}
                                    <input
                                        type='checkbox'
                                        className='m-auto'
                                        checked={selectedItems.includes(product._id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedItems(prev => [...prev, product._id]);
                                            } else {
                                                setSelectedItems(prev => prev.filter(id => id !== product._id));
                                            }
                                        }}
                                    />

                                    {/* Image */}
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img
                                            src={productInfo?.productImage?.[0] || "/placeholder.png"}
                                            alt={productInfo?.productName || "Product"}
                                            className='w-full h-full object-scale-down mix-blend-multiply'
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className='px-4 py-2 relative'>
                                        <div
                                            className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                            onClick={() => deleteCartProduct(product?._id)}
                                        >
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{productInfo?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{productInfo?.category || "Unknown Category"}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(productInfo?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>
                                                {displayINRCurrency((productInfo?.sellingPrice || 0) * product?.quantity)}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button
                                                className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                                onClick={() => decraseQty(product?._id, product?.quantity)}
                                            >-</button>
                                            <span>{product?.quantity}</span>
                                            <button
                                                className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                                onClick={() => increaseQty(product?._id, product?.quantity)}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Summary */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse' />
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Chi tiết đơn hàng</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Số lượng</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Tổng tiền</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handleCheckout}>
                                Thanh toán
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
