import React,{useEffect, useState} from 'react';
import {db} from '../../firebase';
import Preview from './productpreview';
import { storage } from '../../firebase';
import Header from '../header/header';
const CategoryPage = () =>{
    const [products,setproducts] = useState([]);
const category = "pottery"
const [imgurl,setimgurl] = useState();
    const fetchProducts = async() =>{
        const response = db.collection(`${category}`);
        const data = await response.get()
        data.docs.forEach(item=>{
            const tmp = products;
            tmp.push(item.data())
            setproducts(tmp)
        })
        storage.refFromURL(`gs://artistic-alley-official.appspot.com/${category}/craftzltd000/productimg.jpg/`).getDownloadURL().then((url)=>setimgurl(url));

    }

    useEffect(()=>{
        fetchProducts();

    },[])
const productscomponent =  products.map(product=>{
    console.log(products)
        return(
            <div>
            <div key = {product.name} >
                 <Preview name = {product.name} instock = {true} price = {product.price} seller = {product.seller} img = {product.img} />
                 {/* <img src = {imgurl}/> */}

            </div>
            </div>
        )
    })


return(
    <>
    <Header/>
    <div className = "flex flex-row justify-around w-5/6">
    <div className = "flex flex-col justify-around align-center">

 { productscomponent}

   </div>
   </div>
   </>
)


}
export default CategoryPage;
