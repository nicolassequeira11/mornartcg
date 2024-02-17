import React, {useState, useEffect} from "react";
import { ButtonCard } from "../components/Buttons";
import { Footer } from "./components/Footer";

export const Cart = ({ setCartQuantity }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const handleQuantityPlus = (product) => {
    if(product.quantity < product.stock){
      const updatedCartProducts = cartProducts.map(item => {
        if(item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartProducts(updatedCartProducts);
    }
  }
  
  const handleQuantityMinus = (product) => {
    if(product.quantity >= 1){
      const updatedCartProducts = cartProducts.map(item => {
        if(item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCartProducts(updatedCartProducts);
    }
  }

  const handleDeleteToCart = (product) => {
    const updatedCartProducts = cartProducts.filter(item => item.id !== product.id);
    setCartProducts(updatedCartProducts);
    localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

    setCartQuantity(updatedCartProducts.length);
    localStorage.setItem("cartQuantity", updatedCartProducts.length);
  };

  const subtotal = (array) => {
    let cont = 0;
    array.map(item => cont += item.price * item.quantity);
    return cont;
  }

  useEffect(() => {
    const savedCartProducts = localStorage.getItem('cart');
    if (savedCartProducts) {
      setCartProducts(JSON.parse(savedCartProducts));
    }
  }, []);

  return (
    <div>
      <div className={`lg:w-10/12 justify-center m-auto lg:flex ${cartProducts.length > 3 ? "md:h-fit" : "h-screen"} mt-5`}>
        <div className="mx-4 lg:w-9/12">
          <div className="lg:flex hidden w-12/12 text-center font-bold">
            <p className="w-5/12">Producto</p>
            <p className="w-2/12">Precio</p>
            <p className="w-3/12">Cantidad</p>
            <p className="w-2/12">Subtotal</p>
          </div>
          <hr className="hidden lg:flex mt-3 w-12/12"></hr>

          {cartProducts.length > 0 
            ? cartProducts.map((product, index) => (
            <div 
              key={index} 
              className="w-12/12 lg:text-left justify-center my-3"
            >
              <div className="lg:flex">
                <div className="lg:w-2/12 flex">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="object-contain max-md:p-2" 
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    onClick={()=> handleDeleteToCart(product)}
                    className="w-6 h-6 absolute flex cursor-pointer hover:text-orange-500"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="lg:w-3/12 flex flex-col justify-between max-md:text-center p-3 pe-0">
                  <h3>{product.name}</h3>
                  <h3 className="mt-2 font-thin">Stock: {product.stock}</h3>
                </div>
                
                <p className="lg:w-2/12 max-md:text-xl text-center p-3">${product.price}</p>

                <div className="flex mb-4 max-md:mx-2 lg:w-3/12 pt-3">
                  <button 
                    className="border border-slate-200 hover:bg-red-400 hover:text-white rounded-md h-fit flex p-2 text-2xl w-3/12 justify-center"
                    onClick={()=> handleQuantityMinus(product)}
                  > 
                    -
                  </button>

                  <button className="mx-2 border border-slate-200 rounded-md h-fit flex p-2 text-2xl w-6/12 justify-center"> 
                    {product.quantity}
                  </button>

                  <button 
                    className="border border-slate-200 hover:bg-green-400 hover:text-white rounded-md h-fit flex p-2 text-2xl w-3/12 justify-center"
                    onClick={()=> handleQuantityPlus(product)}
                  > 
                    +
                  </button>
                </div>
                <p className="lg:w-2/12 max-md:text-2xl max-md:font-bold text-center p-3">
                  ${product.price * product.quantity}
                </p>
              </div>
              <hr className="mt-3"></hr>
            </div>
            ))
            : <div className="m-5 flex justify-center text-2xl py-2">No hay productos</div>
          }
        </div>
        <div className="sm:w-10/12 md:w-8/12 lg:w-3/12 mx-auto mb-5">
          <div className="mx-3 rounded-md border-1 h-fit sticky top-28">
            <p className="font-bold text-center mx-3 mt-3 max-md:text-2xl text-xl">RESUMEN</p>
            <hr className="mx-3 mt-3"></hr>
            <div className="flex justify-between mx-3 mt-3">
              <p className="font-bold max-md:text-2xl">Total</p>
              <p className="text-right max-md:font-bold max-md:text-2xl">
                  ${subtotal(cartProducts)}
              </p>
            </div>
            <div className="m-3">
              <ButtonCard 
                text="Finalizar compra" 
                extraClass="bg-orange-500 w-100"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};