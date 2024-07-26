import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { adminCourses } from '../atmos/courseState'
import { useSetRecoilState } from 'recoil'
export default function AdminAfterLogin() {
  const setAdminCourse=useSetRecoilState(adminCourses)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + '/admin/courses', {
      headers: {
        'Content-Type': 'application/json',
        key: localStorage.getItem('tokenAdmin')
      }
    }).then((response)=>{
      setAdminCourse(response.data.courses)
    })
  }, [])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex justify-center">
          <button onClick={() => navigate('/adminAddCourse')} className="w-40 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
            Add Course
          </button>
          <button onClick={() => navigate('/adminViewCourse')} className="w-40 mx-3 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            My Published Courses
          </button>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome Admin
          </h2>
        </div>
      </div>
      
    </>
  )
}
