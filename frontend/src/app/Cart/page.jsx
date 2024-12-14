"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
const page = () => {
    const [data, setdata] = useState([])
   
    useEffect(()=>{
        const getData=async()=>{
            const response=await axios.get("http://localhost:5000/api/users/cartdata")
            if(response){
                console.log(response)


                setdata(response.data)
            }
        }
        getData();
    },[])
  return (
    <div>
        {data.map((data,index)=>(<div className='productCard' key={index}>

<div className='productImage'><img src={data.cartProduct.product_photo} alt="" /></div>
<div className='productData'>
<h1 key={index}>{data.cartProduct.product_title}</h1>
<h2>{data.cartProduct.product_price}</h2>
<h2>Quantity :{data.quantity}</h2>
<h3>Rating : {data.cartProduct.product_star_rating
}</h3>
<a href={`/Checkout/${data.cartProduct._id}`}>

    <button  className='bg-blue-500 text-white p-2 rounded-md mt-3'>view</button>

    </a>
</div>
</div>
))}
    </div>
  )
}

export default page