import { useNavigate } from "react-router-dom"

export default function NavBar() {

  const navigate=useNavigate()
  return (
  <div>
    <div className="flex p-3 text-5  text-white bg-blue-300 flex-nowrap">
        <div onClick={()=>navigate('/')} className="text-4xl mx-5 font-bold leading-9 tracking-tight text-blue-950 basis-4/5">Coursify</div>
        <button onClick={()=>navigate('/')} className="mx-5 px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-700  text-sm font-semibold leading-6 text-white shadow-sm">Home</button>
        <button onClick={()=>navigate('/signup')} className="mx-5 px-5 py-3 rounded-md text-sm font-semibold leading-6 text-white shadow-sm bg-blue-500 hover:bg-blue-700  ">SignUp/In</button>
    </div>
  </div>
  )
}
