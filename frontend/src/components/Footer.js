
import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Về chúng tôi */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Về Chúng Tôi</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Website giới thiệu các cuốn sách phát triển bản thân giúp bạn cải thiện cuộc sống và sự nghiệp một cách tích cực.
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Liên Kết</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600 transition">Trang Chủ</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">Giới Thiệu</a></li>
            <li><a href="/books" className="hover:text-blue-600 transition">Sách</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Liên Hệ</a></li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Liên Hệ</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: <a href="mailto:info@example.com" className="hover:underline">info@example.com</a></li>
            <li>Điện thoại: 0123 456 789</li>
            <li>Địa chỉ: TP. Hồ Chí Minh</li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Theo Dõi Chúng Tôi</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-blue-600 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-pink-500 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-700 transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-4">
        © 2025 Được thiết kế bởi <span className="font-semibold text-gray-700">Tấn Tín</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
