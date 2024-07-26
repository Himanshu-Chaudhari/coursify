import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { purchasedCourse } from '../atmos/courseState'
import CourseUser from '../component/CourseUser'
export default function UserPurchasedCourse() {
    const purchasedCourses = useRecoilValue(purchasedCourse)
    return (
        <div>
            <div className='text-4xl p-9 flex justify-center font-bold leading-9 tracking-tight text-gray-700 basis-4/5'>Your Courses</div>
            <div className='m-9 grid grid-cols-2 md:grid-cols-3 gap-4'>
                {
                    purchasedCourses.map((element) => {
                        return ( 
                            <div className="h-auto max-w-full rounded-lg" key={element._id}>
                                <CourseUser course={element} hide={true}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
