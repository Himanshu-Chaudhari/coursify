import axios from "axios"

export function signUpUser(username,password,navigate) {
    console.log(username , password)
    if(username=='' | password==''){
        alert('Invalid Input')
        return
    }
    try{

        axios.post(`${import.meta.env.VITE_API_URL}/user/signup`,{},{
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
            localStorage.setItem('tokenUser',res.data.token)
            console.log(import.meta.env.VITE_API_URL)
            alert('User Created')
            navigate('/courseUser')
            return 'done';
        })
    }catch(err){
        console.log('This is err',err.status)
        return
    }
}

export function loginUser(username,password,navigate) {
    console.log(username , password)
    if(username=='' | password==''){
        alert('Invalid Input')
        return
    }
    try{
        axios.post(import.meta.env.VITE_API_URL+'/user/login',{},{
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
            localStorage.setItem('tokenUser',res.data.token)
            alert('Logged in as user')
            navigate('/courseUser')
        })
    }catch(err){
        console.log('This is err',err)
    }
}

export function purchaseCourse(id){
    console.log(id)
    fetch(import.meta.env.VITE_API_URL+`/user/course/`+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'key': localStorage.getItem('tokenUser')
        }
    }).then((res) => {
        console.log(res)
        if (res.status == 206) {
            alert('You have already purchased this course')
        }
        else {
            alert('Course Purchased')
        }
        res.json().then((data) => {
            console.log(data)
        })
    })
}

export function getPurchasedCourses(navigate,setPurchaseCourse){
    try{
        axios.get(import.meta.env.VITE_API_URL+'/user/purchasedCourses',{
            headers: {
                'Content-Type': 'application/json',
                'key': localStorage.getItem('tokenUser')
            }
        }).then((res)=>{
            if(res.status==204){
                alert('User Not found')
                return
            }
            if(res.data.purchasedCourses.length==0){
                alert("You havent purchased any course")
                return 
            }
            console.log(res.data.purchasedCourses)
            setPurchaseCourse(res.data.purchasedCourses)
            navigate('/purchasedCourse')

        })
    }catch(err){
        console.log('This is err',err)
    }
}
