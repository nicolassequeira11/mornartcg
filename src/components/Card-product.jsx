import pokemon from "../media/products/pokemon/pokemon-paldea-fates-1.jpg";
import React, { useState, useEffect} from "react";

const Cardproduct = ({id, img1, img2, title, price, className, alt, onClick}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  }

  const handleMouseOut = () => {
    setHovered(false);
  }

  return(
    <div className={className} key={id}>
      <img 
        src={hovered ? img2 : img1} 
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut}
        alt={alt}
        onClick={onClick}
        className="hover:outline-orange-400 hover:outline hover:outline-1 my-2 h-60 w-100 cursor-pointer object-contain"
      />
      <p className="font-thin">{title}</p>
      <p className="py-2">${price}</p>
      <div className="m-auto mx-1">
        <p className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white border-2 py-2 px-5">
          Comprar
        </p>
      </div>
    </div>
  )
}

export default Cardproduct;