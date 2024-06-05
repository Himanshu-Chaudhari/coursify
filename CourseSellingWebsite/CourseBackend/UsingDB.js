const express = require('express')
const app=express()
const port=3000
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const cors=require('cors')
app.use(cors())
const mongoose=require('mongoose')
// const { Link } = require('react-router-dom')


AdminSecretKey="AdminSecretKey"
UserSecretKey="UserSecretKey"


// Creating Schema for moongo database

const userSchema=mongoose.Schema({
    // username:{type : String } is similar to below line
    username:String,
    password:String,
    purchasedCourses:[{type: mongoose.Schema.Types.ObjectId , ref:'Course'}]
})

const adminSchema=mongoose.Schema({
    username:String,
    password:String
})

const courseSchema=mongoose.Schema({
    admin: String,
    title : String,
    description : String,
    price : Number,
    imageLink : String, 
    published : Boolean 
})

//Defining the mongoose model

const users=mongoose.model('users',userSchema);
const admins=mongoose.model('admins',adminSchema);
const courses=mongoose.model('courses',courseSchema);

mongoose.connect('mongodb+srv://himanshuchaudhari8561:%40Himanshu183%40@cluster0.qs7pwzm.mongodb.net/CourseSellingWebsite')

let AdminAuthentication = (req,res,next) => {
    // let admin=admins.find(a => a.username == req.headers.username && a.password == req.headers.password)
    let key=req.headers.key
    if(key){
        jwt.verify(key,AdminSecretKey,(err,user)=>{
            if(err){
                res.send(err)
            }
            req.user=user
            console.log(user)
        })
        next();
    }
    else{
        res.status(401).send('Admin authentication failed')
    }
}

let UserAuthentication=(req,res,next)=>{
    // let user=users.find(a => a.username == req.headers.username && a.password == req.headers.password)
    let key=req.headers.key
    if(key){
        jwt.verify(key,UserSecretKey,(err,user)=>{
            if(err){
                res.send(err)
            }
            req.user=user
            // console.log(req.user)
        })
        next();
    }else{
        res.status(404).send('User authentication failed')
    }
}

// Admin route
app.post('/admin/signup',async (req,res)=>{
    // Admin sign up
    let username=req.headers.username;
    let password=req.headers.password;
    const admin = await admins.findOne({ username });
    if(admin){
        console.log(admin)
        res.status(403).send('Admin already exists')
    }
    else{
        let newAdmin = new admins({username,password})
        await newAdmin.save()
        let key=jwt.sign({newAdmin},AdminSecretKey)
        res.send("Admin created successfully with token "+key)
    }
})

app.post('/admin/login' ,async (req,res)=>{
    // Admin login
    let username=req.headers.username
    const admin = await admins.findOne({ username })
    if(admin){
        let key=jwt.sign({admin},AdminSecretKey)
        // res.send(key)
        res.send('Admin found with token :- ' + key)
    }else{
        res.status(404).send('Admin Not Found')
    }
})

app.post('/admin/courses',AdminAuthentication, async (req,res)=>{
    const course= new courses(req.body)
    course.admin = req.user.username;
    await course.save()
    res.json({message : 'Course Added with id :- ' , courseId : course.id})
})

app.post('/admin/courses/:courseId',AdminAuthentication, async (req,res)=>{
    //logic to edit a course
    let course= await courses.findByIdAndUpdate(req.params.courseId , req.body , { new : true } )
    if(course){
        console.log(course)
        res.send("Course updated successfully ")
    }
    else{
        res.status(403).send("Course not found ")
    }
}) 

app.get('/admin/courses',AdminAuthentication, async (req,res)=>{
    // logic to return all the courses
    const course = await courses.find({}).populate(req.user.username);
    res.json(course)
})

// User routes
app.post('/user/signup', async (req,res)=>{
    const user = await users.findOne({username : req.headers.username})
    if(user){
        res.status(403).send("Username already taken")
    }
    else{
        // logic to signup user
        const newUser = new users({username : req.headers.username , password : req.headers.password})
        await newUser.save()
        let key=jwt.sign({newUser},UserSecretKey)
        res.send(key)
    }
})

app.post('/user/login',async(req,res)=>{
    // logic to login user
    let user=await users.findOne({username : req.user.username, password : req.user.password})
    if(user){
        let key=jwt.sign({user},UserSecretKey)
        res.send('User found with token :- '+key)
    }else{
        res.status(403).send('User Not Found')
    }
})

app.get('/user/courses',UserAuthentication, async (req,res)=>{
    // logic to return all courses
    let course = await courses.find({published:true})
    res.json(course)
})

app.post('/user/course/:courseId',UserAuthentication,async (req,res)=>{
    try {
        // Find the course by ID
        let course = await courses.findById(req.params.courseId);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        // Find the user
        let user = await users.findOne({ username: req.user.username, password: req.user.password });
        if (!user) {
            return res.status(403).send("User not found");
        }
        let found = user.purchasedCourses.find(a => a._id.toString() === course._id.toString());
        console.log(found)
        if(found){
            return res.status(403).send("Course Already Purchased")
        }
        // Push the course ID into the user's purchasedCourses array
        user.purchasedCourses.push(course._id);
        // Save the user
        await user.save();
        res.send("Course purchased successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

app.get('/user/purchasedCourses',UserAuthentication,(req,res)=>{
    // logic to return all purchased courses
    let user=users.findOne({username : req.user.username , password : req.user.password }).populate('purchasedCourses')
    if(user){
        return res.json({purchasedCourses : user.purchasedCourses || []})
    }
    else{
        return res.send("User not found")
    }
})

app.get('/',(req,res)=>{
    res.send('app Started')
})
app.listen(port,()=>{
    console.log('App Started')
})