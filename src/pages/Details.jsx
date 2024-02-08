import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import ButtonCard from "../components/Buttons";
import { CarouselDetails } from "../components/Carousel";
import InputText from "../components/Inputs";

const Details = () => {
  const { state } = useLocation();
  const selectedProduct = state ? state.selectedProduct : null;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  }

  const handleQuantityMinus = () => {
    if(quantity >= 1){
      setQuantity(quantity - 1);
    }
  }

  return(
    <div className="m-auto mt-5 text-center justify-center">
      {selectedProduct && (
        <div className="max-sm:flex-row md:flex justify-center m-auto max-md:w-11/12 lg:w-9/12">
          <div className="max-sm:w-100 md:w-1/2 max-sm:p-3 md:p-7">
            <CarouselDetails 
              data={selectedProduct.img}
            />
          </div>
          <div className="h-fit text-left p-4 my-4 max-sm:w-100 md:w-1/2">
            <h2 className="font-bold text-2xl mb-3">{selectedProduct.name}</h2>
            <h2 className="text-xl mb-10">${selectedProduct.price}</h2>

            <div className="flex mb-4">
              <button 
                className="mx-1 border border-slate-200 h-fit flex p-2 text-2xl w-1/12 justify-center"
                onClick={handleQuantityMinus}
              > 
                -
              </button>

              <button className="mx-2 border border-slate-200 h-fit flex p-2 text-2xl w-2/12 justify-center"> 
                {quantity}
              </button>

              <button 
                className="mx-1 border border-slate-200 h-fit flex p-2 text-2xl w-1/12 justify-center"
                onClick={handleQuantityPlus}
              > 
                +
              </button>
            </div>

            <ButtonCard 
              text="Comprar"
            />

          </div>
        </div>
      )}
    </div>
  )
}

export default Details;