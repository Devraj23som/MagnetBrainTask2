import { Schema, model } from "mongoose";
// import * as bcrypt from "bcryptjs"
import pkg from "bcrypt";
const { compare, hash } = pkg;
// import { compare ,hash } from "bcrypt";
import jwt from "jsonwebtoken";
// import { compare } from "bcryptjs";

const OrderSchema = new Schema(
  {
    purchasedItem: {
        type:String,
    },
        paymentStatus:{
        type:String,
    } ,
       transectionId: {
        type:String,
    },
        customerEmail: {
        type:String,
    },
       
  }
);



const Order = model("Order", OrderSchema);
export default Order;