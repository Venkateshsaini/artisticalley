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
            if (product.id === id){
              settotal(total+= Number(product.price));
              return(
              <div  key = {product.id} className = "flex flex-row justify-around bg-gray-400 my-10 mx-10 rounded-full py-5">
              <div className="flex-none w-48 relative">
              {loading}
                <img src= {product.img} alt="" className="absolute inset-0 w-full h-full object-cover" onLoad = {()=>setloading(null)}  />
              </div>
                  <div className = "flex flex-col">
                      <div className = "text-black font-semibold text-xl text-center">{product.name}</div>
                      <div >"" </div>
                  </div>
                  <div className = "flex flex-col ">
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

    },[id])
return(
<div className = "flex flex-row justify-around bg-gray-400 my-10 mx-10 rounded-full py-5">
<div className="flex-none w-48 relative">
{loading}
  <img src="#" alt="" className="absolute inset-0 w-full h-full object-cover" onLoad = {()=>setloading(null)}  />
</div>
    <div className = "flex flex-col">
        <div className = "text-black font-semibold text-xl text-center">Text 1</div>
        <div >Text2</div>
    </div>
    <div className = "flex flex-col ">
        <div className = "text-xl">$1000</div>
        <button className = "bg-red-800 text-white font-semibold  py-3 px-3 rounded-full">Delete</button>
    </div>
</div>
)
}

export default CartProduct;
