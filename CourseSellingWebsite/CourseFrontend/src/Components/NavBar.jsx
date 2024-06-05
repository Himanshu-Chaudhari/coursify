
export default function NavBar() {
  return (
  <div>
    <div className="flex p-3 text-5  text-white bg-blue-200 flex-nowrap">
        <div className="text-4xl mx-5 font-bold leading-9 tracking-tight text-gray-700 basis-4/5">Coursify</div>
        <button className="mx-5 px-5 py-3 rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Home</button>
        <button className="mx-5 px-5 py-3 rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
        <button className="mx-5 px-5 py-3 rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SignUp</button>
    </div>
  </div>
  )
}
