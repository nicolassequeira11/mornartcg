import React from "react";

const ButtonCard = ({text}) => {
  return(
    <button className="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white w-100 border-2 py-2 px-5">
      {text}
    </button>
  )
}

export default ButtonCard;