import React,{useEffect, useState} from 'react';
import {db} from '../../firebase';
import Preview from './productpreview';
import { storage } from '../../firebase';
import Header from '../header/header';
import {useParams} from 'react-router';
import Loader from '../loader/Loader'
const CategoryPage = () =>{
    const [products,setproducts] = useState([]);
    const [productscomponent,setproductscomponent] = useState( <Loader/> )
const {categoryid} = useParams()
const category = categoryid
const [imgurl,setimgurl] = useState();
    const fetchProducts = async() =>{
        const response = db.collection(`${category}`.toString());
        const data = await response.get()

        data.docs.forEach(item=>{
            const tmp = products;
            tmp.push(item.data())
            setproducts(tmp)
            setproductscomponent( tmp.map(product=>{
                console.log(products)
                    return(
                        <div>
                        <div key = {product.name} >
                             <Preview name = {product.name} instock = {true} price = {product.price} seller = {product.seller} img = {product.img} />


                        </div>
                        </div>
                    )
                }))
        })


    }

    useEffect(()=>{
        fetchProducts();

    },[category])


  return(
      <>
      <Header/>
      <div className = "flex flex-col justify-around ">
      <div className = "flex flex-row justify-around align-center flex-wrap">

   { productscomponent}

     </div>
     </div>
     </>
  )




}
export default CategoryPage;
