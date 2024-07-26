
import SignUp from './routes/SignUp'
import './App.css'
import NavBar from './component/NavBar'
import CoursesUser from './routes/UserCourse'
import AdminAddCourse from './routes/AdminAddCourse'
import { Route ,Routes } from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import AdminAfterLogin from './routes/AdminAfterLogin'
import {RecoilRoot} from 'recoil'
import Home from './routes/Home'
import Credentials from './routes/Credentials'
import UserPurchasedCourse from './routes/UserPurchasedCourse'
import AdminViewCourse from './routes/AdminViewCourses'
import AdminEditCourse from './routes/AdminEditCourse'

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='/' element={<><NavBar/><Home/></>} />
            <Route path='/signup' element={<><NavBar/><Credentials></Credentials></>}/>
            <Route path='/courseUser' element={ <><NavBar/><CoursesUser/></>}/>
            <Route path='/purchasedCourse' element={ <><NavBar/><UserPurchasedCourse/></>}/>
            <Route path='/adminAddCourse' element={ <><NavBar/><br/><br/><AdminAddCourse/></>}/>
            <Route path='/adminAfterLogin' element={ <><NavBar/><br/><br/><AdminAfterLogin/></>}/>
            <Route path='/adminViewCourse' element={ <><NavBar/><br/><br/><AdminViewCourse/></>}/>
            <Route path='/adminEditCourse/:id' element={ <><NavBar/><br/><br/><AdminEditCourse/></>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  )

}

export default App
