import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import { auth } from "../../firebase";
import Loader from '../loader/Loader';
import { useParams } from 'react-router';
import {db} from '../../firebase';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Payment from './payment';

const PurchasePage = () =>{
 const [display,setdisplay] = useState(<Loader/>)
const {productid} = useParams()
const [price,setprice] = useState(999);
const [uid,setuid] = useState("")
const [user,loading] = useAuthState(auth)
const [users,setusers] = useState([])
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
      
        dbuser.cart.map(item =>{
            console.log(item.id ,productid)
          if (item.id === productid){
              async function fetchdetails(){
                const response2 = db.collection(`${item.category}`.toString());
                const data2 = await response2.get()
                data2.docs.forEach(item =>{
                    const list = []
                    list.push(item.data())
                    list.forEach(product=>{
                      
                        if (product.id === productid){
                          setprice(product.price);
                            setdisplay(paymentscreen)
            
                        }
            
            
                    })
            
                  })
              }
              fetchdetails()
      
          }
        })
        // setshowcheckout(true)
        // console.log(dbuser.cart)
      }
    }  )
})}

    const paymentscreen = () =>{
        return(
            <div>
                <Header/>
                <div className='flex m-3 border-4 border-gray-900 flex-col justify-center'>
                    <div className='text-black font-semibold text-3xl m-3 text-center'>
        
                        Payment 
                    </div>
                    <div className='text-gray-600 text-xl m-3 flex flex-row justify-center'>
                        Total payment for the order:-
                        <div className='ml-2 text-green-600 font-semibold' >INR. {price} (Incl. GST and other tax)</div>
                    </div>
                    <div className='flex flex-row justify-evenly'>
                    <Payment price = {price}/>
        </div>
                </div>
            </div>
        )
        }
        useEffect(()=>{
            setdisplay(paymentscreen)
        },[])
    
    // useEffect(()=>{

    //     if (user && !loading){
         
    //       fetchUser()
    //     }
    //     else if (!user && !loading){
       
    //       alert("please Login to proceed");
    //       navigate("/home")
      
    //     }
    //     else{
    //       return null
    //     }
      
    //   },[user])
return(display)
}
export default PurchasePage;