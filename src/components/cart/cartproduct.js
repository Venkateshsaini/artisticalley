import React ,{useEffect, useState} from 'react';
import Loader from '../loader/Loader';
import {db} from '../../firebase';
const CartProduct = (props) =>{
  const [id,setprodid] = useState(props.id)
    const [loading,setloading] = useState(<Loader/>)
    const [products,setproducts] = useState([]);
    const [productscomponent,setproductscomponent] = useState( <Loader/> )
    const [category,setcategory] = useState(props.category)
    const [total,settotal] = useState(0)
    const fetchProducts = async() =>{
      const response = db.collection(`${category}`.toString());
      const data = await response.get()

      data.docs.forEach(item =>{
        const tmp = products;

        tmp.push(item.data())
        setproducts(tmp)

        setproductscomponent(tmp.map(product=>{
          props.settotal(prev=>prev+product.price);
            if (product.id === id){
              settotal(total+Number(product.price));   
              return(
              <div  key = {product.id} className = "flex flex-row justify-around bg-gray-400 my-10 mx-10 rounded-full py-5 h-full">
              <div className="flex-none w-48 relative">

                <img src= {product.img} alt="" className=" inset-0 w-full h-full " />
              </div>
                  <div className = "flex flex-col">
                      <div className = "text-black font-semibold text-xl text-center">{product.name}</div>
                      <div >{product.description} </div>
                  </div>
                  <div className = "flex flex-col justify-around ">
                      <div className = "text-xl"> ${product.price} </div>
                      <button className = "bg-red-800 text-white font-semibold  py-3 px-3 rounded-full">Delete</button>
                  </div>
              </div>
              )

            }


        }))

      })
    }
    useEffect(()=>{
        fetchProducts();

    },[])
return(
productscomponent
)
}

export default CartProduct;
