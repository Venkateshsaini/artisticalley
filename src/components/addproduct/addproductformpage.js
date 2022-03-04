import React, { useState ,useRef} from 'react';
import Header from '../header/header';
import { db, storage } from '../../firebase';

import { Control, LocalForm, Errors } from "react-redux-form";
import { Navigate, useNavigate } from 'react-router';
const AddProduct = () =>{
    const [category,setcategory] = useState("")
    const [price,setprice] = useState(0)
    const [description,setdescription] = useState("")
    const [name,setName] = useState("")
    const [image,setimage] = useState(null)
    const [imageerror,setimagerror] = useState("")
    const [uploadError,setUploadError] = useState("")
    let navigate = useNavigate()
    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    const required = (val) => val && val.length;
    const minprice = (min) => (val) => val && Number(val)>=min;
    const maxprice = (max) => (val) => val && Number(val)<=max;

    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        const uploadTask=storage.ref(`pottery/craftzltd001/productimg`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('pottery/craftzltd001/productimg').getDownloadURL().then(url=>{
                db.collection('pottery').add({
                    name:name,
                    description:description,
                    price: Number(price),
                    img:url,
                    category:category,
                    seller:'Craftsz Ltd'
                }).then(()=>{
                    alert("product added");
                    navigate('/home')
                }).catch(error=>setUploadError(error.message));
            })
        })
    }
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setimage(selectedFile);
                setimagerror('');
            }
            else{
                setimage(null);
                setimagerror('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mail = (val) => val && val.match(mailformat);
    return(
<>
<Header/>
<LocalForm>
    {uploadError}
<div className = "flex flex-col justify-between my-10 mx-10 ">
    <div className = "text-black font-semibold text-3xl my-10">Let's move to the next step..</div>
    <div className = "text-black text-xl ">Enter the name of your product</div>
    <Control.text
            model=".name"
            onChange = {(e)=>setName(e.target.value)}
            id="name"
            name="name"
            className="bg-gray-300 w-3/6"
            validators={{
              required,
              minLength: minLength(5),
              maxLength: maxLength(40),
            }}
          />
          <Errors
            className="text-red-800 font-semibold"
            model=".name"
            show="touched"
            messages={{
              required: "Required!",
              minLength: "Name must be atleast 5 characters..",
              maxLength: "Name must be less than 40 characters",
            }}
          />
    <div className = "text-black text-xl my-3 ">Select the Product Category from below list</div>
<Control.select model = ".category" id = "category" className = "bg-gray-300 w-3/6 font-semibold"  onChange = {(e)=>setcategory(e.target.value)}>
<option value = "pottery">Pottery</option>
<option value = "jewellery">Jewellery</option>
<option value = "clothing">Clothing</option>
<option value = "homedecor">Home Decor</option>
</Control.select>
<div className = "text-black text-xl my-3 ">Description of the product (External Links are not allowed) </div>
<Control.textarea model = ".description" id = "description"  onChange = {(e)=>setdescription(e.target.value)} className = "bg-gray-300 w-4/6"  validators={{
              required,
              minLength: minLength(25),
              maxLength: maxLength(100),
            }}/>
<Errors
            className="text-red-800 font-semibold"
            model=".description"

            show="touched"
            messages={{
              required: "Required!",
              minLength: "Description must be atleast 25 characters..",
              maxLength: "Description must be less than 100 characters",
            }}
          />

<div className = "text-black text-xl my-3 ">Set the Price expected for a single product(Read terms and conditions)</div>
<Control.text model = ".price" id = "price" className = "bg-gray-300 w-2/6" onChange = {(e)=> setprice(e.target.value)}  validators={{
              required,
              minprice: minprice(100),
              maxprice: maxprice(10000),
            }}/>
<Errors
            className="text-red-800 font-semibold"
            model=".price"

            show="touched"
            messages={{
              required: "Required!",
              minprice: "Minimum price must be 100",
              maxprice: " Seller not authorized to sell products more than 10000 ",
            }}
          />
<div className = "text-black text-xl my-3 ">Upload the product's main profile image </div>
<form onSubmit={handleAddProducts}>
<input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>
<div className = "text-red-800 font-semibold">{imageerror}</div>

{/* <div className = "text-black text-xl my-3 ">Upload the product's promotional images for carousels visible to users </div>  */}
</form>
</div>

<button onClick = {handleAddProducts}>SUBMIT</button>

</LocalForm>
</>
    )
}
export default AddProduct;
