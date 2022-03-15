import React from 'react';

const Checkout = (props) =>{


    return(
        <>
    {props.showcheckout &&
      <div className='bg-gray-400'>
          <div className='flex flex-row justify-center'>
        <div className='text-black font-semibold text-2xl my-3'>Total Items: </div>
        <div className='text-brown-500 font-semibold text-2xl my-3 mx-3 '>1</div> 
        </div>
        <div className='flex flex-row  justify-center'>
        <div className='text-black font-semibold text-2xl my-3'>Total Cost :  </div>
        <div className='text-brown-500 font-semibold text-2xl my-3 mx-3'>${props.total}</div> 
        </div>
        <div className='flex flex-row justify-center'>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-black  font-semibold text-2xl bg-white dark:bg-white rounded-md group-hover:bg-opacity-0 hover:text-white">
         CHECKOUT &gt;
      </span>
    </button>
    </div>
    </div>
       }
       </>
    )


    

}

export default Checkout;