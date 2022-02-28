import React from "react";
import Home from "./Home"
import Login from "./Login"
import Missingroute from "./Missingroute";
import Logout from "./Logout"
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./Test";
import Test2 from "./Test2";




const Navigate = () => {
  return(
    <div className="menu">
      <Router>
          <Routes>
            <Route path="/"  element={<Login/>}>
            </Route>
            <Route path="/home"  element={<Home/>} />
            <Route path="/logout"  element={<Logout/>} />
            <Route path="/chat"  element={<Chat/>} />
            <Route path="/test"  element={<Test/>} />
            <Route path="/test2"  element={<Test2/>} />

            <Route element={ <Home/> } />
            <Route path="*" element={<Missingroute/>} />
          </Routes>
      </Router>
    </div>
  )

}

export default Navigate;
