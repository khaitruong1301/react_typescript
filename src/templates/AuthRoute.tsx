import React from 'react'
import { Navigate, Route } from 'react-router-dom'

type Props = {
    component: React.ReactNode | React.ReactElement
}



const AuthRoute = (props: Props) => { // <AuthRoute component={<Component />} />

    // let div:React.ReactElement = <div> 123</div>

    if (localStorage.getItem('accessToken')) {
        return <>
            {props.component}
        </>
    }
    return  <Navigate to={'/login'}></Navigate>

}


export default AuthRoute




