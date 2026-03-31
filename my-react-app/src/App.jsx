import React, { lazy, Suspense } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import { Route, Router, Routes } from 'react-router-dom'
import PromoBanner from './Components/Header/PromoBanner'
import SiteFooter from './Components/Pages/Footer'
import ProductDetail from './Components/Product-Detail/ProductDetail'



const Home = lazy(() => import('./Components/Pages/Home'))
const MainCollection = lazy(() => import('./Components/Product-listing/MainCollection'))
const NewCollection = lazy(() => import('./Components/Product-listing/NewCollection'))
function App() {

  return (
    <>
      <PromoBanner />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path='/collections/new' element={<NewCollection />} />
          <Route path="/category/:category" element={<MainCollection />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path='*' element={<div className='min-h-screen flex justify-center items-center'>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </>
  )
}

export default App
