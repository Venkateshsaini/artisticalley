import React from 'react';

const ProductMain = () =>{

return(
    <div className='flex flex-row justify-evenly flex-nowrap'>
        <div >
         
        </div>
        <div className='flex flex-col justify-evenly'>
            <div className='flex flex-col'>
                <div className='text-black font-bold'>Brown Traditional Pot</div>
                <div className='text-black font-bold'> (Pottery)</div>
            </div>
            <div className='flex flex-col justify-evenly'>
                <div className='text-black font-semibold'>MRP: $100</div>
                <div className='bg-green-400 font-semibold text-center py-1 px-1'>In Stock</div>
                <div className='flex flex-row justify-evenly'>
                    <button className = "bg-gray-800 px-3 py-3 text-white my-2 mx-2 rounded-full">Add to Cart</button>
                    <button className = "bg-black px-3 py-3 text-white mx-2 my-2 rounded-full">Buy Now</button>
                </div>
            </div>


        </div>


    </div>
)
}
export default ProductMain;