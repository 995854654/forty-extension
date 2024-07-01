import { Models } from "@rematch/core"
import { sideRouterModel } from "./sideRouter"


export interface RootModel extends Models<RootModel>{
    sideRouterModel: typeof sideRouterModel

}


export const models: RootModel = {
    sideRouterModel,

}