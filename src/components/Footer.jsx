import React from "react";
import { Link } from "react-router-dom";

import backgroundFooter from "../media/footer.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = () => {
  return(
    <footer className="m-auto mt-5 pt-1 w-100 h-50 bg-cover" 
      style={{ backgroundImage: `url(${backgroundFooter})` }}
    >
      <div className="flex max-md:flex-wrap max-md:flex-col-reverse max-md:w-100 lg:w-10/12 justify-center mx-auto my-10">
        <div className="flex mx-auto justify-center max-md:m-auto max-md:w-10/12 lg:w-8/12 opacity-90">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13087.36949422611!2d-56.171781!3d-34.910405!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81a332c9b41f%3A0x6f8435a6ed7fcb19!2sMornar%20Store!5e0!3m2!1sen!2suy!4v1707528833703!5m2!1sen!2suy" 
            className="m-auto w-100" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
        <div className="max-md:w-100 max-md:m-auto max-md:mb-5 mx-auto lg:w-4/12 lg:ms-5 justify-between flex flex-col text-white">
          <p className="text-xl text-end max-md:w-fit">HORARIO</p>
          <p className="text-xl text-end max-md:w-fit">Lunes a Viernes: 16:00 - 22:00</p>
          <p className="text-xl text-end max-md:w-fit">Sábados y Domingos: 13:00 - 18:00</p>
          <p className="text-md text-end max-md:w-fit">Juan Manuel Blanes 1053 esq. Durazno</p>
        </div> 
      </div>
      <div className="w-10/12 m-auto pb-4 flex">
        <p className="text-white m-auto justify-center w-1/2">
          Desarrollo y diseño por <a href="" className="hover:text-orange-500">Nicolás Sequeira</a></p>
        
        <div className="flex m-auto w-1/2 justify-content-end">
          <Link href="" className="text-white">
            <InstagramIcon className="hover:text-orange-500 mx-1" />
            <FacebookIcon className="hover:text-orange-500 mx-1" />
            <WhatsAppIcon className="hover:text-orange-500 mx-1" />
            <YouTubeIcon className="hover:text-orange-500 ms-1" />
          </Link>
        </div>
      </div>
    </footer>
  )
}