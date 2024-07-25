
import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { APIResponse } from "../base/response";
import { getAPIRequest } from "@/common/utils/httpRequest";
import { HTTP_API } from "@/api";
import { CustomStatus } from "@/common/utils/customStatus";
type AuthenticationState = {
    isAuthenticated: boolean
}

export const authenModel = createModel<RootModel>()({
    state: {
        isAuthenticated: false
    } as AuthenticationState,
    reducers: {
        changeAuthenticatedStatus: (state: AuthenticationState, payload: boolean) => {
            return {
                isAuthenticated: payload
            }
        },
     
    },
    effects: (dispatch) => ({
        async verify_authen_state() {
            let token = sessionStorage.getItem("token")
            let token_type = sessionStorage.getItem("token_type")
            let response: APIResponse = await getAPIRequest(HTTP_API.refresh_token, {
                "Authorization": `${token_type} ${token}`
            })

            if (response.success === false &&
                (response.code === CustomStatus.AUTH_1001_LOGIN_EXPIRED || response.code === CustomStatus.HTTP_401_UHTTP_401_UNAUTHORIZED)) {
                dispatch.sideRouterModel.push("login")
                dispatch.notificationModel.changeState({ notifyType: "error", message: response.msg })
                dispatch.authenModel.changeAuthenticatedStatus(false)
            }
            else if (response.success === false && response.code === CustomStatus.HTTP_500_SERVER_ERROR) {
                dispatch.notificationModel.changeState({ notifyType: "error", message: response.msg })
                dispatch.authenModel.changeAuthenticatedStatus(false)
            }
        }
    })
})