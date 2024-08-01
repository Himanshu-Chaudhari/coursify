import express from 'express'
import { users ,admins , courses } from '../model/db.js'
import jwt from 'jsonwebtoken'
import { AdminAuthentication} from '../auth/auth.js'
export const adminRouter = express.Router()

adminRouter.post('/signup',async (req,res)=>{
    let username=req.headers.username;
    let password=req.headers.password;
    console.log('here')
    const admin = await admins.findOne({ username });
    if(admin){
        console.log(admin)
        res.status(203).send('Admin already exists')
    }
    else{
        let newAdmin = new admins({username,password})
        await newAdmin.save()
        let key=jwt.sign({newAdmin},process.env.ADMIN_SECRET_KEY)
        return res.status(200).json({"message":"Admin created successfully with token ",'token':key})
    }
})

adminRouter.post('/login' ,async (req,res)=>{
    let username=req.headers.username
    const admin = await admins.findOne({ username })
    if(admin){
        if(admin.password != req.headers.password){
            return res.status(203).json({"message" : "Wrong Password"})
        }
        let key=jwt.sign({admin},process.env.ADMIN_SECRET_KEY)
        return res.status(200).json({"message":"Admin found",'token':key})
    }else{
        res.status(204).send('Admin Not Found')
    }
})

adminRouter.post('/courses',AdminAuthentication, async (req,res)=>{
    let body=req.body
    body.admin=req.user.newAdmin.username;
    const course= new courses(body)
    await course.save()
    console.log(course)
    res.json({message : 'Course Added with id :- ' , courseId : course.id})
})

adminRouter.post('/courses/:courseId',AdminAuthentication, async (req,res)=>{
    let course= await courses.findByIdAndUpdate(req.params.courseId , req.body , { new : true } )
    if(course){
        console.log(course)
        res.send("Course updated successfully ")
    }
    else{
        res.status(403).send("Course not found ")
    }
}) 

adminRouter.get('/courses',AdminAuthentication, async (req,res)=>{
    const course = await courses.find({admin : req.user.newAdmin.username}).populate();
    res.json({ "courses" : course})
})

adminRouter.delete('/courses/:courseId',AdminAuthentication,async(req,res)=>{
    let response= await courses.findByIdAndDelete(req.params.courseId)
    console.log(response);
    return res.json({"message":"Couse Deleted"})
})
