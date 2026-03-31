import React, { useEffect, useState } from 'react'
const Promo=[
    "Fall/Winter 2025 Preview Collection",
    "FREE WORLDWIDE* SHIPPING",
    "Black Friday Sale - 70% OFF",

]
const PromoBanner = () => {
    const[index,setIndex]=useState(0);
    const Message=Promo[index];
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % Promo.length);
        }
        , 2000); 
        return () => clearInterval(interval);

    },[]);


  return (
        <div className="w-full bg-black text-white text-center text-xs sm:text-sm py-2 px-2 fixed top-0 left-0 z-50 underline">
            {Message}
        </div>
  )
}

export default PromoBanner