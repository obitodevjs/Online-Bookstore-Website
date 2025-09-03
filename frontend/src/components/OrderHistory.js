
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import moment from 'moment';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchMyOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getMyOrders.url, {
        method: SummaryApi.getMyOrders.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Fetch User Orders Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Lịch sử đặt hàng</h2>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2">Stt</th>
                <th className="px-4 py-2 text-left">Mã đơn</th>
                <th className="px-4 py-2 text-left">Tổng tiền</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Ngày mua</th>
                <th className="px-4 py-2 text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2 text-blue-600">{displayINRCurrency(order.totalAmount)}</td>
                  <td className="px-4 py-2 capitalize">{order.status}</td>
                  <td className="px-4 py-2">{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-500 hover:underline"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>

            <p><strong>Mã đơn:</strong> {selectedOrder._id}</p>
            <p><strong>Ngày mua:</strong> {moment(selectedOrder.createdAt).format('DD/MM/YYYY HH:mm')}</p>
            <p><strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}</p>
            <p><strong>Phí vận chuyển:</strong> {displayINRCurrency(selectedOrder.shippingFee)}</p>
            <p><strong>Tổng thanh toán:</strong> {displayINRCurrency(selectedOrder.totalAmount)}</p>
            <p><strong>Trạng thái:</strong> <span className="capitalize">{selectedOrder.status}</span></p>

            <div className="mt-4">
              <p className="font-semibold mb-2">Sản phẩm:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {selectedOrder.products.map((item, idx) => (
                  <li key={idx}>
                    {item?.productId?.productName} x {item.quantity} — {displayINRCurrency(item?.productId?.sellingPrice * item.quantity)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
