import React from 'react'
import { useState , useEffect} from 'react'

export default function CoursesUser() {
    let [courses,setCourses]=useState([{
        title:'',
        discription:''
    }])

    let purchaseCourse=(id)=>{
        console.log(id)
        fetch(`http://localhost:3000/user/course/`+id,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'key':localStorage.getItem('tokenUser')
            }
        }).then((res)=>{
            if(res.status==403){
                alert('You have already purchased this course')
            }
            else{
                alert('Course Purchased'+id)
            }
            res.json().then((data)=>{
                console.log(data)
            })
        })
    }

    useEffect(() => {
        const interval=setInterval(() => {
          fetch('http://localhost:3000/user/courses',{
            headers :{
                key : localStorage.getItem('tokenUser')
            }
            }).then((res)=>{
                res.json().then((data)=>{
                    setCourses(data)
                    console.log(data)
                    return data
                })
            })
        }, 3000)
        return () => clearInterval(interval);
      }, [])

  return (
    <div>
            <div id='Notification' className="flex justify-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">{}
                Course Purchased Successfully.


            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm  mx-10 px-4  text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">x</button>
            </div>
         
        <div className='text-4xl p-9 flex justify-center font-bold leading-9 tracking-tight text-gray-700 basis-4/5'>Hello Welcome to Coursify , Best Place to Upgrade</div>
        <div className='m-9 grid grid-cols-2 md:grid-cols-3 gap-4'>
            {
                courses.map((element) => {
                    return (
                        <div className="h-auto max-w-full rounded-lg" key={element._id}>
                            <Course course={element} purchaseCourse={purchaseCourse}  />
                        </div>
                    )
                })
            }
        </div>
        </div> 
  )
}

function Course(props) {
    return (

      <div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.course.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.course.description}</p>

                  <img src={props.course.imageLink} alt="No image" width='300px' />
                  <a href="#" className="inline-flex items-center text-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() =>{
                        console.log(props)
                      props.purchaseCourse(props.course._id)
                    }} >
                      Purchase Course
                  </a>
              </div>
          </div>
  
      </div>
    )
  }


