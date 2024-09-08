
import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { postByJSON,getAPIRequest } from '@/common/utils/httpRequest';
import { HTTP_API } from '@/api';
type DownloaderState = {
    url: string,
    table: Array<any>
}

const initState:DownloaderState = {
    url: "",
    table: []
}
export const downloaderModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setInputURL: (state: DownloaderState, payload:string) => {
            return {
                ...state,
                url: payload
            }
        },
        setReourceTable: (state: DownloaderState, payload:Array<any>) => {
            return {
                ...state,
                table: payload
            }
        },
    },
    effects: (dispatch) => ({
        downloadResource(_, rootState){

            postByJSON(HTTP_API.download_resource, {
                url: rootState.downloaderModel.url
            }).then((response) => {
                if (response.success){
                    dispatch.notificationModel.notify({
                        notifyType:"success",
                        message: response.msg
                    })
                    setTimeout(() => {
                        dispatch.downloaderModel.refresh_table()
                    }, 500)
                }else {
                    dispatch.notificationModel.notify({
                        notifyType:"error",
                        message: response.msg
                    })
                }
            })
        },
        refresh_table(){
            postByJSON(HTTP_API.get_resource_table).then((response) => {
                if (response.success){
                    dispatch.downloaderModel.setReourceTable(response.data)
                }else {
                    dispatch.notificationModel.notify({notifyType: "error", "message": response.msg})
                }
            })
        },
        checkWebsiteStatus(){
            getAPIRequest(HTTP_API.check_website_status).then((response) => {
                if (response.success){
                    console.log(response.data)
                }else {
                    dispatch.notificationModel.notify({notifyType: "error", "message": response.msg})
                }
            })
        }
    })
})