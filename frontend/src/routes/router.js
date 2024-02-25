import { createBrowserRouter,createRoutesFromElements,
    Route } from "react-router-dom";
import App from "../App";

import  Home from "../components/Home/Home";
import  About from "../components/About/About";
import  Contact  from "../components/Contact/Contact"
import  Cart  from "../components/Cart/Cart"
import  Dals  from "../components/Dals/Dals"
import  Spices  from "../components/Spices/Spices"
import  Oils  from "../components/Oils/Oils"


const router = createBrowserRouter([
    createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route index={true} path="/" element={<Home/>} />
          <Route path="/dals" element={<Dals/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/oils" element={<Oils />} />
          <Route path="/spices" element={<Spices />} />
          
        </Route>
      )

]);

export default router;