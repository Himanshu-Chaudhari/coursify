import {atom} from 'recoil'

export const who=atom({
    key:'who',
    default:'user',
})

export const isLogedin=atom({
    key : 'isLoggedIn',
    default : false
})

export const purchasedCourse=atom({
    key:'purchasedCourses',
    default:[],
})

export const adminCourses=atom({
    key:'adminCourses',
    default:[],
})

export const notificationState=atom({
    key:'notificationState',
    default:false,
})