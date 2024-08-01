import React from 'react'
import { adminCourses } from '../atmos/courseState'
import CourseAdmin from '../component/CourseAdmin'
import { useRecoilValue } from 'recoil'
export default function AdminViewCourse() {
  const course=useRecoilValue(adminCourses)
  return (
    <div className='p-6 grid grid-cols-3'>
          {
          course.map((element)=>{
            return <div key={element._id}>
              <CourseAdmin course={element} ></CourseAdmin>
            </div>
          })
        }
    </div>
  )
}