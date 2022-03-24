import React from "react";
import {Routes,Route} from 'react-router';
import Home from "../home/home";
import CategoryPage from "../products/categoryproducts";
import AddProduct from "../addproduct/addproductformpage";
import Dashboard from "../sellerdashboard/dashboardpage";
import CartPage from '../cart/cartpage';
import ProductMain from "../products/productmainpage";
import PurchasePage from "../purchase/purchasepage";
const Main = () =>{
return(
    <Routes>
        <Route path = "/" element = {<Home/>}/>
    <Route path = "/home" element = {<Home/>}/>
    <Route path = "/category/:categoryid" element = {<CategoryPage/>}/>
    <Route path = "/addproduct" element = {<AddProduct/>}/>
    <Route path = "/sellerdashboard" element = {<Dashboard/>}/>
    <Route path = "/cart" element = {<CartPage/>}/>
    <Route path = "/:category/product/:productid" element = {<ProductMain/>}/>
    <Route path = "/purchase/:productid" element = {<PurchasePage/>}/>
    </Routes>
)
}
export default Main;
