import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate, Outlet } from 'react-router-dom';  // Thêm Outlet vào đây
import ROLE from '../common/role';


const UserPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user?.role !== ROLE.GENERAL) {
            navigate("/"); // Nếu không phải người dùng bình thường, chuyển hướng về trang chủ
        }
    }, [user, navigate]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading user information...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-120px)] md:flex hidden">
            {/* Sidebar */}
            <aside className="bg-white min-h-full w-full max-w-60 customShadow">
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user?.name} />
                        ) : (
                            <FaRegCircleUser />
                        )}
                    </div>
                    <p className="capitalize text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm">{user?.role}</p>
                </div>

                {/* Navigation */}
                <div>
                    <nav className="grid p-4">
                        <Link to="account-info" className="px-2 py-1 hover:bg-slate-100">
                            Thông tin tài khoản
                        </Link>
                        <Link to="my-orders" className="px-2 py-1 hover:bg-slate-100">
                            Lịch sử mua hàng
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
            <main className="w-full h-full p-2">
                {/* Đây là nơi sẽ render các route con */}
                <Outlet />
            </main>
        </div>
    );
};

export default UserPanel;


// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ROLE from '../common/role';
// import AccountInfo from '../components/AccountInfo';

// const UserPanel = () => {
//     const user = useSelector(state => state?.user?.user);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user && user?.role !== ROLE.GENERAL) {
//             navigate("/");
//         }
//     }, [user, navigate]);

//     console.log("User info:", user); // Debugging line to check the user object

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-gray-500 text-lg">Loading user information...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="container mx-auto p-4">
//                 <div className="flex flex-col md:flex-row gap-8">
//                     {/* Thông tin tài khoản */}
//                     <div className="md:w-1/3 w-full bg-white p-4 rounded-lg shadow-md">
//                         <AccountInfo user={user} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserPanel;
