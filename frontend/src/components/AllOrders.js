
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import moment from 'moment';
import { toast } from 'react-toastify';

const AllOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch đơn hàng từ backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getAllOrder.url, {
        method: SummaryApi.getAllOrder.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setOrders(dataResponse.orders);
      }
    } catch (error) {
      console.error('Fetch Orders Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa đơn hàng
  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${SummaryApi.deleteOrder.url}/${orderId}`, {
        method: SummaryApi.deleteOrder.method,
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success) {
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success("Xóa đơn hàng thành công!");  // ✅ Toast thành công
      } else {
        toast.error("Xóa đơn hàng thất bại. Vui lòng thử lại.");  // ❌ Toast thất bại
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error("Đã xảy ra lỗi khi xóa đơn hàng.");  // ❌ Toast lỗi
    }
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderStatus.url}/${orderId}`, {
        method: SummaryApi.updateOrderStatus.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        console.log('Error updating order status:', data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Tất cả đơn hàng</h1>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2">Stt</th>
                <th className="px-4 py-2 text-left">Mã đơn</th>
                <th className="px-4 py-2 text-left">Khách hàng</th>
                <th className="px-4 py-2 text-left">Tổng tiền</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Ngày mua</th>
                <th className="px-4 py-2 text-center">Chi tiết</th>
                <th className="px-4 py-2 text-center">Xóa</th> {/* Nút Xóa luôn hiển thị */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.shippingAddress?.name}</td>
                  <td className="px-4 py-2 text-blue-600">{displayINRCurrency(order.totalAmount)}</td>
                  <td className="px-4 py-2 capitalize">
                    <div className="flex items-center justify-between">
                      <span>{order.status}</span>
                      {/* Nếu muốn cho phép admin thay đổi trạng thái */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-2">{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-500 hover:underline"
                    >
                      Xem
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:underline"
                    >
                      Xóa
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
            <p><strong>Khách hàng:</strong> {selectedOrder.shippingAddress?.name}</p>
            <p><strong>SĐT:</strong> {selectedOrder.shippingAddress?.phone}</p>
            <p><strong>Địa chỉ:</strong> {`${selectedOrder.shippingAddress?.address}, ${selectedOrder.shippingAddress?.ward}, ${selectedOrder.shippingAddress?.district}, ${selectedOrder.shippingAddress?.city}`}</p>
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

export default AllOrders;
