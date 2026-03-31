import React from 'react'
import HeroSection from '../HeroSection/HeroSection'
import DualImageBanner from '../Dual-Image-Banner/DualImageBanner'
import { banners } from '../../Data/BannerItem'
import FeatureCollection from '../Feature-Collection/FeatureCollection'
const Home = () => {
  return (
    <div>
      <HeroSection />
      <DualImageBanner banners={banners} />
      <FeatureCollection />
    </div>
  )
}

export default Home