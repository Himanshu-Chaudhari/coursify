import React, { useState } from 'react'
import { signUpAdmin ,loginAdmin } from '../hooks/admin'
import { signUpUser , loginUser } from '../hooks/user'
import { useNavigate } from 'react-router-dom';
import { who } from '../atmos/courseState';
import { useSetRecoilState } from 'recoil';
export default function Credentials() {
    const setWho=useSetRecoilState(who)
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let response;
    const navigate=useNavigate()
    const [toggle,setToggle]=useState('signup')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    return (
        <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {toggle=='signup' ? 'Create your account' : 'Login to your Account' }
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input onChange={(e)=>setUsername(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label className="block  mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                        </div>
                        
                        <button onClick={()=>{if(!username.match(validRegex)){alert('Enter Valid Email')}
                        else{toggle=='signup'?response=signUpUser(username,password,navigate):response=loginUser(username,password,navigate,setWho)}}} className="w-full text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{toggle=='signup' ? 'Create Account as User' : "Login as User"}</button>

                        <button onClick={()=>{if(!username.match(validRegex)){alert('Enter Valid Email')}
                        else{ toggle=='signup'?response=signUpAdmin(username,password,navigate):response=loginAdmin(username,password,navigate,setWho)}}} className="w-full text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{toggle=='signup' ? 'Create Account as Admin' : "Login as Admin"}</button>
                        
                        <p className="text-sm font-light text-gray-500 ">
                            {toggle=='signup' ? 'Already have an account ? ' : "Don't have an Account ? "}
                            <a onClick={()=>{ toggle=='signup'?setToggle('login'):setToggle('signup')}} className="font-medium text-primary-600 hover:underline ">{toggle=='signup' ? 'Login here' : "Sign up"}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    )
}
