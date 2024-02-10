import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import ButtonCard from "../components/Buttons";
import { CarouselDetails } from "../components/Carousel";
import { Footer } from "../components/Footer";
import Alert from '@mui/material/Alert';

const Details = ({ setCartQuantity, handleButtonClick, buttonClicked, handleAddToCart, cartProducts, setCartProducts }) => {
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

  return(
    <div className="m-auto mt-5 justify-center">
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
      {selectedProduct && (
        <div className="max-sm:flex-row md:flex justify-center m-auto max-md:w-11/12 lg:w-9/12">
          <div className="max-sm:w-100 md:w-1/2 max-sm:p-3 md:p-7">
            <CarouselDetails 
              data={selectedProduct.img}
            />
          </div>
          <div className="h-fit text-left p-4 mb-4 mt-2 max-sm:w-100 md:w-1/2">
            <h2 className="font-bold text-2xl mb-3">{selectedProduct.name}</h2>
            <h2 className="text-xl mb-10">${selectedProduct.price}</h2>

            <div className="flex mb-4">
              <button 
                className="mx-1 border border-slate-200 hover:bg-red-400 hover:text-white rounded-md h-fit flex p-2 text-2xl w-1/12 justify-center"
                onClick={handleQuantityMinus}
              > 
                -
              </button>

              <button className="mx-2 border border-slate-200 rounded-md h-fit flex p-2 text-2xl w-3/12 justify-center"> 
                {quantity}
              </button>

              <button 
                className="mx-1 border border-slate-200 hover:bg-green-400 hover:text-white rounded-md h-fit flex p-2 text-2xl w-1/12 justify-center"
                onClick={handleQuantityPlus}
              > 
                +
              </button>
            </div>

            <p className="font-thin mb-3">Stock: {selectedProduct.stock}</p>

            <ButtonCard 
              text="Comprar"
              extraClass={buttonClicked ? "bg-orange-300 w-100" : "bg-orange-500 w-100"}
              onClick={()=> { addToCart(); handleButtonClick(); }}
            />
            
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Details;