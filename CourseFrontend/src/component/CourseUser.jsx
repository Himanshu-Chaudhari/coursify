import { useNavigate } from 'react-router-dom'
import { purchaseCourse } from '../hooks/user.js'
export default function CourseUser(props) {
  const navigate=useNavigate()
  return (
    <div key={props._id} className="w-80 h-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 h-full">
        <div onClick={()=>{navigate(`/showCourse/${props.course._id}`, {
            state: props.course , 
            replace: true,
        })}}>
          <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.course.title}</h5>
        </div>
        <p className="mb-3 font-normal text-gray-300 ">{props.course.description?props.course.description.slice(0,25):" "}...</p>
        <div className="w-full h-48">
          <img  src={props.course.imageLink} alt="No image" className="w-full h-full object-contain" />
        </div>
        <p className="p-2 pb-1 font-normal text-gray-200 "> Price:- &#8377; {props.course.price}</p>
        <div className={`${props.hide ? 'hidden' : ''} cursor-pointer  mt-2 inline-flex items-center text-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`} onClick={() => {
          purchaseCourse(props.course._id,props.course.price)
        }}>
          Purchase Course
        </div>
      </div>
    </div>
  )
}
