import React from "react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import logo from '../../assets/logo-black.svg';
import { Link } from "react-router-dom";

const linkColumns = [
  [
    { label: "ABOUT", url: "#" },
    { label: "OUTLET", url: "#" },
    { label: "STOCKISTS", url: "#" },
    { label: "FAQS", url: "#" },
  ],
  [
    { label: "SHIPPING", url: "#" },
    { label: "RETURN POLICY", url: "#" },
    { label: "TERMS", url: "#" },
    { label: "PROJECT RE:LOVE", url: "#" },
  ],
  [
    { label: "CONTACT", url: "#" },
    { label: "PRODUCT CARE", url: "#" },
    { label: "REPAIRS", url: "#" },
    { label: "PRIVACY SETTINGS", url: "#" },
  ],
];

const SiteFooter = () => (
  <footer className="bg-gray-100 pt-12 pb-6 font-sans">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center mb-8">
        <Link to="/" className="block w-[200px] h-8 relative">
          <img
            className="h-full w-full object-contain"
            src={logo}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white flex items-center justify-center py-4 rounded">
          <FaTiktok className="text-2xl mr-2" />
          <span className="font-medium">Follow us on TikTok</span>
        </div>
        <div className="bg-white flex items-center justify-center py-4 rounded">
          <FaInstagram className="text-2xl mr-2" />
          <span className="font-medium">Discover us on Instagram</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mb-8 text-sm text-gray-800">
        {linkColumns.map((col, idx) => (
          <ul key={idx} className="flex flex-col gap-2">
            {col.map((link, i) => (
              <li key={i}>
                <a href={link.url} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} IRON HEART. All rights reserved.
        &nbsp;|&nbsp; Developed by RK7
      </div>
    </div>
  </footer>
);

export default SiteFooter;