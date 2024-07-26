import jwt from "jsonwebtoken"
export const AdminSecretKey="AdminSecretKey"
export const UserSecretKey="UserSecretKey"
export const AdminAuthentication = (req,res,next) => {
    let key=req.headers.key
    if(key){
        jwt.verify(key,AdminSecretKey,(err,user)=>{
            if(err){
                res.send(err)
            }
            req.user=user
        })
        next();
    }
    else{
        res.status(401).send('Admin authentication failed')
    }
}
export const UserAuthentication=(req,res,next)=>{
    let key=req.headers.key
    if(key){
        jwt.verify(key,UserSecretKey,(err,user)=>{
            if(err){
                res.send(err)
            }
            req.user=user
        })
        next();
    }else{
        res.status(404).send('User authentication failed')
    }
}