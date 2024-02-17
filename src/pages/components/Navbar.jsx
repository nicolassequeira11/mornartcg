import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import MenuIcon from "@mui/icons-material/Menu";
import { InputText } from "../../components/Inputs.jsx"; 
import { ModalLogin } from "../../components/Modals.jsx";
import { AcmeLogo } from "../../AcmeLogo.jsx";

const Nav = ({ cartQuantity, buttonClicked, handleSearch, productSearch, handleDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
    
  // Toggle isOpen for menu mobile
  const handleMenuClick = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  // Set isOpen when redirecting
  const handleMenuRedirect = () => {
    setIsOpen(false);
  }

  const menuItems = [
    { name: "INICIO", url: "/" },
    { name: "PRODUCTOS", url: "/products" },
    { name: "TORNEOS", url: "/tournaments" },
  ];

  return (
    <>
    <Navbar className="bg-black flex">
      {/* Logo */}
      <NavbarContent className="w-4/12">
        <div className="lg:hidden">
          <MenuIcon
            className="text-white cursor-pointer"
            onClick={handleMenuClick}
          />
        </div>
        <NavbarBrand>
          <Link href="/">
            <AcmeLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Search */}
      <NavbarContent
        className="lg:flex max-lg:hidden lg:w-4/12"
        justify="center"
      >
        <InputText
          type="search"
          variant="flat"
          id="inputSearch"
          className="text-white h-10 m-auto"
          label="Buscar"
          onChange={handleSearch}
        />
        <div
          className="bg-white absolute overflow-y-scroll w-[32%] h-[50vh] top-0 bottom-0 mt-14 hidden"
          id="contentSearch"
        >
          {/* Resultados de búsqueda */}
          {productSearch.map((item) => (
            <div
              key={item.id}
              className="flex border-b-1 cursor-pointer h-20 hover:bg-slate-50"
              onClick={() => handleDetails(item)}
            >
              <img src={item.img[0]} className="w-2/12 p-2 object-contain" />
              <p className="m-2 w-10/12">{item.name}</p>
            </div>
          ))}
        </div>
      </NavbarContent>

      {/* Links */}
      <NavbarContent className="m-auto gap-3 justify-center" justify="end">
        {/* Links de navegación */}
        {menuItems.map((item, index) => (
          <NavbarItem key={index} className="hidden sm:flex">
            <Link
              color="foreground"
              href={item.url}
              className="text-white hover:text-orange-500 mx-1"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}

        {/* Ícono del carrito */}
        <NavbarItem className="w-fit flex lg:me-3">
          <NavbarItem className="m-auto flex">
            <ModalLogin></ModalLogin>
          </NavbarItem>
          <Link href="/cart" className="text-white flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            <div>
              <span
                className={`text-xs bg-orange-600 absolute rounded-xl px-1 
                  ${buttonClicked ? "text-white font-bold" : "w-fit h-fit"}`}
              >
                {cartQuantity < 10 ? cartQuantity : "9+"}
              </span>
            </div>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div className={isOpen ? "sticky top-16 z-50 opacity-80 " : "hidden"}>
        <div className="absolute bg-black">
          {menuItems.map((item, index) => (
            <div key={index} className="mx-auto w-screen">
              <Link
                className="text-center flex justify-center my-5 text-white h-fit text-2xl"
                onClick={handleMenuRedirect}
                href={item.url}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Nav;
