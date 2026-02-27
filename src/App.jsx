import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// components
import Header from './components/Header'


// pages
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Coins from './pages/Coins'
import CoinDetails from './pages/CoinDetails'
import Footer from './components/Footer'


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/exchange' element={<Exchange />}/>
        <Route path='/coins' element={<Coins />}/>
        <Route path='/coins/:id' element={<CoinDetails />}/>
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App


export const server = `https://api.coingecko.com/api/v3`