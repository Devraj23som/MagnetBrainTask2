// @ts-nocheck
import express from "express";

// import upload from "../middleware/upload";
import data from "../data.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Stripe from "stripe";
const router = express.Router();

const stripe=new Stripe("sk_test_51QVo4xKPrNKNP5sGowE4fnE3KamoKz35EvU14l5mjc6kJATVD8veIQBoOkrNbzaEnxJR56NTLesfMOMy4pVDBVGM00ULaMQDeb")

router.get("/",async function(req,res){
const data=await Product.find();
res.json(data)
})
router.get("/cartdata",async function(req,res){
const data=await Cart.find().populate("cartProduct");
res.status(200).json(data)
}) 
router.get("/productdata/:id",async function(req,res){
const data=await Product.find({_id:req.params.id});
console.log(data)
res.status(200).json(data)
})
router.post("/addcart/:id",async function(req,res){

  

    var productAdd= Cart.create({
      cartProduct:req.params.id
    })

res.status(200).json(productAdd)

})
router.post("/createCheck",async(req,res)=>{
  const {products} = req.body;
console.log(products ,"chal rha")

  const lineItems = products.map((product)=>({
      price_data:{
          currency:"usd",
          product_data:{
              name:product.product_title,
              images:[product.product_photo]
          },
          unit_amount:product.product_price,
       
      },
      quantity:1
     
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/sucess",
      cancel_url:"http://localhost:3000/cancel",
  });

  res.json({id:session.id})

})
// router.put("/updateProfile", authGuard, updateProfile);
// router.post(
//   "/uploadProfilePic",
//   authGuard,
//   upload.single("profilePicture"),
//   uploadProfilePic
// );
// router.get("/uploadProfilePic/:filename", getProfilePic);
// router.delete("/deleteProfilePic", authGuard, deleteProfilePic);


export default router;
