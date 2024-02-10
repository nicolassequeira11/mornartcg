import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {CarouselHome} from "../components/Carousel";
import Cardproduct from "../components/Card-product";
import ButtonCard from "../components/Buttons";
import Alert from '@mui/material/Alert';
import { Footer } from "../components/Footer";

import imgTournament1 from "../media/pokemon-tournament.png";
import imgTournament2 from "../media/onepiece-tournament.png";
import imgTournament3 from "../media/magic-tournament.png";
import imgTournament4 from "../media/yugioh-tournament.png";
import imgTournament5 from "../media/digimon-tournament.png";
import imgTournament6 from "../media/flesh-tournament.png";

import Banner1 from "../media/banner-1.png";
import Banner2 from "../media/banner-2.png";
import Banner3 from "../media/banner-3.png";
import Banner4 from "../media/banner-4.png";
import Banner5 from "../media/banner-5.png";
import Banner6 from "../media/banner-6.png";

const Home = ({navigate, setCartQuantity, handleButtonClick, buttonClicked, handleAddToCart, cartProducts, setCartProducts}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/nicolassequeira11/APIS/main/mornartcg.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        setProducts(result.pokemon);

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

  const handleDetails = (product) => {
    setSelectedProduct(product);
    navigate("/details", { state: { selectedProduct: product } });
  }

  const addToCart = (selectedProduct) => {
    handleAddToCart(selectedProduct, 1);
  }

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
      <div className="w-11/12 mb-2 mt-4 rounded-2xl overflow-hidden m-auto">
        <CarouselHome 
          img1={Banner1}
          img2={Banner2}
          img3={Banner3}
          img4={Banner4}
          img5={Banner5}
          img6={Banner6}
          int1="1000"
          int2="800"
        />
      </div>

      {/*Brands*/}
      <div className="flex max-md:flex-wrap lg:flex-nowrap justify-center lg:w-11/12 m-auto my-3">
        {brands.map(item => {
          return(
            <div key={item.name} className="flex flex-wrap w-1/3 md:w-1/6 lg:w-1/6 m-auto my-2 mx-4">
              <img src={item.img} className="object-contain" />
            </div>
          )
        })}
      </div>

      {/*Products*/}
      <div className="text-center w-11/12 m-auto mt-5">
        <h4 className="font-bold text-2xl">PRODUCTOS DESTACADOS</h4>
        <div className="md:mx-5 py-3 flex flex-wrap justify-center overflow-auto">
          {products.length > 0 ? (
            products.map((item) => (
              <div className="md:w-1/4 lg:w-1/6 mx-3 my-2" key={item.id}>
                <Cardproduct
                  img1={item.img[0]}
                  img2={item.img[1]}
                  title={item.name}
                  price={item.price}
                  alt={item.name}
                  onClick={()=> handleDetails(item)}
                />
                <ButtonCard 
                  text="Comprar"
                  extraClass={buttonClicked ? "bg-orange-300 w-100" : "bg-orange-500 w-100"}
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
      <div className="text-center w-11/12 m-auto mt-5">
        <h4 className="font-bold text-2xl">HORARIO DEL TORNEO</h4>
        <div className="mb-2 mt-4 rounded-2xl overflow-hidden m-auto">
          <CarouselHome 
            img1={imgTournament4}
            img2={imgTournament1}
            img3={imgTournament2}
            img4={imgTournament5}
            img5={imgTournament3}
            img6={imgTournament6}
          />
        </div>
      </div>

      {/*Footer*/}
      <Footer />
    </div>
  )
}

export default Home;