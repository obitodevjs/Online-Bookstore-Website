// import { BrowserRouter } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Checkout from "../pages/Checkout";
import AllOrders from "../components/AllOrders";
import OrderHistory from "../components/OrderHistory";
import OrderSuccess from "../pages/OrderSuccess";
import UserPanel from "../pages/UserPanel";
import AccountInfo from "../components/AccountInfo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "checkout", // ✅ Thêm dòng này
                element: <Checkout />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "/order-success",
                element: < OrderSuccess />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                    ,
                    {
                        path: "all-orders",
                        element: <AllOrders />
                    }

                ]
            },
            {
                path: "user-panel",
                element: <UserPanel />,
                children: [
                    {
                        path: "account-info",
                        element: <AccountInfo />
                    },
                    {
                        path: "my-orders",
                        element: <OrderHistory />
                    }
                ]
            },
        ]
    }
])

export default router;
