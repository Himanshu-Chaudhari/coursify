import React, { useEffect, useState } from 'react'
import CourseAdmin from '../component/CourseAdmin'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function AdminViewCourse() {
  const [courses,setCourses]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/admin/courses`,{
      headers: {
        'Content-Type': 'application/json',
        key: localStorage.getItem('tokenAdmin')
      }
    }).then((response)=>{
      console.log(response.data);
      setCourses(response.data.courses)
    })
  },[])

  if(courses.length==0){
    return(
      <div className='text-4xl font-bold flex justify-center text-center'>
        <div>
        <div>
          You haven't published any course
        </div>
        <br />
        <div className="cursor-pointer px-9 py-3 m-3 inline-flex items-center text-center rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={()=>navigate('/AdminAfterLogin')}>Back to Dashboard</div></div>
      </div>
      
    )
  }

  return (
    <div className='p-6 grid grid-cols-3'>
          {
          courses.map((element)=>{
            return <div key={element._id}>
              <CourseAdmin course={element}></CourseAdmin>
            </div>
          })
        }
    </div>
  )
}