import React,{useEffect, useState} from 'react';
import {db} from '../../firebase';

const DashBoardProduct = (props) =>{
  const [name,setname] = useState("");
  const [price,setprice] = useState(0);
  const [imgurl,setimgurl] = useState("")
const cat= props.product.category;
const id = props.product.id;
const fetchProducts = async() =>{

    const response = db.collection(`${cat}`);
    const data = await response.get()
    data.docs.forEach(item=>{
      if (item.data().sellerid === id){
        setname(item.data().name)
      setprice(item.data().price)
            setimgurl(item.data().img)
      }

    })


}
useEffect(()=>{
    fetchProducts();

},[])
return(
  <div className = "flex flex-row justify-around">
  <div>
<img src = {imgurl} alt = "img"/>
</div>
<div className = "flex flex-col justify-around">
<div>{name}</div>
<div>{price} </div>
</div>
  </div>
)
}
export default DashBoardProduct;
