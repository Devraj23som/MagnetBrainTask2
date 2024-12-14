"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
const page = () => {
  const [data, setdata] = useState([])
  const [dataName, setdataName] = useState('')
  const Router=useRouter();
  const CardHandler=async (e)=>{
    // e.preventDefault();
   
    try {
      const response = await fetch(`http://localhost:5000/api/users/addcart/${e}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      
      });
      
      if (response.ok) {
      Router.push("/Cart")
       console.log("done!")
      } else {
        
        console.error('Login failed');
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError('Please check your email or password.');
          }
      console.error('Error logging in:', error);
    }


};
  useEffect(()=>{
    async function prodata() {
      
    
    
   
      
    try {
      const response = await axios.get("http://localhost:5000/api/users/");
      console.log(response.data
      )
      setdata(response.data)
      console.log(data , "new data")

      
    } catch (error) {
      console.error('Error fetching data:', error);
     
    }
  }  
  prodata()
},[])
  return (
    <div>

      {data.map((data,index)=>(<div className='productCard' key={index}>

        <div className='productImage'><img src={data.product_photo} alt="" /></div>
       <div className='productData'>
       <h1 key={index}>{data.product_title}</h1>
       <h2>Price :${data.product_price}</h2>
       <h3>Rating : {data.product_star_rating
       }</h3>
       <button onClick={()=>CardHandler(data._id)} className='bg-blue-500 text-white p-2 rounded-md mt-3'>Add to cart</button>
       </div>
      </div>
      ))}

    </div>
  )
}

export default page
