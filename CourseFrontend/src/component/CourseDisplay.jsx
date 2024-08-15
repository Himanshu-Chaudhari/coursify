import React from 'react'
import { useLocation } from 'react-router-dom'
import { purchaseCourse } from '../hooks/user'

export default function CourseDisplay() {
    const location = useLocation()
    const course = location.state || {}
    console.log(course)
    return (
        <div className='flex justify-center '>
            <div className="p-2 max-w-md w-8/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className='flex justify-center'>
                    <img className="p-2 object-fill rounded-t-lg" src={`${course.imageLink}`} alt="" /></div>
                <div className="p-5">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Title: {course.title}</h5>
                    <h2 className='mb-3 text-lg font-bold text-white'>
                        Author : {course.admin?course.admin:""}
                    </h2>
                    
                    <h2 className="mb-3 text-lg font-semibold tracking-tight text-gray-900 dark:text-white"> Price: &#8377; {course.price}</h2>
                    <p className="mb-5 font-normal text-gray-400 dark:text-gray-300">Description :-{course.description} </p>
                    <div onClick={() => {
                        purchaseCourse(course._id,course.price)
                    }} className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Purchase Course
                    </div>
                </div>
            </div>
        </div>
    )
}
