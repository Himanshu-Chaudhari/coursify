import express from 'express'
import { UserAuthentication} from '../auth/auth.js'
import { users , courses } from '../model/db.js'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
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
            const newUser = new users({username : username , password : password})
            await newUser.save()
            let key=jwt.sign({newUser},process.env.USER_SECRET_KEY)
            return res.status(200).json({"message":"User created successfully with token ",'token':key})
        }catch(err){
            console.log(err)
            return res.json({"err":err})
        }
    }
})

userRouter.post('/login',async(req,res)=>{
    // logic to login user
    let user=await users.findOne({username : req.user.username, password : req.user.password})
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
        const user = await users.findOne({ username: req.user.newUser.username});
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
    console.log(req.user.newUser.username)
    let user=await users.findOne({username : req.user.newUser.username}).populate('purchasedCourses')
    console.log(user.purchasedCourses)
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


userRouter.post("/checkout",async (req,res)=>{
    try {
        const options = {
            amount: req.body.amount*100,
            currency: "INR"
        };
        const order = await instance.orders.create(options);
        console.log(order);
        res.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Internal Server Error");
    }
})

userRouter.get("/getkey",(req,res)=>{
    res.json({
        key : instance.key_id
    })
})
