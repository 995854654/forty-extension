
import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'

type commonType = {
    fontSize: number
}

const commonState:commonType = {
    fontSize: 0.5
}

export const commonModel = createModel<RootModel>()({
    state: commonState,
    reducers: {
    },
    effects: (dispatch) => ({
       
    })
})