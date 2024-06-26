import { Models } from "@rematch/core"
// import { chatModel } from "./chat"
// import { authenModel } from "./auth"
// import {notificationModel} from "./notification"
// import {llmModel} from "./llm"

export interface RootModel extends Models<RootModel>{
    // chatModel: typeof chatModel
    // authenModel: typeof authenModel,
    // notificationModel: typeof notificationModel,
    // llmModel: typeof llmModel
}


export const models: RootModel = {
    // chatModel,
    // authenModel,
    // notificationModel,
    // llmModel
}