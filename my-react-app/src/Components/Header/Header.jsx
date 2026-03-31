import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { FiSearch } from "react-icons/fi";
import PersonOutlineIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "../../assets/logo-black.svg";
import logoWhite from "../../assets/logo-white.avif";
import { Link, useLocation } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/" ? true : false;
  const isTransparent = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
  const handleMenuToggle = () => {
    setIsMenuOpen((open) => !open);
  };

  return (
    <>
      <div
        className={`${isHomePage && !isScrolled ? "fixed " : "bg-white border-b sticky"
          } w-full  top-8 left-0 z-50 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Menu & Search Icon (mobile only) */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <button
                type="button"
                className="p-2 rounded"
                onClick={handleMenuToggle}
              >
                <MenuIcon
                  fontSize="medium"
                  className={isTransparent ? "text-white" : "text-black"}
                />
              </button>
              <button type="button" className="p-2 rounded block md:hidden">
                <FiSearch
                  fontSize="large"
                  className={isTransparent ? "text-white" : "text-black"}
                />
              </button>
            </div>
            {/* Center: Logo */}
            <div className="flex-1 flex justify-center items-center">
              <Link to="/">
                <img
                  className="h-8 sm:h-10 w-auto"
                  src={isTransparent ? logoWhite : logo}
                  alt="Logo"
                />
              </Link>
            </div>
            {/* Right: Profile & Cart */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
              {/* Search bar for desktop/tablet only */}
              <div className="relative hidden md:block ">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-4 pr-10 py-2 rounded-full border border-gray-300 bg-gray-100 outline-none w-56"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                  <FiSearch fontSize="small" />
                </span>
              </div>
              <Link to="/profile" className="p-2 rounded ">
                <PersonOutlineIcon
                  fontSize="medium"
                  className={isTransparent ? "text-white" : "text-black"}
                />
              </Link>
              <Link to="/cart" className="p-2 rounded ">
                <ShoppingCartOutlinedIcon
                  fontSize="medium"
                  className={isTransparent ? "text-white" : "text-black"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && <MenuDrawer open={isMenuOpen} onClose={handleMenuToggle} />}
    </>
  );
};

export default Header;
