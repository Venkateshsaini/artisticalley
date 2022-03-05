import React,{useEffect, useState} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import DashBoardProduct from './dashboardproduct';
import {db} from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { getAuth } from "firebase/auth";

const Dashboard = () =>{
    let navigate = useNavigate()
// const [user,loading] = useAuthState(auth)
const user = getAuth().currentUser;
  const[products,setproducts] = useState([])
const uid = user.uid;

  const fetchProducts = async() =>{
      const response = db.collection(`sellers`);
      const data = await response.get()
      console.log(uid)
      data.docs.forEach(item=>{
        console.log(item.data().uid)
          if (item.data().uid === uid){
            let tmp = products;
            console.log(products)
            tmp.push(item.data());
            setproducts(tmp);
          }
      })


  }
if (products.length === 0){
  fetchProducts()
}
const productscomponent = products.products.map(product=>{
    console.log(products)
        return(
            <div>
            <div key = {product.product} >
                 <DashBoardProduct product = {product.product}  />

            </div>
            </div>
        )
    })
  return(
    <div></div>
  )
}
export default Dashboard;
