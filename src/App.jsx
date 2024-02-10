import reactLogo from './assets/react.svg'
import './App.css'

import React, {useState, useEffect} from "react";
import {Route, Routes, HashRouter as BrowserRouter, useNavigate } from "react-router-dom";
import {NextUIProvider} from '@nextui-org/react';
// Navbar
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem
} from "@nextui-org/react";
// Modal
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "@nextui-org/react";

import {AcmeLogo} from "./AcmeLogo.jsx";
import InputText from "./components/Inputs.jsx";
import { ModalLogin } from './components/Modals.jsx';

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Tournaments from "./pages/Tournaments.jsx";
import Cart from "./pages/Cart.jsx";
import Details from "./pages/Details.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {"name":"INICIO", "url": "/"},
    {"name":"PRODUCTOS", "url": "/products"},
    {"name":"TORNEOS", "url": "/tournaments"}
  ];

  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 1500);
  } 

  const handleSearch = () => {
    
  }

  const handleAddToCart = (selectedProduct, quantity) => {
    const newItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      img: selectedProduct.img[0],
      stock: selectedProduct.stock,
      quantity: quantity,
    };
  
    // Verificar si el producto ya existe en el carrito
    const updatedCartProducts = cartProducts.map(product => {
      if (product.id === newItem.id && (product.quantity + newItem.quantity <= selectedProduct.stock)) {
        // Si el producto ya existe, aumentar la cantidad
        return {
          ...product,
          quantity: product.quantity + quantity
        };
      } 
      return product;
    });
  
    // Si el producto no existe en el carrito, agregarlo
    if (!updatedCartProducts.some(product => product.id === newItem.id)) {
      updatedCartProducts.push(newItem);
    }

    setCartQuantity(updatedCartProducts.length);
    localStorage.setItem("cartQuantity", updatedCartProducts.length);
  
    setCartProducts(updatedCartProducts);
    localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
  };

  useEffect(() => {
    const savedCartQuantity = localStorage.getItem("cartQuantity");
    if (savedCartQuantity) {
      setCartQuantity(parseInt(savedCartQuantity));
    }
  }, []);

  return (
    <NextUIProvider navigate={navigate}>
      <Navbar className="bg-black flex" onMenuOpenChange={setIsMenuOpen}>
        
        <NavbarContent className="w-4/12">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
          <NavbarBrand>
            <Link href="/">
              <AcmeLogo />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="lg:flex max-lg:hidden lg:w-4/12" justify="center">
          <InputText 
            type="search"
            variant="flat"
            className="text-white h-10 m-auto"
            label="Buscar"
          />
        </NavbarContent>
        <NavbarContent className="m-auto gap-3 justify-center" justify="end">
          <NavbarItem className="hidden sm:flex">
            <Link 
              color="foreground" 
              href="/" 
              className="text-white hover:text-orange-500 mx-1"
            >
              INICIO
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Link 
              href="/products" 
              aria-current="page" 
              className="text-white hover:text-orange-500 mx-1"
            >
              PRODUCTOS
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Link 
              color="foreground" 
              href="/tournaments" 
              className="text-white hover:text-orange-500 mx-1"
            >
              TORNEOS
            </Link>
          </NavbarItem>
          <NavbarItem className="w-fit flex lg:me-3">
            <ModalLogin></ModalLogin>
            <Link href="/cart" className="text-white flex">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
              > 
                <path 
                  d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" 
                />
              </svg>
              <div>
                <span className={buttonClicked ? "text-white absolute font-bold bg-orange-600 px-1 text-xs rounded-xl" : "absolute w-fit h-fit text-xs bg-orange-600 px-1 rounded-xl"}>
                  {cartQuantity < 10 ? cartQuantity : "9+"}
                </span>
              </div>

            </Link>
          </NavbarItem>
          <NavbarItem>
          
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="bg-black pt-4 w-2/4">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full text-white my-2"
                href={item.url}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <Routes>
        <Route 
          path="/" 
          element={<Home 
            navigate={navigate} 
            handleButtonClick={handleButtonClick}
            buttonClicked={buttonClicked}
            setCartQuantity={setCartQuantity}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            handleAddToCart={handleAddToCart}
        />} 
        />
        <Route 
          path="/products" 
          element={<Products 
            navigate={navigate}
            handleButtonClick={handleButtonClick}
            buttonClicked={buttonClicked}
            setCartQuantity={setCartQuantity}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            handleAddToCart={handleAddToCart}
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
            handleButtonClick={handleButtonClick}
            handleAddToCart={handleAddToCart}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts} 
          />} 
        />
      </Routes>
    </NextUIProvider>
  );
}
