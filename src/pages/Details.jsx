import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { ButtonCard } from "../components/Buttons";
import { CarouselDetails } from "../components/Carousel";
import { Cardproduct } from "../components/Card-product";
import { Footer } from "./components/Footer";

export const Details = ({ products, newText, handleDetails, handleButtonClick, buttonClicked, handleAddToCart, setCartProducts }) => {
  const { state } = useLocation();
  const selectedProduct = state ? state.selectedProduct : null;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityPlus = () => {
    if(quantity < selectedProduct.stock){
      setQuantity(quantity + 1);
    }
  }

  const handleQuantityMinus = () => {
    if(quantity >= 1){
      setQuantity(quantity - 1);
    }
  }

  useEffect(() => {
    const savedCartProducts = localStorage.getItem('cart');
    if (savedCartProducts) {
      setCartProducts(JSON.parse(savedCartProducts));
    }
  }, []);

  const addToCart = () => {
    handleAddToCart(selectedProduct, quantity);
  }

  // Get copy from original array
  let originalArray = products[selectedProduct.tcg];

  // Delete elements without stock and with the same id that selectedProduct
  let filteredArray = originalArray.filter(item => item.stock !== 0 && item.id !== selectedProduct.id);

  // Random reorganize the array elements
  filteredArray.sort(() => Math.random() - 0.5);

  // Select five elements of array
  const selectedItems = filteredArray.slice(0, 5);

  return(
    <div className="m-auto mt-3 h-[100vh] justify-center show">
      {selectedProduct && (
        <div className="max-sm:flex-row md:flex justify-center mb-5 m-auto max-md:w-11/12 lg:w-10/12">

          {/* Product Carousel */}
          <div className="max-sm:w-100 md:w-1/2 max-sm:p-3 md:p-7">
            <CarouselDetails 
              data={selectedProduct.img}
            />
          </div>

          {/* Product Info */}
          <div className="h-fit text-left p-4 mb-4 mt-2 max-sm:w-100 md:w-1/2 max-md:text-center">
            <h2 className="font-bold text-2xl mb-3">{selectedProduct.name}</h2>
            <h2 className="text-xl mb-10">${selectedProduct.price}</h2>

            {/* Product Quantity */}
            <div className="flex mb-4 max-md:justify-center">
              <button 
                className="mx-1 border border-slate-200 hover:bg-red-400 hover:text-white rounded-md h-fit flex p-2 text-2xl w-3/12 md:w-1/12 justify-center"
                onClick={handleQuantityMinus}
              > 
                -
              </button>

              <button className="mx-2 border border-slate-200 rounded-md h-fit flex p-2 text-2xl w-4/12 md:w-3/12 justify-center"> 
                {quantity}
              </button>

              <button 
                className="mx-1 border border-slate-200 hover:bg-green-400 hover:text-white rounded-md h-fit flex p-2 text-2xl w-3/12 md:w-1/12 justify-center"
                onClick={handleQuantityPlus}
              > 
                +
              </button>
            </div>

            <p className=
              {selectedProduct.stock > 0 
                ? "mb-3 text-sm bg-green-400 w-fit py-1 px-2 text-white rounded-2xl max-md:m-auto" 
                : "mb-3 text-sm bg-red-400 w-fit py-1 px-2 text-white rounded-2xl max-md:m-auto"}
              >
              {selectedProduct.stock > 0 ? `STOCK: ${selectedProduct.stock}` : "AGOTADO"}
            </p>

            <ButtonCard 
              text="Comprar"
              extraClass={buttonClicked ? "bg-orange-300 w-100" : "bg-orange-500 w-100"}
              onClick={()=> { addToCart(); handleButtonClick(); }}
            />
            
          </div>
        </div>
      )}

        {/* Productos recomended */}
        <div className="flex flex-col m-auto p-auto max-sm:w-11/12 md:w-10/12">
          <div className="flex max-sm:overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap m-auto">
              {selectedItems.map(item => (
              <div className="inline-block">
                <div className="max-sm:w-64 max-w-xs overflow-hidden flex text-center">
                  <Cardproduct
                    img1={item.img[0]}
                    img2={item.img[1]}
                    title={newText(item.name, 45)}
                    price={item.price}
                    alt={item.name}
                    stock={item.stock}
                    onClick={()=> handleDetails(item)}
                  />
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>

      <Footer />
    </div>
  )
}