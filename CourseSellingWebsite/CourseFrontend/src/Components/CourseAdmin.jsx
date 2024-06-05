
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
export default function CourseAdmin() {
    let [title,setTitle]=useState('')
    let [description,setDescription]=useState('')
    let [price,setPrice]=useState()
    let [id,setId]=useState(0)
    let [img,setImg]=useState()


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add Course
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Course Title
          </label>
          <div className="mt-2">
            <input required name="username" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e)=>{
                setTitle(e.target.value)
            }}/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Course Description
            </label>
          </div>
          <div className="mt-2">
            <input type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>{
                setDescription(e.target.value)
            }}/>
            
          </div>
        </div>
        

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
          </div>
          <div className="mt-2">
            <input type="number" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>{
                setPrice(e.target.value)
            }}/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Id
            </label>
          </div>
          <div className="mt-2">
            <input type="number" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>{
                setId(e.target.value)
            }}/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Course Logo
            </label>
          </div>
          <div className="mt-2">
            <input type="link" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>{
                setImg(e.target.value)
            }}/>
          </div>
        </div>

        
        <div>
          <button 
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async (e)=>{
                e.preventDefault();
                console.log(title,description,price, localStorage.getItem('tokenAdmin'))
                await fetch('http://localhost:3000/admin/courses',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        key: localStorage.getItem('tokenAdmin')
                    },
                    body:JSON.stringify({
                        "id":id,
                        "title" : title,
                        "description": description,
                        "price": price,
                        "imageLink": img, 
                        "published": "true"   
                    })
                }).then((res,err)=>{
                    if(res.status==403){
                        alert("Course Id already present")
                    }
                    else{
                        alert('Course Added')
                    }
                })
            }}
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

