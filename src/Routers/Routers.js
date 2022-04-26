import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../Pages/Detail/Detail";
import Home from "../Pages/Home/Home"
import Catelog from "../Pages/Catelog/Catelog"
import Contact from "../Pages/Contact/Contact";
import Bookmark from "../Pages/Bookmark/Bookmark";

function Routers() {
  return (
    <BrowserRouter>
         <Routes>
            <Route path="/bookmark" element={<Bookmark/>}/>
            <Route path="/:category/search/:keyword" element={<Catelog/>}/>
            <Route path="/list/:category/:type" element={<Catelog/>}/>
            <Route path="/:category/:id" element={<Detail/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route exact path="/" element={<Home/>}/>
         </Routes>
    </BrowserRouter>
  );
}
export default Routers;
