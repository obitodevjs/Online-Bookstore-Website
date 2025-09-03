
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';

const AccountInfo = () => {
    const user = useSelector(state => state?.user?.user);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

    const formattedJoinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Ngày không hợp lệ";

    const handleUpdateProfile = async () => {
        try {
            const res = await fetch(SummaryApi.updateProfile.url, {
                method: SummaryApi.updateProfile.method,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // Ensure the user is authenticated via cookies
                body: JSON.stringify({ name, email }) // Send both name and email to the backend
            });

            const data = await res.json();
            if (res.ok) {
                alert("Cập nhật thông tin thành công!");
                setShowEditProfile(false);
                window.location.reload();
            } else {
                alert(data?.message || "Lỗi cập nhật thông tin người dùng.");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối khi cập nhật thông tin.");
        }
    };

    const handleChangePassword = async () => {
        try {
            const res = await fetch(SummaryApi.updatePassword.url, {
                method: SummaryApi.updatePassword.method,
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // Ensure the user is authenticated via cookies
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();
            if (res.ok) {
                alert("Đổi mật khẩu thành công!");
                setShowChangePassword(false);
                setCurrentPassword("");
                setNewPassword("");
            } else {
                alert(data?.message || "Lỗi đổi mật khẩu.");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối khi đổi mật khẩu.");
        }
    };

    if (!user) return <p>Không tìm thấy thông tin người dùng</p>;

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Thông tin tài khoản</h3>
            <p><strong>Họ tên:</strong> {user?.name || "Không có thông tin"}</p>
            <p><strong>Email:</strong> {user?.email || "Không có thông tin"}</p>
            <p><strong>Vai trò:</strong> {user?.role || "Không có thông tin"}</p>
            <p><strong>Ngày tham gia:</strong> {formattedJoinDate}</p>

            <div className="mt-4 space-x-2">
                <button onClick={() => setShowEditProfile(true)} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Cập nhật thông tin
                </button>
                <button onClick={() => setShowChangePassword(true)} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    Đổi mật khẩu
                </button>
            </div>

            {/* Cập nhật thông tin (Tên và Email) */}
            {showEditProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h4 className="text-lg font-semibold mb-2">Cập nhật thông tin</h4>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full mb-4"
                            placeholder="Tên mới"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mb-4"
                            placeholder="Email mới"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setShowEditProfile(false)} className="px-4 py-1 border rounded">Huỷ</button>
                            <button onClick={handleUpdateProfile} className="px-4 py-1 bg-blue-500 text-white rounded">Lưu</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Đổi mật khẩu */}
            {showChangePassword && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h4 className="text-lg font-semibold mb-2">Đổi mật khẩu</h4>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border p-2 w-full mb-2"
                            placeholder="Mật khẩu hiện tại"
                        />
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 w-full mb-4"
                            placeholder="Mật khẩu mới"
                        />
                        <div className="flex justify-between mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)} // Toggle visibility
                                    className="mr-2"
                                />
                                Hiển thị mật khẩu
                            </label>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setShowChangePassword(false)} className="px-4 py-1 border rounded">Huỷ</button>
                            <button onClick={handleChangePassword} className="px-4 py-1 bg-green-500 text-white rounded">Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountInfo;

