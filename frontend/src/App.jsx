import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Service from "./pages/Service";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRouter from "./components/AdminProtectedRouter";
import Category from "./components/Category";
import Brand from "./components/Brand";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductsAdmin from "./components/ProductsAdmin";
import ViewProduct from "./components/ViewProduct";
import PaymentSuccess from "./pages/PaymentSuccess";
import CancelPayment from "./pages/CancelPayment";
import AddressForm from "./components/AddressForm";
import AdminOrders from "./components/AdminOrders";
import OrderSummary from "./pages/OrderSummary";
import PaymentSuccessCash from "./pages/PaymentSuccessCash";
import Footer from "./components/Footer"
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
        <Route path="/payment-success-cash" element={<PaymentSuccessCash/>}/>
        <Route path="/ordersummery" element={<OrderSummary/>}/>
        <Route path="/payment-cancel" element={<CancelPayment/>} />
        <Route path="/add-address" element={<AddressForm/>} />
        <Route path="/edit-address/:addressId" element={<AddressForm />} />
         <Route path="*" element={<NotFound />} />
        

        <Route
          path="/admin"
          element={
            <AdminProtectedRouter>
              <AdminDashboard />
            </AdminProtectedRouter>
          }
        />
        <Route path="/category" element={<Category />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/adminproducts" element={<ProductsAdmin />} />
        <Route path="/getorders" element={<AdminOrders/>}/>
        <Route path="/viewproduct/:id" element={<ViewProduct />} />
      </Routes>
      <Footer/>
      <WhatsAppButton/>
    </>
  );
};

export default App;
