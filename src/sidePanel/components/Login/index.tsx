import React, { useState } from 'react'
import { Box } from '@mui/material'
import AuthenForm from './AuthenForm'
import type { Dispatch } from '@/store/sider'
import { useDispatch } from 'react-redux';
import { authenUserModel } from "@/models/base/user"
import { postByFormData } from '@/common/utils/httpRequest';
import { APIResponse } from '@/models/base/response';
import CryptoJS from "crypto-js"
import {HTTP_API} from "@/api"
import { siderConfig } from '@/data/sideMenu';
export default function Login() {
    const [submitLoading, setSubmitLoading] = useState(false)
    const dispatch = useDispatch<Dispatch>()
    const signIn = async (formData: authenUserModel) => { 
        setSubmitLoading(true)
        let data = new FormData()
        data.append("username", formData.username)
        data.append("password", CryptoJS.MD5(formData.password).toString())
        const response: APIResponse = await postByFormData(HTTP_API.login, data)
        setSubmitLoading(false)
        if (response.success) {
            dispatch.notificationModel.notify({ notifyType: "success", message: response.msg })
            saveToken(response.data.access_token, response.data.token_type)
            dispatch.authenModel.changeAuthenticatedStatus(true)
            dispatch.sideRouterModel.push(siderConfig.DEFAULT_PAGE)
        } else {
            dispatch.notificationModel.notify({ notifyType: "error", message: response.msg })
        }
    }
    const saveToken = (token: string, tokenType: string) => {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("token_type", tokenType)
    }
    
    return (
        <Box sx={{
            height: "100%",
        }}
        >

            <AuthenForm submitForm={signIn} loading={submitLoading} />
        </Box>
    )
}
