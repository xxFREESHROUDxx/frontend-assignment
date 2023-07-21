import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { ProductProvider } from './context/ProductContext';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import MyCart from './pages/MyCart';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <ProductProvider>
            <Navbar />
            <div id='App'>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path='/cart' element={<MyCart />} />
              </Routes>
            </div>
          </ProductProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
