import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import { adminRouter } from './routes/adminRoutes.js'
import dotenv from 'dotenv';
dotenv.config();
const app=express()
app.use(bodyParser.json())
app.use(cors())
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.send('app Started')
})

console.log("hello ",process.env.PORT)
app.listen(process.env.PORT,()=>{
    console.log('App Started')
})
