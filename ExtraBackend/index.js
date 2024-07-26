const express = require('express')
const app=express()
const port=3000

const bodyParser=require('body-parser')
app.use(bodyParser.json())
const cors=require('cors')
app.use(cors())

let users=[]
let admins=[]
let courses=[]

let AdminAuthentication = (req,res,next) => {
    let admin=admins.find(a => a.username == req.headers.username && a.password == req.headers.password)
    if(admin){
        next();
    }else{
        res.status(404).send('Admin authentication failed')
    }
}

let UserAuthentication=(req,res,next)=>{
    let user=users.find(a => a.username == req.headers.username && a.password == req.headers.password)
    if(user){
        next();
    }else{
        res.status(404).send('Uauthentication failed')
    }
}
// Admin route
app.post('/admin/signup',(req,res)=>{
    // Admin sign up
   
    if(admins.find(a => a.username == req.headers.username) && admins.length!=0){
        res.status(404).send("Enter new name , Admin name already exists")
    }
    else{
        let admin = {
            username: req.headers.username,
            password: req.headers.password
        }
        admins.push(admin)
        res.send(admin)
    }
})

app.post('/admin/login',AdminAuthentication,(req,res)=>{
    // Admin login
    let admin=admins.find(a => a.username == req.headers.username && a.password == req.headers.password)
    if(admin){
        res.send('Admin found')
    }else{
        res.status(404).send('Admin Not Found')
    }
})

app.post('/admin/courses',AdminAuthentication,(req,res)=>{
    //logic to create a course

    if(admins.find(a => a.id == req.headers.id) && courses.length!=0){
        res.status(404).send("Course Id already exists")
    }
    else{
        let course={
            adminPassword : req.headers.password,
            id : req.body.id,
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            image : req.body.img,
        }
        courses.push(course)
        res.send('Course Added')
    }
})

app.post('/admin/courses/:courseId',AdminAuthentication,(req,res)=>{
    //logic to edit a course
    let toedit=courses.findIndex((a)=>a.id==req.body.id)
    if(toedit==-1){
        res.status(404).send('Course not found')
    }
    let newCourse={
        adminPassword : req.headers.password,
        id : req.body.id,
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        image : req.body.img,
    }
    courses[toedit]=newCourse
    res.send("Course updated")
})

app.get('/admin/courses',AdminAuthentication,(req,res)=>{
    // logic to return all the courses
    let toReturn=[]
    courses.forEach((a)=>{
        if(a=>a.adminPassword==req.headers.password){
            toReturn.push(a)
        }
    })
        
    res.send(toReturn)
})


// User routes
app.post('/user/signup',(req,res)=>{
    if(users.find(a => a.username == req.headers.username) && users.length!=0){
        res.status(404).send("Enter new name , User name already exists")
    }
    else{
        // logic to signup user
        let user={
            username: req.headers.username,
            password: req.headers.password,
            purchasedCourses: []
        }
        users.push(user)
        res.send("User added success")
    }
})

app.post('/user/login',UserAuthentication,(req,res)=>{
    // logic to login user
    res.send("User loged in success")
})

app.get('/user/courses',UserAuthentication,(req,res)=>{
    // logic to return all courses
    res.send(courses)
})

app.post('/user/course/:courseId',UserAuthentication,(req,res)=>{
    // logic to purchase a course
    let user=users.findIndex(a=>a.username==req.headers.username)
    if((users[user].purchasedCourses.find(a => a.id == req.params.courseId)) && users[user].purchasedCourses.length!=0){
        res.status(404).send("You have already purchased this course")
    }
    else{
        let toPurchase=courses.find(a=>a.id=req.params.courseId)
        if(!toPurchase){
            res.status(404).send("Course Not Found")
        }
        users[user].purchasedCourses.push(toPurchase)
        res.send('course purchased')
    }
})

app.get('/user/purchasedCourses',UserAuthentication,(req,res)=>{
    // logic to return all purchased courses
    let user=users.find(a=>a.username==req.headers.username)
    res.send(user.purchasedCourses)
})

app.get('/',(req,res)=>{
    res.send('app Started')
})
app.listen(port,()=>{
    console.log('App Started')
})