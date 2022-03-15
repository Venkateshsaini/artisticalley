import React, { useState } from 'react';

const Productcarousel = () =>{
    const images = ['https://firebasestorage.googleapis.com/v0/b/artistic-alley-official.appspot.com/o/pottery%2FBrowntraditionalpot%2Fcarousel1.jpg?alt=media&token=af8b0748-c103-43f7-9153-86c601dec4da',
'https://firebasestorage.googleapis.com/v0/b/artistic-alley-official.appspot.com/o/pottery%2FBrowntraditionalpot%2Fcarousel2.jpg?alt=media&token=8086668e-bd94-424b-b140-900b0a870f6b',
'https://firebasestorage.googleapis.com/v0/b/artistic-alley-official.appspot.com/o/pottery%2FBrowntraditionalpot%2Fcarousel3.jpg?alt=media&token=dbce21ec-b9df-4d04-9383-62a2324179cd'
,'https://firebasestorage.googleapis.com/v0/b/artistic-alley-official.appspot.com/o/pottery%2FBrowntraditionalpot%2Fcarousel4.jpg?alt=media&token=cdf491f9-0da0-45bd-a328-04e7baa7a96e'];
    const [index,setindex] = useState(0);
    const next = () =>{
        if (index===3){
            setindex(0);
        }
        else{
            setindex(prev=>prev+1)
        }
    }

    const prev = () =>{
        if (index === 0){
            setindex(3)
        }
        else{
            setindex(prev=>prev-1)
        }
    }
return(
<div className='flex flex-row justify-around '>
    <div className='flex flex-col justify-around' >
       <button  className=' py-3 px-3 font-bold text-3xl bg-black text-white' onClick = {prev}> &lt;&lt;</button> 
    </div>
    <div>
    <img src = {images[index]} alt = "product" className=' w-96 h-96 object-fill'/>
    </div>
    <div className='flex flex-col justify-around'>
    <button className=' py-3 px-3 font-bold text-3xl bg-black text-white'  onClick={next}>&gt;&gt;</button> 
    </div>
</div>
)
}
export default Productcarousel;