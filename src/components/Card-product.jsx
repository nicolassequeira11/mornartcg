import React, { useState } from "react";

 export const Cardproduct = ({id, img1, img2, title, price, className, alt, onClick, stock}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  }

  const handleMouseOut = () => {
    setHovered(false);
  }

  return(
    <div className={className} key={id}>
      <div className="flex relative h-[250px] overflow-hidden">
        <img 
          src={hovered ? img2 : img1} 
          onMouseOver={handleMouseOver} 
          onMouseOut={handleMouseOut}
          alt={alt}
          onClick={onClick}
          className="h-100 w-100 p-2 cursor-pointer object-contain transition hover:scale-110"
        />
        <p className={`text-xs mt-2 w-fit m-auto py-1 px-2 absolute text-white rounded-2xl
          ${stock > 0 ? "bg-green-400" : "bg-red-400"}`}
        >
          {stock > 0 
            ? `STOCK: ${stock}` 
            : "AGOTADO"
          }
        </p>
      </div>
      <p className="pt-2">{title}</p>
      <p className="py-2">${price}</p>
    </div>
  )
}

