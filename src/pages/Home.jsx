import React, { useState, useEffect } from "react";
import { CarouselHome, CarouselGallery } from "../components/Carousel";
import { Cardproduct } from "../components/Card-product";
import { ButtonCard } from "../components/Buttons";
import Alert from '@mui/material/Alert';
import { Footer } from "./components/Footer";

// Banner Tournaments
import imgTournament1 from "../media/pokemon-tournament.png";
import imgTournament2 from "../media/onepiece-tournament.png";
import imgTournament3 from "../media/magic-tournament.png";
import imgTournament4 from "../media/yugioh-tournament.png";
import imgTournament5 from "../media/digimon-tournament.png";
import imgTournament6 from "../media/flesh-tournament.png";

// Banner Home
import Banner1 from "../media/banner-1.png";
import Banner2 from "../media/banner-2.png";
import Banner3 from "../media/banner-3.jpg";
import Banner4 from "../media/banner-4.jpg";
import Banner5 from "../media/banner-5.jpg";
import Banner6 from "../media/banner-6.png";
import BannerMobile1 from "../media/banner-mobile-1.png";
import BannerMobile2 from "../media/banner-mobile-2.png";
import BannerMobile3 from "../media/banner-mobile-3.jpg";
import BannerMobile4 from "../media/banner-mobile-4.jpg";
import BannerMobile5 from "../media/banner-mobile-5.jpg";
import BannerMobile6 from "../media/banner-mobile-6.png";

export const Home = ({ newText, handleButtonClick, buttonClicked, handleAddToCart, setCartProducts, handleDetails}) => {
  const [pokemonProducts, setPokemonProducts] = useState([]);
  const [digimonProducts, setDigimonProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const banners = [
    {"img":Banner1}, 
    {"img":Banner2},  
    {"img":Banner3}, 
    {"img":Banner4}, 
    {"img":Banner5}, 
    {"img":Banner6}
  ];

  const bannersMobile = [
    {"img":BannerMobile1}, 
    {"img":BannerMobile2},  
    {"img":BannerMobile3}, 
    {"img":BannerMobile4}, 
    {"img":BannerMobile5}, 
    {"img":BannerMobile6}
  ]

  const brands = [
    {
      "name": "Pokémon",
      "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/2560px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png"
    },
    {
      "name": "One Piece",
      "img": "https://gatheringgames.co.uk/cdn/shop/products/one-piece-card-game-double-pack-set-vol3-dp-03-656563.png?v=1696594990"
    },
    {
      "name": "Magic",
      "img": "https://logos-world.net/wp-content/uploads/2023/05/Magic-The-Gathering-Logo.jpg"
    },
    {
      "name": "Yugioh",
      "img": "https://img.konami.com/kde_cms/eu_publish/uploads/EN-and-DE-Resized.png"
    },
    {
      "name": "Digimon",
      "img": "https://magicomens.com/cdn/shop/collections/digimon-trading-card-game-zagreb-croatia.png?v=1634587142"
    },
    {
      "name": "Flesh and blood",
      "img": "https://h5m3s5t5.rocketcdn.me/wp-content/uploads/2022/04/flesh-and-blood.png"
    }
  ];

  const adversiting = [
    {
      "img": "https://en.digimoncard.com/images/products/deck/st-15/bnr.jpg?02"
    },
    {
      "img": "https://en.digimoncard.com/images/products/pack/rb-01/bnr.jpg?01"
    },
    {
      "img": "https://world.digimoncard.com/images/news/001/bnr.jpg?v2"
    },
    {
      "img": "https://en.digimoncard.com/images/products/pack/ver8/bnr.jpg?v3"
    }
  ];

  const tournaments = [
    {"img": imgTournament1}, 
    {"img": imgTournament2}, 
    {"img": imgTournament3}, 
    {"img": imgTournament4}, 
    {"img": imgTournament5}, 
    {"img": imgTournament6}
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/nicolassequeira11/APIS/main/mornartcg.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        setPokemonProducts(result.pokemon);
        setDigimonProducts(result.digimon);

      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (selectedProduct) => {
    handleAddToCart(selectedProduct, 1);
  }

  const productsPokemon = pokemonProducts.slice(0, 6);
  const newProductsPokemon = productsPokemon.filter(item => item.stock > 0);

  const productsDigimon = digimonProducts.slice(0, 8);
  const newProductsDigimon = productsDigimon.filter(item => item.stock > 0);

  return(
    <div>
      <div 
        className={buttonClicked 
        ? "w-fit m-auto absolute justify-center top-20 left-0 right-0 z-10" 
        : "hidden"}
      >
        <Alert 
          severity={buttonClicked ? "success" : "error"} 
          className={buttonClicked ? "flex" : "hidden"}
        >
          {buttonClicked ? "Se agrego el producto al carrito" : ""}
        </Alert>
      </div>

      {/*Carousel*/}
      <div className="w-11/12 mb-2 mt-4 rounded-xl overflow-hidden m-auto show">
        <CarouselHome 
          data={banners}
          extraClass="hidden sm:flex"
          extraClassImg="h-[68vh]"
        />
        <CarouselHome 
          data={bannersMobile}
          extraClass="flex sm:hidden"
        />
      </div>

      {/*Brands*/}
      <div className="flex max-md:flex-wrap lg:flex-nowrap justify-center lg:w-11/12 m-auto my-3">
        <CarouselGallery data={brands}>
          {(item) => (
            <div key={item.name} className="w-100 h-[15vh] flex m-auto">
              <img src={item.img} className="object-contain m-auto w-[80%]" alt={item.name} />
            </div>
          )}
        </CarouselGallery>
      </div>

      {/*Products*/}
      <div className="text-center w-10/12 sm:w-11/12 m-auto mt-5">
        <h4 className="font-bold text-2xl">PRODUCTOS DESTACADOS</h4>
        <div className="md:mx-5 py-3 flex flex-wrap justify-center overflow-auto">
          {newProductsPokemon.length > 0 ? (
            newProductsPokemon.map((item) => (
              <div className="max-sm:w-full md:w-1/4 lg:w-1/6 mx-3 my-2" key={item.id}>
                <Cardproduct
                  img1={item.img[0]}
                  img2={item.img[1]}
                  title={newText(item.name, 40)}
                  price={item.price}
                  alt={item.name}
                  stock={item.stock}
                  onClick={()=> handleDetails(item)}
                />
                <ButtonCard 
                  text="Comprar"
                  extraClass={`w-100 ${buttonClicked ? "bg-orange-300" : "bg-orange-500"}`}
                  onClick={()=> { addToCart(item); handleButtonClick(); }}
                />
              </div>
            ))
          ) : (
            <div>No hay productos disponibles</div>
          )}
        </div>
      </div>

      {/* Adversiting */}
      <div className="max-sm:flex-wrap max-sm:w-11/12 md:w-10/12 m-auto justify-center mt-5 flex">
        {adversiting.map(item => (
          <div key={item.name} className="max-sm:w-1/2 my-1 md:my-2 w-1/4 rounded-md m-auto justify-center overflow-hidden">
            <img src={item.img} className="object-contain flex px-1 md:px-2 w-100 h-100 m-auto" />
          </div>
        ))}
      </div>

      {/*Products Digimon*/}
      <div className="text-center w-10/12 sm:w-11/12 m-auto mt-5">
        <div className="md:mx-5 py-3 flex flex-wrap justify-center overflow-auto">
          {newProductsDigimon.length > 0 ? (
            newProductsDigimon.map((item) => (
              <div className="max-sm:w-full md:w-1/4 lg:w-1/6 mx-3 my-2" key={item.id}>
                <Cardproduct
                  img1={item.img[0]}
                  img2={item.img[1]}
                  title={newText(item.name, 40)}
                  price={item.price}
                  alt={item.name}
                  stock={item.stock}
                  onClick={()=> handleDetails(item)}
                />
                <ButtonCard 
                  text="Comprar"
                  extraClass={`w-100 ${buttonClicked ? "bg-orange-300" : "bg-orange-500"}`}
                  onClick={()=> { addToCart(item); handleButtonClick(); }}
                />
              </div>
            ))
          ) : (
            <div>No hay productos disponibles</div>
          )}
        </div>
      </div>

      {/*Tournaments*/}
      <div className="text-center w-11/12 m-auto my-5">
        <h4 className="font-bold text-2xl">TORNEOS</h4>
        <div className="mb-2 mt-4 rounded-xl overflow-hidden m-auto">
          <CarouselHome 
            data={tournaments}
          />
        </div>
      </div>

      {/*Footer*/}
      <Footer />
    </div>
  )
}
