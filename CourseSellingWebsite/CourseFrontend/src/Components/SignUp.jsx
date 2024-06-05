import React ,{useState} from 'react'

export default function SignUp() {
    let [username,setUsername]=useState()
    let [password,setPassword]=useState()
  return (
    <div><div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input required name="username" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{
                setUsername(e.target.value)
                console.log(username)
            }}/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>{
                setPassword(e.target.value)
                console.log(password)
            }}
        
            />
          </div>
        </div>

        <div>
          <button 
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={()=>{
                if(username=='' || password==''){
                  alert('Enter proper credentials')
                }
                else{
                  fetch('http://localhost:3000/user/signup',{
                      method: 'POST',
                      headers: {
                          'Content-Type' : 'application/json',
                          'userName' : username,
                          'password':password
                      }
                  }).then((res)=>{
                      if(res.status==403){
                          alert('UserName not available Please enter new Username')
                      }
                      res.json().then((data)=>{
                          // console.log(data)
                          localStorage.setItem('tokenUser' , data.token)
                          // localStorage.setItem('userName' , username)
                          alert('User Added')
                          // alert('User Added')
                      })
                  })
                }
            }}
          >
            Sign in as User
          </button>
          <button 
            type="submit"
            className="flex my-3 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={()=>{
              if(username=='' || password==''){
                alert('Enter proper credentials')
              }
              else{
                fetch('http://localhost:3000/admin/signup',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'username' : username,
                        'password':password
                    }
                }).then((res)=>{
                    if(res.status==403){
                        alert('UserName not available Please enter new Username')
                    }
                    res.json().then((data)=>{
                        console.log(data)
                        localStorage.setItem('tokenAdmin' , data.token)
                        alert('Admin Added')
                        // localStorage.setItem('adminName' , username)
                    })
                })
              }
            }}
          >
            Sign in as Admin
          </button>
        </div>
      </form>
    </div>
  </div></div>
  )
}
