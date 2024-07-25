import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
type NotifyType = "success" | "warning" | "info" | "error"

type NotificationState = {
    open: boolean,
    notifyType: NotifyType,
    message: string
}
const initNotificationState: NotificationState = {
    open: false,
    notifyType: "success",
    message: ""
}

export const notificationModel = createModel<RootModel>()({
    state: initNotificationState,
    reducers: {
        initState: () => {
            return initNotificationState
        },
        changeState: (state: NotificationState, payload: {notifyType:NotifyType, message: string}) => {
            let new_state = {
                open: true,
                notifyType: payload.notifyType,
                message: payload.message
            }
           
            return new_state
        },
        closeNotification: (state: NotificationState) => {
            let new_state = {
                ...state,
                open: false
            }
            return new_state
        }
    },
    effects: (dispatch) => ({
        notify(payload:{notifyType:NotifyType, message: string}, state){
            dispatch.notificationModel.initState()
            dispatch.notificationModel.changeState(payload)
        }
    })
})