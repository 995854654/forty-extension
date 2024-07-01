import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'


type sideRouterType = {
    key: string
}

const initSideRouter:sideRouterType = {
    key: "index"
}
export const sideRouterModel = createModel<RootModel>()({
    state: initSideRouter,
    reducers: {
        push: (state: sideRouterType, payload:string) => {
            return {
                ...state,
                key: payload
            }
        }
    }
})