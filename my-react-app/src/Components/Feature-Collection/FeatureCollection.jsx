import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import AddIcon from "@mui/icons-material/Add";
import { collections } from "./Collection";
import { Link } from "react-router-dom";

const splideOptions = {
  type: "loop",
  perPage: 3,
  gap: "1.5rem",
  arrows: true,
  pagination: false,
  breakpoints: {
    1440: { perPage: 3 },
    1200: { perPage: 2 },
    900: { perPage: 1 },
  },
};

const FeatureCollection = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 font-serif">
    <h2 className="text-center font-bold text-3xl mb-10 tracking-wide">
      OUR CORE CUTS
    </h2>
    <div className="relative">
      <Splide options={splideOptions} aria-label="Core Cuts Collection">
        {collections.map((item, idx) => (
          <SplideSlide key={idx}>
            <Link
              to={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="relative bg-white overflow-hidden transition-transform duration-300">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full max-w-xs mx-auto"
                  style={{ aspectRatio: "4/5", objectFit: "cover" }}
                />
                <div className="w-full mt-6">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {item.description}
                  </p>
                  <span className="text-sm font-medium text-gray-900 flex items-center hover:underline">
                    {item.linkText}
                    <span className="ml-1 text-lg font-bold">
                      <AddIcon fontSize="small" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  </div>
);

export default FeatureCollection;