import React from "react";

import Logo from "../../media/logo-mornar.png";
import backgroundFooter from "../../media/footer.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Footer = () => {
  return(
    <footer className="m-auto pt-1 w-100 bg-cover" 
      style={{ backgroundImage: `url(${backgroundFooter})` }}
    >
      <div className="flex max-md:w-100 lg:w-10/12 justify-center mx-auto my-10">

        {/* Logo */}
        <div className="w-2/12 lg:w-4/12 mx-auto">
          <img src={Logo} className="flex lg:w-3/12 justify-start max-md:m-auto" />
        </div>

        {/* Horarios */}
        <div 
          className="w-8/12 max-lg:m-auto ms-0 lg:ms-5 justify-between flex flex-col text-white"
        >
          <p className="md:text-xl text-end w-100 max-md:w-fit py-1">
            HORARIO
          </p>
          <p className="md:text-xl text-end w-100 max-md:w-fit py-1">
            Lunes a Viernes: 16:00 - 22:00
          </p>
          <p className="md:text-xl text-end w-100 max-md:w-fit py-1">
            Sábados y Domingos: 13:00 - 18:00
          </p>
          <p className="md:text-md text-end w-100 max-md:w-fit py-1">
            Juan Manuel Blanes 1053 esq. Durazno
          </p>
        </div>

      </div>
      <div className="w-10/12 m-auto pb-4 flex">
        <p 
          className="text-white m-auto justify-center w-1/2"
        >
          Desarrollo y diseño por <a href="" className="hover:text-orange-500">Nicolás Sequeira</a>
        </p>
        
        <div className="flex m-auto w-1/2 justify-content-end">
          <a href="#" className="text-white">
            <InstagramIcon className="hover:text-orange-500 mx-1" />
          </a>
          <a href="#" className="text-white">
            <FacebookIcon className="hover:text-orange-500 mx-1" />
          </a>
          <a href="#" className="text-white">
            <WhatsAppIcon className="hover:text-orange-500 mx-1" />
          </a>
          <a href="#" className="text-white">
            <YouTubeIcon className="hover:text-orange-500 ms-1" />
          </a>
          <a
            href="https://www.google.com/maps?ll=-34.910405,-56.171781&z=15&t=m&hl=en&gl=UY&mapclient=embed&cid=8035606626201226009" 
            className="text-white"
            target="_blank"
          >  
            <LocationOnIcon className="hover:text-orange-500 ms-1" />
          </a>

        </div>
      </div>
    </footer>
  )
}