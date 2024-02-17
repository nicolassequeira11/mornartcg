import reactLogo from './assets/react.svg'
import './App.css'
import React, { useState, useEffect } from "react";
import { Route, Routes, HashRouter as BrowserRouter, useNavigate } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react';
import Alert from '@mui/material/Alert';
// Pages
import { Home } from "./pages/Home.jsx";
import { Products } from "./pages/Products.jsx";
import { Tournaments } from "./pages/Tournaments.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Details } from "./pages/Details.jsx";
// Components
import Nav from './pages/components/Navbar.jsx';
// Utils
import { handleAddToCart, handleButtonClick } from './utils/shopUtils.jsx';
import { handleSearch } from './utils/menuUtils.jsx';

export const App = () => {
  const [productSearch, setProductSearch] = useState([]);
  const [initialProductSearch, setInitialProductSearch] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(false);  
  const navigate = useNavigate();

  // Function to add products in the cart FROM utils/shopUtils.jsx
  const addToCart = (selectedProduct, quantity) => {
    handleAddToCart(selectedProduct, quantity, cartProducts, setCartProducts, setCartQuantity, handleAlert);
  }

  // Function to add effects in the buttons FROM utils/shopUtils.jsx
  const buttonClick = () => {
    handleButtonClick(setButtonClicked);
  }

  // Function to work with the search FROM utils/menuUtils.jsx
  const search = () => {
    handleSearch(productSearch, setProductSearch, initialProductSearch);
  }

  // Show alert
  const handleAlert = (type, message) => {
    setShowAlert(true);
    setAlert({ type, message });

    setTimeout(() => {
      setShowAlert(false);
      setAlert({ type: '', message: '' });
    }, 2000);
  }

  // Redirect to details
  const handleDetails = (product) => {
    setSelectedProduct(product);
    navigate("/details", { state: { selectedProduct: product } });
    contentSearch.classList.add("hidden");
  }

  // Format text
  const newText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Get cartQuantity from localStorage
  useEffect(() => {
    const savedCartQuantity = localStorage.getItem("cartQuantity");
    if (savedCartQuantity) {
      setCartQuantity(parseInt(savedCartQuantity));
    }
  }, []);
  
  // API to get products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/nicolassequeira11/APIS/main/mornartcg.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
  
        const allProducts = result.pokemon.concat(
          result.yugioh,
          result.digimon,
          result.onepiece,
          result.magic,
          result.fleshandblood
        );
    
        setProductSearch(allProducts);
        setInitialProductSearch(allProducts);
        setProducts(result)
  
      } catch (error) {
      } finally {
      }
    };
  
    fetchData();
  }, []);

  return (
    <NextUIProvider navigate={navigate}>

      {/* Alert */}
      {showAlert && (
        <div className="sticky top-20 z-10">
          <Alert 
            className={`absolute left-0 right-0 justify-center w-fit m-auto ${alert.type === "success" 
              ? "bg-green-400" : "bg-red-400"
            }`}
            severity={alert.type ===  "success" ? "success" : "error"} 
          >
            {alert.message}
          </Alert>
        </div>
      )}

      <Nav 
        cartQuantity={cartQuantity}
        buttonClicked={buttonClicked}
        handleSearch={search}
        productSearch={productSearch}
        handleDetails={handleDetails}
      />
      
      <Routes>
        <Route 
          path="/" 
          element={<Home 
            navigate={navigate} 
            handleButtonClick={buttonClick}
            buttonClicked={buttonClicked}
            setCartQuantity={setCartQuantity}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            handleAddToCart={addToCart}
            handleDetails={handleDetails}
            newText={newText}
        />} 
        />
        <Route 
          path="/products" 
          element={<Products 
            navigate={navigate}
            handleButtonClick={buttonClick}
            buttonClicked={buttonClicked}
            setCartQuantity={setCartQuantity}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            handleAddToCart={addToCart}
            handleDetails={handleDetails}
            newText={newText}
          />} 
        />
        <Route 
          path="/tournaments" 
          element={<Tournaments />} 
        />
        <Route 
          path="/cart" 
          element={<Cart setCartQuantity={setCartQuantity} />}       
        />
        <Route 
          path="/details" 
          element={<Details 
            selectedProduct={selectedProduct} 
            setCartQuantity={setCartQuantity} 
            buttonClicked={buttonClicked} 
            handleButtonClick={buttonClick}
            handleAddToCart={addToCart}
            handleDetails={handleDetails}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts} 
            products={products}
            setProducts={setProducts}
            newText={newText}
          />} 
        />
      </Routes>
    </NextUIProvider>
  );
}
