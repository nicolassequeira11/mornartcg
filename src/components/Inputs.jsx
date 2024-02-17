import React from "react";
import {Input} from "@nextui-org/react";

export const InputText = ({variant, label, placeholder, type, className, id, onChange, radius, onBlur}) => {
  const variants = ["flat", "bordered", "underlined", "faded"];

  return (
    <div className="w-full flex flex-col gap-4">
        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input 
            type={type} 
            variant={variant} 
            label={label} 
            placeholder={placeholder} 
            className={className} 
            id={id}
            onChange={onChange}
            radius={radius}
            onBlur={onBlur}
          />
        </div>
    </div>  
  );
}

