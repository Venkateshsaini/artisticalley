import React from 'react';
import Category from './categorycard';

import Header from '../header/header';
const Home = () =>{
  
return(
 <>
 <Header/>
<div className = "flex flex-row flex-wrap justify-around my-2 ">
  {["clothing","pottery","jewelley"].map((item,index)=>(      <Category key= {index} title={item} />
  ))}
</div>

 </>


)
}
export default Home;