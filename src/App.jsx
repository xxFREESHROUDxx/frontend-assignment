import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { ProductProvider } from './context/ProductContext';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <Navbar />
          <div id='App'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductDetail />} />
            </Routes>
          </div>
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
