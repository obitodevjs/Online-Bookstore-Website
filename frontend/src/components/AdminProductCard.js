import { MdModeEditOutline, MdDelete } from "react-icons/md";
import React, { useState } from "react";
import AdminEditProduct from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: data._id }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Xóa sản phẩm thành công!");
        fetchdata();
      } else {
        alert("Lỗi khi xóa: " + result.message);
      }
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      alert("Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow h-full flex flex-col justify-between min-h-[240px]">
        {/* Nội dung sản phẩm */}
        <div className="flex flex-col items-center space-y-2 flex-grow">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              src={data?.productImage[0]}
              alt={data.productName}
              className="object-contain w-full h-full"
            />
          </div>

          <h2 className="font-semibold text-sm text-center line-clamp-2">
            {data.productName}
          </h2>

          <p className="text-green-600 font-bold text-sm text-center">
            {displayVNDCurrency(data.sellingPrice)}
          </p>
        </div>

        {/* Nút thao tác */}
        <div className="flex justify-between items-center mt-3">
          <button
            className="p-2 bg-green-100 hover:bg-green-600 text-green-700 hover:text-white rounded-full transition-colors"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </button>

          <button
            className="p-2 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-full transition-colors"
            onClick={handleDelete}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
