import React, { useState ,useRef} from 'react';
import Header from '../header/header';
import Loader from '../loader/Loader'
import { db, storage } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Navigate, useNavigate } from 'react-router';
import { auth } from "../../firebase";
const AddProduct = () =>{

  const [user] = useAuthState(auth)
    const [category,setcategory] = useState("pottery")
    const [price,setprice] = useState("")
    const [description,setdescription] = useState("")
    const [name,setname] = useState("")
    
    const [image,setimage] = useState(null)
    const [carousel1,setcarousel1] = useState(null)
    const [carousel2,setcarousel2] = useState(null)
    const [carousel3,setcarousel3] = useState(null)
    const [carousel4,setcarousel4] = useState(null)
    const [imageerror,setimagerror] = useState("")
    const [uploadError,setUploadError] = useState("")
    let navigate = useNavigate()
    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    const required = (val) => val && val.length;
    const minprice = (min) => (val) => val && Number(val)>=min;
    const maxprice = (max) => (val) => val && Number(val)<=max;


    if(!user){
      alert("Please Login to continue");
      navigate('/home');
    }


    const handleAddProducts=(e)=>{
      setsubmitbutton(<Loader/>)
      const key = name.replace(/\s/g, "")
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        let dp_url , c1_url,c2_url,c3_url,c4_url;
        const uploadDp=storage.ref(`${category}/${key}/productimg`.toString()).put(image);
        const uploadC1=storage.ref(`${category}/${key}/carousel1`.toString()).put(carousel1);
        const uploadC2=storage.ref(`${category}/${key}/carousel2`.toString()).put(carousel2);
        const uploadC3=storage.ref(`${category}/${key}/carousel3`.toString()).put(carousel3);
        const uploadC4=storage.ref(`${category}/${key}/carousel4`.toString()).put(carousel4);
        uploadDp.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref(`${category}/${key}/productimg`.toString()).getDownloadURL().then(url=>{
              dp_url=url;
            })
        })

        uploadC1.on('state_changed',snapshot=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          console.log(progress);
      },error=>setUploadError(error.message),()=>{
          storage.ref(`${category}/${key}/carousel1`.toString()).getDownloadURL().then(url=>{
            c1_url=url;
          })
      })

      uploadC2.on('state_changed',snapshot=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(progress);
    },error=>setUploadError(error.message),()=>{
        storage.ref(`${category}/${key}/carousel2`.toString()).getDownloadURL().then(url=>{
          c2_url=url;
        })
    })

    uploadC3.on('state_changed',snapshot=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      console.log(progress);
  },error=>setUploadError(error.message),()=>{
      storage.ref(`${category}/${key}/carousel3`.toString()).getDownloadURL().then(url=>{
        c3_url=url;
      })
  })

  uploadC4.on('state_changed',snapshot=>{
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
    console.log(progress);
},error=>setUploadError(error.message),()=>{
    storage.ref(`${category}/${key}/carousel4`.toString()).getDownloadURL().then(url=>{
      c4_url=url;
    })
})

db.collection(`${category}`.toString()).add({
          name:name,
          description:description,
          id:Date.now().toString(36) + Math.random().toString(36).substr(2),
          price: Number(price),
          img:dp_url,
          carousel1:c1_url,
          carousel2:c2_url,
          carousel3:c3_url,
          carousel4:c4_url,
          category:category,
          seller:'Craftsz Ltd'
      }).then(()=>{
          alert("product added");
          setsubmitbutton(<div className = " text-black font-semibold rounded-full px-2 py-2" >PRODUCT ADDED !!</div>)
          navigate('/home')
      }).catch(error=>setUploadError(error.message) );

    }
        const [submitbutton,setsubmitbutton] = useState()
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
    const handleCarousel1=(e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
          if(selectedFile&&types.includes(selectedFile.type)){
              setcarousel1(selectedFile);
              setimagerror('');
          }
          else{
              setcarousel1(null);
              setimagerror('please select a valid image file type (png or jpg)')
          }
      }
      else{
          console.log('please se  23lect your file');
      }
  }
  const handleCarousel2=(e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
        if(selectedFile&&types.includes(selectedFile.type)){
            setcarousel2(selectedFile);
            setimagerror('');
        }
        else{
            setcarousel2(null);
            setimagerror('please select a valid image file type (png or jpg)')
        }
    }
    else{
        console.log('please select your file');
    }
}
const handleCarousel3=(e)=>{
  let selectedFile = e.target.files[0];
  if(selectedFile){
      if(selectedFile&&types.includes(selectedFile.type)){
          setcarousel3(selectedFile);
          setimagerror('');
      }
      else{
          setcarousel3(null);
          setimagerror('please select a valid image file type (png or jpg)')
      }
  }
  else{
      console.log('please select your file');
  }
}
const handleCarousel4=(e)=>{
  let selectedFile = e.target.files[0];
  if(selectedFile){
      if(selectedFile&&types.includes(selectedFile.type)){
          setcarousel4(selectedFile);
          setimagerror('');
      }
      else{
          setcarousel4(null);
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
<div className = "flex flex-col justify-between my-10 mx-10 border-8 p-5">
    <div className = "text-black font-semibold text-3xl my-10">Let's move to the next step..</div>
    <div className = "text-black text-xl ">Enter the name of your product</div>
    <Control.text
            model=".name"
            onChange = {(e)=>setname(e.target.value)}
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

<div className = "text-black text-xl my-3 ">Upload the product's promotional images for carousels visible to users (must be in different angles)</div> 
<input type="file" id="file1" className='form-control' required
                onChange={handleCarousel1}></input>
                <input type="file" id="file2" className='form-control' required
                onChange={handleCarousel2}></input>
                <input type="file" id="file3" className='form-control' required
                onChange={handleCarousel3}></input>
                        <input type="file" id="file4" className='form-control' required
                onChange={handleCarousel4}></input>
</form>
</div>
<div className = "flex flex-row justify-around  ">
<button className = "bg-black text-white font-semibold rounded-full px-2 py-2" onClick = {handleAddProducts}>SUBMIT</button>
{submitbutton}
</div>
<br/><br/>
</LocalForm>
</>
    )
}
export default AddProduct;
