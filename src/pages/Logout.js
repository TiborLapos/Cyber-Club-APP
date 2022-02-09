import React from "react";
import {Navigate} from "react-router-dom";

function Home() {
  return (
    localStorage.removeItem('uuid'),
    localStorage.clear(),
    <Navigate to='/'/>
  );
}

export default Home;
