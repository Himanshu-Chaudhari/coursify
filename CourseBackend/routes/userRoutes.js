import express from 'express'
import { UserAuthentication} from '../auth/auth.js'
import { users , courses, transaction } from '../model/db.js'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import crypto from 'crypto'
export const userRouter = express.Router()

userRouter.post('/signup', async (req,res)=>{
    let username=req.headers.username;
    let password=req.headers.password;
    const user = await users.findOne({username})
    if(user){
        return res.status(203).send("Username already taken")
    }
    else{
        try{
            const user = new users({username : username , password : password})
            await user.save()
            let key=jwt.sign({user},process.env.USER_SECRET_KEY)
            return res.status(200).json({"message":"User created successfully with token ",'token':key})
        }catch(err){
            console.log(err)
            return res.json({"err":err})
        }
    }
})

userRouter.post('/login',async(req,res)=>{
    // logic to login user
    console.log(req.username)
    let user=await users.findOne({username : req.headers.username, password : req.headers.password})
    if(user){
        let key=jwt.sign({user},process.env.USER_SECRET_KEY)
        return res.status(200).json({"message":"User Found",'token':key})
    }else{
        return res.status(403).json({"message":'User Not Found'})
    }
})

userRouter.get('/courses',UserAuthentication, async (req,res)=>{
    try{
        let course = await courses.find()
        return res.json(course)
    }catch(err){
        return res.json({"err":err})
    }
})

userRouter.post('/course/:courseId',UserAuthentication,async (req,res)=>{
    try {
        const course = await courses.findById(req.params.courseId);
        if (!course) {
            return res.status(204).json({"message":"Course not found"});
        }
        const user = await users.findOne({ username: req.user.user.username});
        if (!user) {
            return res.status(205).json({"message":"User not found"});
        }
        let found = user.purchasedCourses.find(a => a._id.toString() === course._id.toString());
        console.log(found)
        if(found){
            return res.status(206).json({"message":"Course Already Purchased"})
        }
        user.purchasedCourses.push(course._id);
        await user.save();
        res.status(200).send("Course purchased successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json({"message":error});
    }
})

userRouter.get('/purchasedCourses',UserAuthentication,async (req,res)=>{
    // logic to return all purchased courses
    console.log(req.user.user.username)
    let user=await users.findOne({username : req.user.user.username}).populate('purchasedCourses')
    if(user){
        return res.json({purchasedCourses : user.purchasedCourses || []})
    }
    else{
        return res.status(204).json({"message":"User not found"});
    }
})

const instance = new razorpay({
    key_id: 'rzp_test_msaHjyunCQpWI7',
    key_secret : '9Q3nVuZoAvbT2T3vq7MFuJ3y',
})

userRouter.post("/checkout",UserAuthentication,async (req,res)=>{
    try {
        const options = {
            amount: req.body.amount*100,
            currency: "INR"
        };
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Internal Server Error");
    }
})

userRouter.post('/paymentverification',UserAuthentication,async (req,res)=>{
    // console.log(req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        // Database comes here
        await transaction.create({
            User : req.user.user.username,
            razorpay_order_id : razorpay_order_id,
            razorpay_payment_id : razorpay_payment_id,
            razorpay_signature : razorpay_signature
        });
        res.status(200).json({
            success: true
        });
    } else {
        res.status(400).json({
        success: false,
        });
    }
})

userRouter.get("/getkey",(req,res)=>{
    res.json({
        key : instance.key_id
    })
})
