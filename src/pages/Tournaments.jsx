import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import { Footer } from "../components/Footer";

const Home = () => {
  return(
    <div>
      <Button color="primary">
        Torneos
      </Button>
      <Footer />
    </div>
  )
}

export default Home;