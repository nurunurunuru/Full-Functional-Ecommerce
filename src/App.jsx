import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Verify from "./pages/Verify";
import Collection from "./pages/Collection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App=()=>{
  return (
    <main className="overflow-hidden text-[#404040] bg-white">
      <ToastContainer/>
    <Header/>
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/collection" element={<Collection/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/place-order" element={<PlaceOrder/>}/>
      <Route path="/product/:productId" element={<Product/>}/>
      <Route path="/verify" element={<Verify/>}/>
    </Routes>
    </main>
  )
  
}

export default App;