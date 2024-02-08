import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, {useState} from "react";
import {Route, Routes, HashRouter as BrowserRouter, useNavigate } from "react-router-dom";
import {NextUIProvider} from '@nextui-org/react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import InputText from "./components/Inputs.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Tournaments from "./pages/Tournaments.jsx";
import Cart from "./components/Cart.jsx";
import Details from "./pages/Details.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {"name":"INICIO", "url": "/"},
    {"name":"PRODUCTOS", "url": "/products"},
    {"name":"TORNEOS", "url": "/tournaments"}
  ];

  return (
    <NextUIProvider navigate={navigate}>
      <Navbar className="bg-black flex" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="w-fit">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
          <NavbarBrand className="">
            <AcmeLogo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-3 w-2/4" justify="center">
          <NavbarItem>
            <Link 
              color="foreground" 
              href="/" 
              className="text-white hover:text-orange-500 mx-2"
            >
              INICIO
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/products" 
              aria-current="page" 
              className="text-white hover:text-orange-500 mx-2"
            >
              PRODUCTOS
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              color="foreground" 
              href="/tournaments" 
              className="text-white hover:text-orange-500 mx-2"
            >
              TORNEOS
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="flex m-auto justify-center" justify="end">
          <InputText 
            type="search"
            variant="flat"
            className="text-white h-10 m-auto"
            label="Buscar"
          />
          <NavbarItem className="w-fit">
            <Link href="/cart" className="text-white flex">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 hover:text-orange-500"
              > 
                <path 
                  d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" 
                />
              </svg>
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
        <Route path="/" element={<Home navigate={navigate} />} />
        <Route path="/products" element={<Products navigate={navigate} />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<Details selectedProduct={selectedProduct} />} />
      </Routes>
    </NextUIProvider>
  );
}
