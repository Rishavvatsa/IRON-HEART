import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from "../../Redux/Products/ProductSlice";
import { Link, useParams } from 'react-router-dom';

const WAIST_SIZES = ['30', '32', '34', '36'];

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();

    const product = useSelector(state =>
        state.Products?.items?.find(p => (p.id) === parseInt(productId))
    ); console.log("Product from state:", product);
    const loading = useSelector(state => state.Products?.loading);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductById(productId));
            console.log("Fetching product with ID:", productId);
        }
    }, [dispatch, productId, product]);

    if (loading || !product) {
        return <div className="p-12 text-center">Loading...</div>;
    }

    const showWaistSize = product.category === 'pants' || product.category === 'mens-shirts';
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        console.log("Selected size:", size);
    }
    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12 bg-white">
            {/* Left: Image Gallery */}
            <div className="md:w-1/2 w-full flex flex-col items-center">
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,
                        pagination: true,
                        arrows: true,
                        width: '100%',
                        height: '400px',
                        keyboard: 'global',
                    }}
                    aria-label="Product Images"
                >
                    {(product.images ).map((img, idx) => (
                        <SplideSlide key={idx}>
                            <img
                                src={img}
                                alt={product.title}
                                className="object-contain w-full h-96 rounded shadow"
                            />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>

            {/* Right: Product Details */}
            <div className="md:w-1/2 w-full flex flex-col gap-4">
                <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                <div className="text-xl font-semibold text-gray-800">£{product.price}</div>
                <div className="text-sm text-gray-500 mb-2">{product.sku || product.id}</div>
                <p className="text-gray-700 mb-4">{product.description}</p>

                {showWaistSize && (
                    <div className="mb-4">
                        <label className=" font-medium mb-1 flex items-center justify-between">
                            <span>Waist: {selectedSize || 'Please select waist'}</span>
                            <Link to="#" className="text-blue-600 text-sm underline">Size Guide</Link>
                        </label>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                            {WAIST_SIZES.map((size) => (
                                <button
                                    key={size}
                                    className={`px-4 py-2 border rounded cursor-pointer
            ${selectedSize === size ? 'bg-gray-100 border-black font-bold' : 'bg-white border-gray-300'} 
            transition focus:outline-none`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className='flex justify-between gap-2'>
                    <button className="bg-black text-white py-2 px-24 rounded font-semibold mb-2 hover:bg-gray-800 transition cursor-pointer">Select variant</button>
                    <button className="border border-black py-2 px- rounded font-semibold mb-2 hover:bg-gray-100 transition cursor-pointer">Compare</button>
                </div>

                <div className="text-sm text-gray-600 mt-4">
                    <div>• {product.returnPolicy || "No quibble 28 day return policy"}</div>
                    <div>• Discuss on Forum</div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;