import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Footer } from "../components/Footer";

import PokemonTournament from "../media/pokemon-tournament.png";
import DigimonTournament from "../media/digimon-tournament.png";
import OnepieceTournament from "../media/onepiece-tournament.png";
import MagicTournament from "../media/magic-tournament.png";
import YugiohTournament from "../media/yugioh-tournament.png";
import FleshTournament from "../media/flesh-tournament.png";

export const Tournaments = () => {
  const tournaments = [
    {
      "name": "Pokemon",
      "img": PokemonTournament,
      "schedule": [
        "Lunes: Standard $250 - 19:30hs",
        "Sábado: Pokemon Cup $400 10:00hs"
      ]
    },
    {
      "name": "Yugioh",
      "img": YugiohTournament,
      "schedule": ["Viernes: Avanzado $300 - 19:30hs"]
    },
    {
      "name": "Onepiece",
      "img": OnepieceTournament,
      "schedule": [
        "Jueves: Torneo $350 - 19:30hs",
        "Viernes: Uta Deck Battle $1500 - 19:30hs"
      ]
    },
    {
      "name": "Digimon",
      "img": DigimonTournament,
      "schedule": ["Martes: Torneo $300 - 19:30hs"]
    },
    {
      "name": "Magic",
      "img": MagicTournament,
      "schedule": [
        "Martes: Pionero $250 - 19:30hs",
        "Martes: Torneo Budger USD700 $200 - 19:30hs",
        "Miércoles: Draft Wilds of Eldraine $1000 - 19:30hs",
        "Jueves: Commander Nights Gratis - 19:30hs",
        "Jueves: Standard Showdown $250 - 19:30hs",
        "Viernes: FNM Modern $250 - 19:30hs",
        "Viernes: Cedh Proxy Friendly $200 - 19:30hs",
        "Sábado: Karlov Manor $2200 - 14:00hs",
        "Sábado: Torneo USD150 $200 - 14:00hs"
      ]
    },
    {
      "name": "Flesh and blood",
      "img": FleshTournament,
      "schedule": ["Lunes: Blitz Proxy Friendly $300 19:30hs"]
    }
]

  return(
    <div>
      <div className="flex flex-wrap lg:w-11/12 m-auto mb-4 justify-center show">
        {tournaments.map((item, index) => (
          <div key={index} className="md:w-1/2 px-3">
            <img
              src={item.img}
              alt={item.name}
              className="mt-5 hover:drop-shadow-md rounded-t-xl"
            />
            {item.schedule && (
              <div className="m-auto justify-center p-3 text-white bg-myblue rounded-b-xl">
                {item.schedule.map((item, index) => (
                  <p 
                    key={index}
                    className="my-2 text-center max-sm:text-sm"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}
