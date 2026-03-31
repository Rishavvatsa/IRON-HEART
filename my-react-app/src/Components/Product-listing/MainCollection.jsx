import React, { useEffect, useMemo, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ProductCard from "../Product-Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsbyCategories } from "../../Redux/Products/ProductSlice";
import { useParams } from "react-router-dom";
import CollectionFilters from "../Snippets/Collection-Filter";
import CollectionSort from "../Snippets/CollectionSort";
import collectionBanners from "../../Data/CollectionBanner";

const MainCollection = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const bannerImages = useMemo(() => {
    return collectionBanners[category] || collectionBanners?.default;
  }, [category]);
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.Products);
  console.log(products);

  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsbyCategories(category));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, category]);

  const getFilteredSortedProducts = () => {
    let filtered = [...products];
    if (filterValue === "in")
      filtered = filtered.filter(
        (p) => (p.quantity ?? p.rating?.count ?? 1) > 0
      );
    else if (filterValue === "out")
      filtered = filtered.filter(
        (p) => (p.quantity ?? p.rating?.count ?? 1) < 1
      );

    if (sortValue === "price-asc")
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sortValue === "price-desc")
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    else if (sortValue === "name-asc")
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortValue === "name-desc")
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  };
  const handleUpdateFilters = (newFilters) => {
    setFilterValue(newFilters);
  };

  const handleUpdateSort = (newSort) => {
    setSortValue(newSort);
  };


  return (
    <div className="max-w-full min-h-screen bg-white pt-8 sticky">
      <div className="w-full  bg-[#f7f7f7] relative top-6 ">
        {/* Banner */}
        <div className="relative w-full top-0 ">

          <img
            src={bannerImages.image || collectionBanners?.default?.image}
            alt="Collection Banner"
            className="w-full max-h-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-12 pb-8">
            <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg uppercase">
              {bannerImages.title}
            </h1>
            <span className="block text-white text-lg font-semibold mt-2">
              {bannerImages.description}
            </span>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="sticky top-0 z-20 bg-white ">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
            <CollectionFilters
              filterValue={filterValue}
              onUpdate={handleUpdateFilters}
            />
            <CollectionSort sortValue={sortValue} onUpdate={handleUpdateSort} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex justify-center w-full min-h-[60vh]">
          <div className="w-full max-w-7xl">
            {loading ? (
              <div className="p-8 text-center">Loading...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">Error: {error}</div>
            ) : getFilteredSortedProducts().length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-white rounded-lg shadow-sm">
                {getFilteredSortedProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-body-s-bold p-8 text-center">
                No results found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCollection;
