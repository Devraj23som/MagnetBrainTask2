"use client"
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    var iddata = useParams();

    const [data, setdata] = useState([])
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51QVo4xKPrNKNP5sGV2wA1Zqa2rqe1PZQdkpI1M35501iMTbL4NctGA6gNVuqONuEE60yuEBtsHFpM78zndXXxxLT00DE2SIj4u")
        const body = {
            products: data,
        }
        const header = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:5000/api/users/createCheck", {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error("Failed to create checkout session.");
        }
        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }

    }
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:5000/api/users/productdata/${iddata.id}`)
            if (response.ok) {
                console.log(response.data)


            }
            setdata(response.data)
        }
        getData();
    }, [])
    return (

        <div id='25' key={2}> {data.map((data, index) => (
   <>
<div className='productCard' key={index}>
<div className='productImage' key={index}><img src={data.product_photo} alt="" /></div>
<div className='productData' key={index}>
<h1 key={index+6}>{data.product_title}</h1>
<h2>{data.product_price}</h2>

<h3 key={index +5}>Rating : {data.product_star_rating
}</h3>
   
     <button key={index} onClick={makePayment}  className='bg-blue-500 text-white p-2 rounded-md mt-3'>buy</button>
        </div>
        </div>
   </>   
        ))}</div>
    )
}

export default page