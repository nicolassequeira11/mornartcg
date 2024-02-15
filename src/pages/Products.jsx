import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from 'classnames';

// Components
import { ButtonCard } from "../components/Buttons";
import { Cardproduct } from "../components/Card-product";
import { ChevronIcon } from "../components/ChevronIcon";
import { Footer } from "../components/Footer";
import { InputText } from "../components/Inputs";

// React Bootstrap
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';

// Next UI
import {usePagination, PaginationItemType} from "@nextui-org/react";

// Material UI
import CheckIcon from '@mui/icons-material/Check';

export const Products = ({navigate, newText, setCartQuantity, handleButtonClick, buttonClicked, handleAddToCart, cartProducts, setCartProducts, handleDetails }) => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [tcgSelected, setTcgSelected] = useState("pokemon");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Collection Filter
  const [collectionSelected, setCollectionSelected] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");

  // Type Filter
  const [typeSelected, setTypeSelected] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  // OffCanvas Mobile Filters
  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  // Pagination
  const {activePage, range, setPage, onNext, onPrevious} = usePagination({
    total: (filteredProducts.length / 5),
    showControls: true,
    siblings: 10,
    boundaries: 10,
  });

  // Brands logo
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

  // FETCH API
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

  // Get cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  // Add products to cart
  const addToCart = (selectedProduct) => {
    handleAddToCart(selectedProduct, 1);
  }

  const sortAZ = () => {
    const sortedProducts = [...filteredProducts];

    sortedProducts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    
    setFilteredProducts(sortedProducts);
  }

  const sortPriceHigh = () => {
    const sortedProducts = [...filteredProducts];

    sortedProducts.sort((a, b) => {
      return a.price - b.price;
    });
    
    setFilteredProducts(sortedProducts);
  }

  const sortPriceLow = () => {
    const sortedProducts = [...filteredProducts];

    sortedProducts.sort((a, b) => {
      return b.price - a.price;
    });
    
    setFilteredProducts(sortedProducts);
  }

  // Price filtering
  const handleFilter = () => {
    let priceMin = parseFloat(document.getElementById("priceMin").value);
    let priceMax = parseFloat(document.getElementById("priceMax").value);
  
    let filteredProducts = originalProducts.filter((product) => {
      setSelectedCollection("");
      setSelectedType("");

      if (!isNaN(priceMin) && !isNaN(priceMax)) {
        return priceMin <= product.price && product.price <= priceMax;
      } else if (!isNaN(priceMin)) {
        return priceMin <= product.price;
      } else if (!isNaN(priceMax)) {
        return product.price <= priceMax;
      }
      return true;
    });

    setFilteredProducts(filteredProducts); 
  };

  // Collection filtering
  const handleCollection = (collection) => {
    if (collectionSelected === collection) {
      setCollectionSelected("");
      setSelectedCollection("");
    } else {
      setCollectionSelected(collection);
      setSelectedCollection(collection);
    }
  }

  // Type filtering
  const handleType = (type) => {
    if (typeSelected === type) {
      setTypeSelected("");
      setSelectedType("");
    } else {
      setTypeSelected(type);
      setSelectedType(type);
    }
  }

  // Set filters
  useEffect(() => {
    let filteredProducts = originalProducts;
  
    if (collectionSelected.length > 0) {
      filteredProducts = filteredProducts.filter(item => 
        item.collection === collectionSelected);
    }
  
    if (typeSelected.length > 0) {
      filteredProducts = filteredProducts.filter(item => 
        item.type === typeSelected);
    }
  
    setFilteredProducts(filteredProducts);
  }, [collectionSelected, typeSelected, originalProducts]);

  // Pagination
  const startIndex = (activePage - 1) * 9;
  const endIndex = activePage * 9;
  const displayedProducts = 
    filteredProducts.length > 0 
      ? filteredProducts.slice(startIndex, endIndex) 
      : products.slice(startIndex, endIndex);

  // Filtering collection and types arrays
  const uniqueCollections = [...new Set(products.map(product => product.collection))];
  const uniqueTypes = [...new Set(products.map(product => product.type))];

  return(
    <div>

      {/* Brands */}
      <div className="flex max-md:flex-wrap justify-center lg:flex-nowrap w-11/12 m-auto mt-3">
      {brands.map(item => {
        return(
          <div 
            key={item.name}
            className="mt-3 flex cursor-pointer px-1 show 
              max-sm:w-1/3 
              md:w-3/4 md:mx-2 md:my-4 max-md:w-1/3
              lg:w-1/6 lg:mx-4"
            onClick={()=> setTcgSelected(item.name)}
          >
            <img 
              src={item.img} 
              className="object-contain py-2 px-3 shadow-md rounded-2xl hover:shadow-lg" 
            />
          </div>
        )
      })}
      </div>

      {/* Filter Mobile */}
      <div className="flex justify-between mt-4">
        {/* Sort */}
          <div className="py-4 ms-5 w-1/2 lg:hidden z-10">
            <Dropdown>
              <Dropdown.Toggle 
                className="after:hidden border text-black hover:bg-white focus:outline-none" 
                id="dropdown-basic"
              >
                Ordenar por
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item 
                  className="focus:bg-orange-500" 
                  onClick={sortAZ}
                >
                  A-Z
                </Dropdown.Item>
                <Dropdown.Item 
                  className="focus:bg-orange-500" 
                  onClick={sortPriceLow}
                >
                  Precio: Mayor a Menor
                </Dropdown.Item>
                <Dropdown.Item 
                  className="focus:bg-orange-500" 
                  onClick={sortPriceHigh}
                >
                  Precio: Menor a Mayor
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <button 
            onClick={handleShowFilter} 
            className="lg:hidden me-5 border-1 rounded-md px-3 py-2 w-fit h-fit bg-white my-auto text-black hover:bg-slate-50 hover:text-white"
          >
            Filtros
          </button>
      </div>

      {/* Content Product */}
      <div className="lg:flex m-auto w-10/12 justify-center max-sm:mt-3 md:mt-5">
        
        {/* Filters */}
        <div className="lg:w-1/4 px-3 hidden lg:flex lg:flex-col justify-center border-1 rounded-md h-fit">

          {/* Sort */}
          <div className="py-4 border-b-1">
            <Dropdown>
              <Dropdown.Toggle 
                className="after:hidden border text-black hover:bg-white focus:outline-none z-30" 
                id="dropdown-basic"
              >
                Ordenar por
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item 
                  className="focus:bg-orange-500" 
                  onClick={sortAZ}
                >
                  A-Z
                </Dropdown.Item>
                <Dropdown.Item 
                  className="focus:bg-orange-500" 
                  onClick={sortPriceLow}
                >
                  Precio: Mayor a Menor
                </Dropdown.Item>
                <Dropdown.Item 
                  className="focus:bg-orange-500" 
                  onClick={sortPriceHigh}
                >
                  Precio: Menor a Mayor
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Filter Price */}
          <div className="flex border-b-1 py-4">
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

          {/* Filter Collection */}
          <div className="flex flex-col border-b-1 py-3">
            <p className="px-1 font-bold">Colección</p>
            {uniqueCollections.map((item, index) => (
              <div 
                key={index} 
                onClick={()=> handleCollection(item)}
                className="flex justify-between cursor-pointer hover:bg-slate-50 py-2 px-3"
              >
                <p>{item}</p>
                <div className="flex">
                  <CheckIcon className={selectedCollection === item 
                    ? "opacity-100 text-orange-500" 
                    : "opacity-0"} 
                  />
                </div>
                
              </div>
            ))}
          </div>

          {/* Filter Type */}
          <div className="flex flex-col py-3">
            <p className="px-1 font-bold">Tipo</p>
            {uniqueTypes.map((item, index) => (
              <div 
                key={index} 
                onClick={()=> handleType(item)}
                className="flex justify-between cursor-pointer hover:bg-slate-50 py-2 px-3"
              >
                <p>{item}</p>
                <div className="flex">
                  <CheckIcon className={selectedType === item 
                    ? "opacity-100 text-orange-500" 
                    : "opacity-0"} 
                  />
                </div>
                
              </div>
            ))}
          </div>
          
        </div>

        <Offcanvas show={showFilter} onHide={handleCloseFilter} placement="end" className="max-sm:w-3/4">
          <Offcanvas.Body>
          {/* Filters */}
          <div className="px-3 justify-center border-1 rounded-md h-fit">

            {/* Filter Price */}
            <div className="flex border-b-1 py-4">
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

            {/* Filter Collection */}
            <div className="flex flex-col border-b-1 py-3">
              <p className="px-1 font-bold">Colección</p>
              {uniqueCollections.map((item, index) => (
                <div 
                  key={index} 
                  onClick={()=> handleCollection(item)}
                  className="flex justify-between cursor-pointer hover:bg-slate-50 py-2 px-3"
                >
                  <p>{item}</p>
                  <div className="flex">
                    <CheckIcon 
                      className={selectedCollection === item 
                        ? "opacity-100 text-orange-500" 
                        : "opacity-0"} 
                    />
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Filter Type */}
            <div className="flex flex-col py-3">
              <p className="px-1 font-bold">Tipo</p>
              {uniqueTypes.map((item, index) => (
                <div 
                  key={index} 
                  onClick={()=> handleType(item)}
                  className="flex justify-between cursor-pointer hover:bg-slate-50 py-2 px-3"
                >
                  <p>{item}</p>
                  <div className="flex">
                    <CheckIcon 
                      className={selectedType === item 
                        ? "opacity-100 text-orange-500" 
                        : "opacity-0"} 
                    />
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Products */}
        <div className="lg:w-3/4 mx-auto flex justify-center text-center show flex-wrap">
          {displayedProducts.length > 0 
          ? (displayedProducts.map((item) => (
              <div className="w-screen sm:w-1/3 md:w-1/4 lg:w-1/4 mx-4 my-3">
                <Cardproduct
                  key={item.id}
                  img1={item.img[0]}
                  img2={item.img[1]}
                  title={newText(item.name, 45)}
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
            ))) 
          : (
            <div className="mt-4">No hay productos disponibles</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 my-5 justify-center">
        <ul className="flex gap-2 items-center">
          {range.map((page) => {
            if (page === PaginationItemType.NEXT) {
              return (
                <li key={page} aria-label="next page" className="w-6 h-6 m-auto flex">
                </li>
              );
            }

            if (page === PaginationItemType.PREV) {
              return (
                <li key={page} aria-label="previous page" className="w-6 h-6 m-auto flex">
                </li>
              );
            }
            
            return (
              <li key={page} aria-label={`page ${page}`} className="w-5 h-5">
                <button
                  className={cn(
                    "w-full h-full bg-default-300 rounded-full m-auto flex",
                    activePage === page && "bg-dark"
                  )} 
                  onClick={() => setPage(page)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  )
}