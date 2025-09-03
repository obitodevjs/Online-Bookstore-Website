import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Đặt hàng thành công!</h1>
            <p className="text-lg mb-6 text-center">
                Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng trong thời gian sớm nhất.
            </p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Quay về trang chủ
            </Link>
        </div>
    );
};

export default OrderSuccess;
