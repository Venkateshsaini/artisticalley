import React,{useEffect, useState} from 'react';
import CartProduct from './cartproduct';
import Loader from '../loader/Loader';
import Header from '../header/header';
import {db} from '../../firebase';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const CartPage = ()=>{
  const [uid,setuid] = useState("")
    const [user] = useAuthState(auth)
    const [users,setusers] = useState([])
    const [display,setdisplay] = useState(<Loader/>)
    const [carts,setcarts] = useState([])
    const navigate = useNavigate();
    const fetchUser = async() =>{
        const response = db.collection("users");
        const data = await response.get()

        data.docs.forEach(item=>{

            const tmp =users;
            tmp.push(item.data())
            setusers(tmp)
            tmp.map(dbuser =>{
              if (dbuser.uid === user.uid){
                if (dbuser.cart.length === 0){
                  setdisplay(<div> You have no products added in Cart </div>)
                  return(null)
                }
                setcarts(dbuser.cart)
                setdisplay(dbuser.cart.map(item =>{
                  console.log(item.category)
                  return(
                    <CartProduct category = {item.category} id = {item.id} />
                  )
                }))
                console.log(dbuser.cart)
              }
            }  )
        })


    }




useEffect(()=>{

  if (!user){
    alert("please Login to proceed");
    // navigate("/home")
  }
  else{
    fetchUser()


  }
},[])



// useEffect(()=>{
//     fetchUser();
//
// },[uid])

return(
    <>
    <Header/>
    {display}
    </>
)
}
export default CartPage;
