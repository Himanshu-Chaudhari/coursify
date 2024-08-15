import React from 'react'
import { useState, useEffect } from 'react'
import { getPurchasedCourses } from '../hooks/user'
import { useNavigate } from 'react-router-dom'
import { purchasedCourse } from '../atmos/courseState'
import CourseUser from '../component/CourseUser'
import { useSetRecoilState } from 'recoil'
export default function UserCourse() {
    const setPurchaseCourse = useSetRecoilState(purchasedCourse)
    const navigate = useNavigate()

    const [courses, setCourses] = useState([{
        title: '',
        discription: ''
    }])
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL+'/user/courses', {
            headers: {
                key: localStorage.getItem('tokenUser')
            }
        }).then((res) => {
            res.json().then((data) => {
                setCourses(data)
                console.log(data)
                return data
            })
        })
    }, [])
    return (
        <div>
            <div className='text-4xl p-9 pb-2 flex text-center justify-center font-bold leading-9 tracking-tight text-gray-700 basis-4/5'>
                Hello, Welcome to Coursify, Best Place to Upgrade
            </div>
            <div className='m-9 mt-2 grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='col-start-1 sm:col-start-3'></div>
                <div className='flex justify-between md:justify-end'>
                    <button onClick={() => getPurchasedCourses(navigate, setPurchaseCourse)} className='p-3 w-fit h-fit shadow-sm rounded-md bg-blue-500 hover:bg-blue-700 text-center text-white'>My Purchased Courses</button>
                </div>
                {
                    courses.map((element,index) => {
                        return (
                            <div className="h-auto max-w-full flex justify-center rounded-lg" key={index} >
                                <CourseUser course={element} hide={false} key={element._id}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


