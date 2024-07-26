import express from 'express'
import { UserAuthentication , UserSecretKey} from '../auth/auth.js'
import { users , courses } from '../model/db.js'
import jwt from 'jsonwebtoken'
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
            let key=jwt.sign({newUser},UserSecretKey)
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
        let key=jwt.sign({user},UserSecretKey)
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

