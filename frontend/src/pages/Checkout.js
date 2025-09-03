
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedData = location.state || [];

    const [cartItems, setCartItems] = useState(selectedData);
    const [shipping, setShipping] = useState({
        name: '',
        phone: '',
        city: '',
        district: '',
        ward: '',
        address: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);

    const shippingFee = shipping.city.toLowerCase().includes("hồ chí minh") ? 0 : 30000;
    const totalProductPrice = cartItems.reduce((prev, curr) => prev + (curr.quantity * (curr.productId.sellingPrice || 0)), 0);
    const totalAmount = totalProductPrice + shippingFee;

    useEffect(() => {
        if (!selectedData || selectedData.length === 0) {
            alert("Không có sản phẩm nào để thanh toán.");
            navigate("/cart");
        }
    }, [selectedData, navigate]);

    const handleOrder = async () => {
        try {
            setLoading(true);

            const orderPayload = {
                products: cartItems.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                shippingAddress: shipping,
                paymentMethod,
                shippingFee,
                totalAmount
            };

            const res = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const json = await res.json();
            if (!json.success || !json.order || !json.order._id) {
                alert("Đặt hàng thất bại.");
                return;
            }

            const order = json.order;

            if (paymentMethod === 'zalopay') {
                const zaloRes = await fetch(SummaryApi.createZaloPayUrl.url, {
                    method: SummaryApi.createZaloPayUrl.method,
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: order._id })
                });

                const zaloJson = await zaloRes.json();

                if (zaloJson.success && zaloJson.order_url) {
                    window.location.href = zaloJson.order_url;
                    return;
                } else {
                    alert("Không thể tạo liên kết ZaloPay.");
                    console.error("ZaloPay error:", zaloJson);
                }
            }

            if (paymentMethod === 'bank') {
                const vnpayRes = await fetch(SummaryApi.createVnpayUrl.url, {
                    method: SummaryApi.createVnpayUrl.method,
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: order._id, amount: totalAmount })
                });

                const vnpayJson = await vnpayRes.json();
                if (vnpayJson.success && vnpayJson.url) {
                    window.location.href = vnpayJson.url;
                    return;
                } else {
                    alert("Không thể tạo liên kết VNPay.");
                }
            }

            alert("Đặt hàng thành công!");
            navigate("/order-success");

        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
            alert("Đã xảy ra lỗi khi đặt hàng.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
            {/* Thông tin giao hàng */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
                <input value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} placeholder="Tên người nhận" className="w-full border p-2 my-1" />
                <input value={shipping.phone} onChange={e => setShipping({ ...shipping, phone: e.target.value })} placeholder="Số điện thoại" className="w-full border p-2 my-1" />
                <select onChange={e => setShipping({ ...shipping, city: e.target.value })} className="w-full border p-2 my-1">
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
                <input value={shipping.district} onChange={e => setShipping({ ...shipping, district: e.target.value })} placeholder="Quận/Huyện" className="w-full border p-2 my-1" />
                <input value={shipping.ward} onChange={e => setShipping({ ...shipping, ward: e.target.value })} placeholder="Phường/Xã" className="w-full border p-2 my-1" />
                <input value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} placeholder="Địa chỉ cụ thể" className="w-full border p-2 my-1" />

                <h3 className="mt-4 font-semibold">Phương thức thanh toán</h3>
                <div className="space-2 flex items-center space-x-4">
                    <label><input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> COD</label>
                    {/* <label><input type="radio" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} /> Chuyển khoản (VNPay)</label> */}
                    <label><input type="radio" checked={paymentMethod === 'zalopay'} onChange={() => setPaymentMethod('zalopay')} /> ZaloPay</label>
                </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
                <div className="flex justify-between py-1"><span>Tổng tiền hàng:</span><span>{displayINRCurrency(totalProductPrice)}</span></div>
                <div className="flex justify-between py-1"><span>Phí vận chuyển:</span><span>{displayINRCurrency(shippingFee)}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg"><span>Tổng thanh toán:</span><span>{displayINRCurrency(totalAmount)}</span></div>
                <button disabled={loading} onClick={handleOrder} className="mt-4 bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
                    {loading ? "Đang xử lý..." : "Đặt hàng"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
