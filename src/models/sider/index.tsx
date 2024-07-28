import { Models } from "@rematch/core"
import { sideRouterModel } from "./sideRouter"
import {notificationModel} from "./notification"
import { authenModel } from "./auth"
import { settingModel } from "./setting"
import { downloaderModel } from "./downloader"
import { chatModel } from "./chat"
export interface RootModel extends Models<RootModel>{
    sideRouterModel: typeof sideRouterModel,
    notificationModel: typeof notificationModel,
    authenModel: typeof authenModel,
    settingModel: typeof settingModel,
    downloaderModel: typeof downloaderModel,
    chatModel: typeof chatModel,
}


export const models: RootModel = {
    sideRouterModel,
    notificationModel,
    authenModel,
    settingModel,
    downloaderModel,
    chatModel
}