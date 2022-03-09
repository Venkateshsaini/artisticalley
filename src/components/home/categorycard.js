import React from "react";
import clothing from '../../assets/home/clothing.jpg';
import pottery from '../../assets/home/pottery.jpg';
import jewellery from '../../assets/home/jewellery.jpg';

import { NavLink } from "react-router-dom";
const Category = (props) =>{
  let imgsrc = "";
if (props.title === "clothing"){
  imgsrc = clothing;
}
else if (props.title === "pottery"){
imgsrc = pottery;
}
else{
  imgsrc = jewellery ;
}

return(
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={imgsrc} alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{props.title}</div>
    <p className="text-gray-700 text-base">
    {props.desc}
    </p>
  </div>
  <NavLink to = {`/category/${props.title}`}>
  <div className = "flex flex-row justify-around">
  <button className = "bg-black text-white font-semibold rounded-full py-2 px-3">Explore</button> </div></NavLink>
  <div className="px-6 pt-4 pb-2 flex flex-row justify-around mx-3">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{props.tags[0]}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{props.tags[1]}</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{props.tags[2]}</span>
  </div>
</div>
)

}
export default Category;
