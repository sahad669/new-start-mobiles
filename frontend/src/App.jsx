import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Service from "./pages/Service";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
    </>
  );
};

export default App;
