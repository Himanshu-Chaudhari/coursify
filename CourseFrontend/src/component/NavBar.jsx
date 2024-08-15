import { useNavigate } from "react-router-dom"
export default function NavBar() {
  const navigate=useNavigate()
  return (
  <div>
    <div className="flex p-3 text-5  text-white bg-blue-300 flex-nowrap">
        <div onClick={()=>{localStorage.getItem('who')=='admin' ? navigate('/adminAfterLogin') : navigate('/courseUser'); }} className="cursor-pointer text-5xl mx-5 font-bold leading-9 tracking-tight text-blue-900 basis-4/5">Coursify</div>
        <button onClick={()=>navigate('/')} className="mx-5 px-5 py-3 rounded-md bg-blue-500 hover:bg-blue-700  text-sm font-semibold leading-6 text-white shadow-sm">Home</button>
        <button id="btn" onClick={()=>{
            if(document.getElementById('btn').innerText=='LogOut'){
              localStorage.setItem('who','')
              localStorage.setItem('tokenAdmin','')
              localStorage.setItem('tokenUser','')
            }
            navigate('/signup')
          }} className="mx-5 px-5 py-3 rounded-md text-sm font-semibold leading-6 text-white shadow-sm bg-blue-500 hover:bg-blue-700 "> {localStorage.getItem('who')=='' ? "SignUp/In" : "LogOut" }</button>
    </div>
  </div>
  )
}
