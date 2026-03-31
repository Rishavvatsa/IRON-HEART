import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
<section className="relative min-h-screen w-full flex items-end sm:items-center justify-center font-sans overflow-hidden">      {/* Background Image */}
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="https://ironheart.co.uk/cdn/shop/files/FW25_MOBILE.jpg?v=1749478230&width=1181"
        />
        <img
          src="https://ironheart.co.uk/cdn/shop/files/FW25_DESKTOP.jpg?v=1749478230&width=1500"
          alt="Hero"
          className="absolute inset-0  w-full h-full object-cover"
        />
      </picture>
      {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 "></div>     
         {/* Content */} 
      <div className="relative z-10 flex flex-col justify-self-center justify-center w-full sm:w-[70%] h-full px-4 py-4 sm:py-8 md:py-12 lg:py-16">
        <h2 className="text-white text-4xl  sm:text-3xl md:text-4xl font-medium mb-2 text-center sm:text-left ">
           FALL/WINTER 25 
        </h2>
        <p className="text-white text-2xl sm:text-xl mb-6 text-center sm:text-left">
          FOR EVERY ADVENTURE
        </p>
        <div className="w-full  sm:w-fit bg-transparent border border-white text-white px-5 py-2 flex justify-center  rounded font-semibold shadow hover:bg-white hover:text-black transition">  
          <Link to="/shop">VIEW NOW
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection