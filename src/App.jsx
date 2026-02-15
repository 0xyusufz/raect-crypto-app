import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// components
import Header from './components/Header'


// pages
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Coins from './pages/Coins'
import CoinDetails from './pages/CoinDetails'


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/exchange' element={<Exchange />}/>
        <Route path='/coins' element={<Coins />}/>
        <Route path='/coin/:id' element={<CoinDetails />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
