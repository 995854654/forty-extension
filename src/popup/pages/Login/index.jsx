import React, { useRef } from 'react'
import logger from "@/common/utils/Logger"
import "./login.less"
const TAG = "POPUP-login"
export default function Login() {

    const formRef = useRef()

    const handleSubmit = () => {
        logger.info(TAG, formRef.current.getFieldsValue())
    }
    return (
        <div className='P-login'>
            <img src={process.env.PUBLIC_URL + "/images/dragon.png"} alt="" className='P-login-logo' />
            <p>loggin page</p>
        </div>
    )
}
