import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { menuData } from "./MenuItems";
import { fetchCategories } from "../../Redux/Products/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const MenuDrawer = ({ open, onClose }) => {
  const [expanded, setExpanded] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Products.categories);
  useEffect(() => {
    if (open && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [open, categories.length, dispatch]);

  const menuWithCategories = menuData.map((item) => {
    if (item.label === "SHOP") {
      return {
        ...item,
        children: categories.length
          ? categories.map((cat) => ({
            label: cat.name,
            url: `/category/${cat.slug}`,
          }))
          : [],
      };
    }
    return item;
  });

  const toggleExpand = (path) => {
    setExpanded((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const renderMenu = (items, parentPath = "", level = 0) => (
    <ul>
      {items.map((item, idx) => {
        const path = parentPath + idx;
        const hasChildren = !!item.children && item.children.length > 0;
        const isOpen = expanded.includes(path);

        const fontSize =
          level === 0 ? "text-base" : level === 1 ? "text-sm" : "text-xs";
        const getPadding = (level) => {
          if (level === 1) return "pl-4";
          if (level === 2) return "pl-8";
          return "";
        };

        return (
          <li key={path}>
            <div
              className={`py-5 px-0 font-semibold font-serif ${fontSize} text-gray-700 uppercase transition ${getPadding(
                level
              )}`}
            >
              {hasChildren ? (
                <button
                  className="flex items-center justify-between w-full text-left no-underline focus:outline-none"
                  onClick={() => toggleExpand(path)}
                  aria-expanded={isOpen}
                  tabIndex={open ? 0 : -1}
                  type="button"
                  style={{ textDecoration: "none" }}
                >
                  <span>{item.label}</span>
                  <span className="ml-2 text-2xl text-gray-400 font-light">
                    {isOpen ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </button>
              ) : (
                <Link
                  to={item.url}
                  tabIndex={open ? 0 : -1}
                  className="w-full no-underline focus:outline-none "
                  onClick={onClose}

                >
                  {item.label}
                </Link>
              )}
            </div>
            {hasChildren && (
              <div
                className={`transition-all duration-300 overflow-hidden ${isOpen
                  ? "max-h-[calc(100vh-160px)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                  : "max-h-0"
                  }`}
              >
                <div>{renderMenu(item.children, path, level + 1)}</div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${open ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed h-full top-0 left-0 min-h-0 w-[90%] max-w-[500px] bg-white shadow-md transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-end px-8 py-6 border-b">
          <button onClick={onClose}>
            <CloseIcon fontSize="medium" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6 max-h-[calc(100vh-80px)] [&::-webkit-scrollbar]:hidden">
          <nav className="flex flex-col gap-0">
            {renderMenu(menuWithCategories)}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
