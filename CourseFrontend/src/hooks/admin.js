import axios from "axios"

export function signUpAdmin( username ,password,navigate,setWho) {
    console.log(username , password)

    if(username=='' | password==''){
        alert('Invalid Input')
        return
    }
    try{
        axios.post(`${import.meta.env.VITE_API_URL}/admin/signup`,{},{
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
            localStorage.setItem('who',"admin")
            alert('Admin Created')
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
        axios.post(`${import.meta.env.VITE_API_URL}/admin/login`,{},{
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
            localStorage.setItem('who',"admin")
            alert('Logged in as Admin')
            navigate('/adminAfterLogin')
        })
    }catch(err){
        console.log('This is err',err)
    }
}
