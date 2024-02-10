import React from "react";

const ButtonCard = ({text, onClick, extraClass}) => {
  return(
    <button 
      onClick={onClick}
      className={`transition ease-in-out rounded-md text-white py-2 px-5 ${extraClass}`}
    >
      {text}
    </button>
  )
}

export default ButtonCard;