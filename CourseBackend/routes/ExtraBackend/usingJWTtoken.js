const express = require('express')
const app=express()
const port=3000
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const cors=require('cors')
app.use(cors())

let users=[]
let admins=[]
let courses=[]

AdminSecretKey="AdminSecretKey"
UserSecretKey="UserSecretKey"

let AdminAuthentication = (req,res,next) => {
    // let admin=admins.find(a => a.username == req.headers.username && a.password == req.headers.password)
    let key=req.headers.key
    if(key){
        jwt.verify(key,AdminSecretKey,(err,user)=>{
            if(err){
                console.log(err)
                return res.send(err)
            }
            req.user=user
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
                return res.send(err)
            }
            req.user=user
            next();
        })
    }else{
        res.status(404).send('User authentication failed')
    }
}

// Admin route
app.post('/admin/signup',(req,res)=>{
    // Admin sign up
    if(admins.find(a => a.username == req.headers.username) && admins.length!=0){
        res.status(403).send("Enter new name , Admin name already exists")
    }
    else{
        let admin = {
            username: req.headers.username,
            password: req.headers.password
        }
        let key=jwt.sign(admin,AdminSecretKey)
        admins.push(admin)
        admin.token=key
        res.send(admin)
    }
})

app.post('/admin/login',AdminAuthentication,(req,res)=>{
    // Admin login
    let admin=admins.find(a => a.username == req.headers.username && a.password == req.headers.password)
    if(admin){
        let key=jwt.sign(admin,AdminSecretKey)
        res.send('Admin found with token :- '+key)
    }else{
        res.status(404).send('Admin Not Found')
    }
})

app.post('/admin/courses',AdminAuthentication,(req,res)=>{
    console.log('reached here')
    if(courses.find(a => a.id == req.body.id) && courses.length!=0){
        res.status(403).send("Course Id already exists")
    }
    else{
        let course={
            adminName : req.user.username,
            id : req.body.id,
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            image : req.body.imageLink,
        }
        courses.push(course)
        console.log(course)
        res.send('Course Added')
    }
})

app.post('/admin/courses/:courseId',AdminAuthentication,(req,res)=>{
    //logic to edit a course
    let toedit=courses.findIndex((a)=>a.id==req.params.courseId)
    if(toedit==-1){
        res.status(404).send('Course not found')
    }
    let newCourse={
        adminName : req.user.username,
        id : req.body.id,
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        image : req.body.imageLink,
    }
    courses[toedit]=newCourse
    res.send("Course updated")
})

app.get('/admin/courses',AdminAuthentication,(req,res)=>{
    // logic to return all the courses
    let toReturn=[]
    courses.forEach((a)=>{
        if(a.adminName==req.user.username){
            toReturn.push(a)
        }
    })
    res.send(toReturn)
})

// User routes
app.post('/user/signup',(req,res)=>{
    if(users.find(a => a.username == req.headers.username) && users.length!=0){
        res.status(403).send("Enter new name , User name already exists")
    }
    else{
        // logic to signup user
        let user={
            username: req.headers.username,
            password: req.headers.password,
            purchasedCourses: []
        }
        let key=jwt.sign(user,UserSecretKey)
        users.push(user)
        user.token=key
        res.send(user)
    }
})

app.post('/user/login',(req,res)=>{
    // logic to login user
    let user=users.find(a => a.username == req.headers.username && a.password == req.headers.password)
    if(user){
        let key=jwt.sign(user,UserSecretKey)
        res.send('User found with token :- '+key)
    }else{
        res.status(404).send('User Not Found')
    }
})

app.get('/user/courses',UserAuthentication,(req,res)=>{
    // logic to return all courses
    res.send(courses)
})

app.post('/user/course/:courseId',UserAuthentication,(req,res)=>{

    let userIndex = users.findIndex(user => user.username === req.user.username);
    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    let courseId = req.params.courseId;
    let course = courses.find(course => course.id === courseId);
    if (!course) {
        return res.status(404).send("Course not found");
    }

    // Check if the user has already purchased the course
    if (users[userIndex].purchasedCourses.find(purchasedCourse => purchasedCourse.id === courseId)) {
        return res.status(403).send("You have already purchased this course");
    }

    // Add the course to the user's purchased courses
    users[userIndex].purchasedCourses.push(course);
    
    res.send('Course purchased');
})

app.get('/user/purchasedCourses',UserAuthentication,(req,res)=>{
    // logic to return all purchased courses
    let user=users.find(a=>a.username==req.user.username)
    res.send(user.purchasedCourses)
})

app.get('/',(req,res)=>{
    res.send('app Started')
})

app.get('/allUsers',(req,res)=>{
    res.send(users)
})

app.get('/allAdmins',(req,res)=>{
    res.send(admins)
})

app.listen(port,()=>{
    console.log('App Started')
})