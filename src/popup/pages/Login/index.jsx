import React from 'react'
import "./login.less"
export default function Login() {


    return (
        <div className='P-login'>
            <img src={process.env.PUBLIC_URL + "/images/dragon.png"} alt="" className='P-login-logo' />
            <p>loggin page</p>
        </div>
    )
}
