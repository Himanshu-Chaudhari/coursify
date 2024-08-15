import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'
export const userSchema=mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type: mongoose.Schema.Types.ObjectId , ref:'courses'}]
})

export const adminSchema=mongoose.Schema({
    username:String,
    password:String
})

export const transactionSchema=mongoose.Schema({
    User : String,
    razorpay_order_id : String,
    razorpay_payment_id : String,
    razorpay_signature : String
})

export const courseSchema=mongoose.Schema({
    admin: String,
    title : String,
    description : String,
    price : Number,
    imageLink : String, 
    published : Boolean 
})

//Defining the mongoose model
export const users=mongoose.model('users',userSchema);
export const admins=mongoose.model('admins',adminSchema);
export const courses=mongoose.model('courses',courseSchema);
export const transaction=mongoose.model('transaction',transactionSchema)

mongoose.connect(process.env.DATABASE_URL)

