import React,{useEffect, useState} from 'react';
import CartProduct from './cartproduct';
import Loader from '../loader/Loader';
import Header from '../header/header';
import {db} from '../../firebase';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Checkout from './checkout';
const CartPage = ()=>{
  const [uid,setuid] = useState("")
    const [user,loading] = useAuthState(auth)
    const [users,setusers] = useState([])
    const [display,setdisplay] = useState(<Loader/>)
    const [showcheckout,setshowcheckout] = useState(false)
    const [logindone,setlogindone] = useState(false)
    const [carts,setcarts] = useState([])
    const [total,settotal] = useState(0)
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
                    <CartProduct category = {item.category} id = {item.id} settotal = {settotal} />
                  )
                }))
                setshowcheckout(true)
                // console.log(dbuser.cart)
              }
            }  )
        })


    }




useEffect(()=>{

  if (user && !loading){
   
    fetchUser()
  }
  else if (!user && !loading){
 
    alert("please Login to proceed");
    navigate("/home")

  }
  else{
    return null
  }




},[user])



// useEffect(()=>{
//     fetchUser();
//
// },[uid])

return(
    <>
    <Header setlogindone = {setlogindone}/>
    <div className="flex flex-row text-black font-bold text-4xl my-4 justify-center">YOUR CART</div>
    {display}
    <Checkout total = {total} showcheckout = {showcheckout} />
  
    </>
)
}
export default CartPage;
