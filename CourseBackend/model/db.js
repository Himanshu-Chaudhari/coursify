import mongoose from 'mongoose'
export const userSchema=mongoose.Schema({
    // username:{type : String } is similar to below line
    username:String,
    password:String,
    purchasedCourses:[{type: mongoose.Schema.Types.ObjectId , ref:'courses'}]
})
export const adminSchema=mongoose.Schema({
    username:String,
    password:String
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

mongoose.connect('mongodb+srv://himanshuchaudhari8561:%40Himanshu183%40@cluster0.qs7pwzm.mongodb.net/CourseSellingWebsite')

