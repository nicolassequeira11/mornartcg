import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Cardproduct from "../components/Card-product";
import InputText from "../components/Inputs";

const Products = ({navigate}) => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [tcgSelected, setTcgSelected] = useState("pokemon");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const brands = [
    {
      "name": "pokemon",
      "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/2560px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png"
    },
    {
      "name": "onepiece",
      "img": "https://gatheringgames.co.uk/cdn/shop/products/one-piece-card-game-double-pack-set-vol3-dp-03-656563.png?v=1696594990"
    },
    {
      "name": "magic",
      "img": "https://logos-world.net/wp-content/uploads/2023/05/Magic-The-Gathering-Logo.jpg"
    },
    {
      "name": "yugioh",
      "img": "https://img.konami.com/kde_cms/eu_publish/uploads/EN-and-DE-Resized.png"
    },
    {
      "name": "digimon",
      "img": "https://magicomens.com/cdn/shop/collections/digimon-trading-card-game-zagreb-croatia.png?v=1634587142"
    },
    {
      "name": "fleshandblood",
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

        setOriginalProducts(result[tcgSelected]); 
        setProducts(result[tcgSelected]);

      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [tcgSelected]);

  const handleDetails = (product) => {
    setSelectedProduct(product);
    navigate("/details", { state: { selectedProduct: product } });
  }

  const handleFilter = () => {
    let priceMin = parseFloat(document.getElementById("priceMin").value);
    let priceMax = parseFloat(document.getElementById("priceMax").value);
  
    let filteredProducts = originalProducts.filter((product) => {
      if (!isNaN(priceMin) && !isNaN(priceMax)) {
        return priceMin <= product.price && product.price <= priceMax;
      } else if (!isNaN(priceMin)) {
        return priceMin <= product.price;
      } else if (!isNaN(priceMax)) {
        return product.price <= priceMax;
      }
      return true;
    });

    setProducts(filteredProducts); // Establece los productos filtrados
  };

  return(
    <div>
      {/* Brands */}
      <div className="flex max-md:flex-wrap justify-center lg:flex-nowrap w-11/12 m-auto mt-3">
      {brands.map(item => {
        return(
          <div 
            className="mt-3 flex shadow-md py-2 px-3 rounded-2xl cursor-pointer
              max-sm:w-1/3 
              md:w-3/4 md:mx-2 md:my-4 max-md:w-1/2
              lg:w-1/6 lg:mx-4  
              hover:shadow-lg"
            onClick={()=> setTcgSelected(item.name)}
          >
            <img src={item.img} className="object-contain" />
          </div>
        )
      })}
      </div>

      {/* Filters */}
      <div className="w-10/12 mx-auto mt-4">
        <div className="flex">
          <InputText 
            type="text"
            variant="underlined"
            placeholder="Desde"
            className="mx-2"
            label="Precio Min."
            id="priceMin"
            onChange={handleFilter}
          />
          <InputText 
            type="text"
            variant="underlined"
            placeholder="Hasta"
            className="mx-2"
            label="Precio Max."
            id="priceMax"
            onChange={handleFilter}
          />
        </div>
      </div>

      {/* Content Product */}
      <div className="flex m-auto justify-center mt-5">
        <div className="w-100">
          <div className="mx-5 flex justify-center text-center flex-wrap">
            {products.length > 0 ? (
              products.map((item) => (
                <Cardproduct
                  key={item.id}
                  img1={item.img[0]}
                  img2={item.img[1]}
                  title={item.name}
                  price={item.price}
                  alt={item.name}
                  onClick={()=> handleDetails(item)}
                  className="sm:w-1/3 md:w-1/4 lg:w-1/6 mx-2 my-2"
                />
              ))
            ) : (
              <div className="mt-4">No hay productos disponibles</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products;