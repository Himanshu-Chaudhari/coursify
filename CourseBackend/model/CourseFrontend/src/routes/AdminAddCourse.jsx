
import React from 'react'
import { useState } from 'react'
export default function AdminAddCourse() {
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [price, setPrice] = useState()
  let [img, setImg] = useState()
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
          Course Details
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Course Title
            </label>
            <div className="mt-2">
              <input required name="username" autoComplete="username" className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-300 sm:text-sm sm:leading-6 transition duration-200 ease-in-out"
                onChange={(e) => {
                  setTitle(e.target.value)
                }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Course Description
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                required
                className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-300 sm:text-sm sm:leading-6 transition duration-200 ease-in-out"
                onChange={(e) => {
                  setDescription(e.target.value)
                }} />

            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
            </div>
            <div className="mt-2">
              <input type="number" required className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-300 sm:text-sm sm:leading-6 transition duration-200 ease-in-out6" onChange={(e) => {
                setPrice(e.target.value)
              }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Course Logo
              </label>
            </div>
            <div className="mt-2">
              <input type="link" required className="block w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 shadow-sm focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-300 sm:text-sm sm:leading-6 transition duration-200 ease-in-out" onChange={(e) => {
                setImg(e.target.value)
              }} />
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async (e) => {
                e.preventDefault()
                if(title=='' | price=='' ){
                  alert("Enter Proper Credentials")
                  return;
                }
                await fetch(import.meta.env.VITE_API_URL+'/admin/courses', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    key: localStorage.getItem('tokenAdmin')
                  },
                  body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "price": price,
                    "imageLink": img,
                    "published": "true"
                  })
                }).then((res, err) => {
                  if (res.status == 403) {
                    alert("Course Id already present")
                  }
                  else {
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

