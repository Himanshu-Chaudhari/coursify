import axios from "axios"
export function signUpAdmin( username ,password,navigate,setWho) {
    console.log(username , password)
    if(username=='' | password==''){
        alert('Invalid Input')
        return
    }
    try{
        axios.post('http://localhost:3000/admin/signup',{},{
            headers: {
                'Content-Type' : 'application/json',
                'username' : username,
                'password': password
            }
        }).then((res)=>{
            if(res.status==203){
                alert('Email already present')
                return
            }
            localStorage.setItem('tokenAdmin',res.data.token)
            alert('Admin Created')
            setWho('admin')
            navigate('/adminAfterLogin')
        })
    }catch(err){
        console.log('This is err',err)
    }
}
export function loginAdmin( username ,password,navigate,setWho) {
    console.log(username , password)
    if(username=='' | password==''){
        alert('Invalid Input')
        return
    }
    try{
        axios.post('http://localhost:3000/admin/login',{},{
            headers: {
                'Content-Type' : 'application/json',
                'username' : username,
                'password': password
            }
        }).then((res)=>{
            if(res.status==203){
                alert('Wrong Password')
                return
            }
            if(res.status==204){
                alert('Wrong Username')
                return
            }
            localStorage.setItem('tokenAdmin',res.data.token)
            alert('Logged in as Admmin')
            setWho('admin')
            navigate('/adminAfterLogin')
        })
    }catch(err){
        console.log('This is err',err)
    }
}
