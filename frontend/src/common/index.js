const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    deleteProduct: {
        url: `${backendDomain}/api/delete-product`,
        method: "POST"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    countAddTodCartProduct: {
        url: `${backendDomain}/api/countAddTodCartProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
    createOrder: {
        url: `${backendDomain}/api/order`,
        method: "post"
    },
    getAllOrder: {
        url: `${backendDomain}/api/admin/orders`,
        method: "get"
    },
    getMyOrders: {
        url: `${backendDomain}/api/my-orders`,
        method: "get"
    },
    createVnpayUrl: {
        url: `${backendDomain}/api/payment/create-vnpay-url`,
        method: "post"
    },
    updateProfile: {
        url: `${backendDomain}/api/update-profile`,
        method: "put"
    },
    updatePassword: {
        url: `${backendDomain}/api/update-password`,
        method: "put"
    },
    deleteOrder: {
        url: `${backendDomain}/api/admin/orders/delete`, // Đường dẫn xóa đơn hàng
        method: "delete"
    },
    updateOrderStatus: {
        url: `${backendDomain}/api/admin/orders/update-status`, // Đường dẫn cập nhật trạng thái đơn hàng
        method: "put"
    },
    createZaloPayUrl: {
        url: `${backendDomain}/api/payment/zalopay`,
        method: 'POST'
    }
    // createVnpayUrl: {
    //     url: `${backendDomain}/api/order/create-vnpay-url`,
    //     method: "post"
    // },
    // vnpayReturn: {
    //     url: `${backendDomain}/api/order/vnpay-return`,
    //     method: "get"
    // }


}

export default SummaryApi