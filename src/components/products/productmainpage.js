import React ,{useEffect, useState} from 'react';
import { db } from '../../firebase';
import Header from '../header/header';
import Loader from '../loader/Loader';
import Productcarousel from './carousel';
import {useParams} from 'react-router';

const ProductMain = () =>{

// const prodid = "B2h6JYzxG7Ek9FYY7wHf";
// const category = "pottery";
const {category,productid} = useParams();
const [loading,setloading] = useState(true)
const [prod,setprod] = useState([])
const fetchProducts = async() =>{
    const response = db.collection(`${category}`.toString());
    const data = await response.get()

    data.docs.forEach(item=>{
        if (item.id.toString() === productid){
            setprod(item.data())
            // console.log(prod.name)
            setloading(false)
        }

    })
}
    useEffect(()=>{
        fetchProducts();

    },[])

return(
    <>
    {loading && <Loader/>}
    { !loading && <>
    <Header/>
    <div className="flex flex-row text-black font-bold text-4xl my-5  justify-center">Know More about the product ..</div>
    <div className='flex flex-row justify-evenly flex-nowrap my-5' >
        <div className='bg-gray-500 py-3 px-3 rounded-xl'>
         <Productcarousel images ={ [prod.carousel1,prod.carousel2,prod.carousel3,prod.carousel4] }/>
        </div>
        <div className='flex flex-col justify-evenly h-96 bg-gray-500 p-3 rounded-xl'>
            <div className='flex flex-col bg-gray-300 p-3 rounded-xl'>
                <div className='text-black font-bold'> {prod.name} </div>
                <div className='text-black font-bold'> ({prod.category})</div>
            </div>
            <div className='flex flex-col justify-evenly bg-gray-300 p-3 rounded-xl'>
                <div className='text-black font-semibold'>MRP: ${prod.price} </div>
                <div className='bg-green-400 font-semibold text-center py-1 px-1'>In Stock</div>
                <div className='flex flex-row justify-evenly'>
                    <button className = "bg-gray-800 px-3 py-3 text-white my-2 mx-2 rounded-full">Add to Cart</button>
                    <button className = "bg-black px-3 py-3 text-white mx-2 my-2 rounded-full">Buy Now</button>
                </div>
            </div>


        </div>


    </div>
    </>}
    </>
)
}
export default ProductMain;