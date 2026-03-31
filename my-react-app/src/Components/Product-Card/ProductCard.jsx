import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const ProductBadges = ({ brand }) => (
  <div className="absolute left-0 top-3 z-10 flex flex-col gap-1">
    {brand && (
      <span className="bg-red-700 text-white text-xs px-2 py-1 rounded">
        {brand}
      </span>
    )}
  </div>
);

const ProductCard = ({ product, disablePurchase = false }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);

  const stock = product.quantity ?? product.stock ?? 0;
  const StockMessage = stock < 1 ? "Out of Stock" : " ";

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(Number(e.target.value), stock));
    setQuantity(value);
  };

  const ProductImage = hovered && product.images && product.images.length > 1
    ? product.images[1]
    : product.thumbnail;

  return (
    <>
      <Link to={`/products/${product.id}`}>
        <div className="bg-white flex flex-col relative overflow-visible group cursor-pointer"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {/* Image & Badges */}
          <div className="relative overflow-hidden">
            <ProductBadges brand={product.brand} />
            <span className="block w-full h-64 bg-gray-300">
              <img
                src={ProductImage}
                alt={product.title}
                className="w-full aspect-4/5 object-cover"
                loading="lazy"
              />
            </span>


            {/* Quickview/Add button */}
            {!showQuickView && !disablePurchase && (
              <button
                className="absolute bottom-2 right-2 bg-white border p-1 shadow transition hover:bg-gray-100 z-10"
                aria-label="Quick view"
                onClick={() => setShowQuickView(true)}
                type="button"
              >
                <AddIcon fontSize="medium" />
              </button>
            )}

            {/* Quick View with Quantity Selector */}
            {showQuickView && (
              <div className="absolute bottom-0 w-full bg-white px-2 pb-2 pt-3 flex flex-col items-center z-10 gap-4">
                <button
                  className="bg-white border p-1 shadow hover:bg-gray-100 z-20 flex self-end"
                  onClick={() => setShowQuickView(false)}
                  aria-label="Close"
                >
                  <CloseIcon fontSize="medium" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <label htmlFor={`qty-${product.id}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    id={`qty-${product.id}`}
                    type="number"
                    min={1}
                    max={stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border rounded px-2 py-1 w-16 text-center"
                    disabled={stock < 1}
                  />
                  <span className="text-xs text-gray-500">/ {stock} in stock</span>
                </div>
                <button
                  className={`w-full py-2 rounded font-semibold ${stock > 0
                    ? "bg-black text-white cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  disabled={stock < 1}
                  onClick={() => {
                    setShowQuickView(false);
                    setQuantity(1);

                  }}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col px-2 pb-3 pt-2">
            <span className="no-underline ">
              <p className="text-sm font-semibold text-[#333] mb-1 leading-tight line-clamp-2">
                {product.title}
              </p>
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {product.sku && <span>{product.sku}</span>}
              {product.sku && product.price && <span>-</span>}
              {product.price && <span>${product.price}</span>}
              <span
                className={`${stock < 1 ? "text-red-500" : "text-blue-500"
                  } ml-1`}
              >
                {StockMessage}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;