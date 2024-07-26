import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import { adminRouter } from './routes/adminRoutes.js'

const app=express()
const port=3000
app.use(bodyParser.json())
app.use(cors())

app.use('/admin',adminRouter)
app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.send('app Started')
})

app.listen(port,()=>{
    console.log('App Started')
})