import React from 'react';
import Category from './categorycard';

import Header from '../header/header';
const Home = () =>{

return(
 <>
 <Header/>
<div className = "flex flex-row flex-wrap justify-around my-2 ">
  {[{name:"clothing",tags:["clothes","hand-made","summer"],desc:"Looking for a new outfit to take your style up a notch? Check out the amazing range of handloom clothes online collections at Artistic Alley – perfect for any occasion!"},
  {name:"pottery",tags:["pottery","ceramic","ancient"],desc:"Looking for Handmade Pottery Items ? Shop with us for premium range of handmade earthenware, porcelain & stoneware pottery directly from sellers"},
  {name:"jewellery",tags:["gold","ornaments","silver"],desc:"A one stop destination to shop stunning  Indian Jewellery Designs. Shop the best of neckace,earrings,bangles,chokers and lot more "}].map((item,index)=>(      <Category key= {index} title={item.name} tags = {item.tags} desc = {item.desc} />
  ))}
</div>

 </>


)
}
export default Home;
