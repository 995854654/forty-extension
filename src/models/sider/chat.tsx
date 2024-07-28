
import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { v4 as uuid4 } from "uuid"
type History = {
    direction: "left" | "right",
    key: string,
    context: string
}

type ChatType = {
    initStatus: boolean,
    isBottom: boolean,
    loading: boolean,
    content: string,
    historyList: History[]
}

const initChatState: ChatType = {
    initStatus: true,
    isBottom: false,
    loading: false,
    content: "",
    historyList: []
}

export const chatModel = createModel<RootModel>()({
    state: initChatState,
    reducers: {
        setInitStatus: (state: ChatType, payload: boolean) => {
            return {
                ...state,
                initStatus: payload
            }
        },
        setIsBottom: (state: ChatType, payload: boolean) => {
            return {
                ...state,
                isBottom: payload
            }
        },
        setLoading: (state: ChatType, payload: boolean) => {
            return {
                ...state,
                loading: payload
            }
        },
        setContent: (state: ChatType, payload: string) => {
            return {
                ...state,
                content: payload
            }
        },
        addHistory: (state: ChatType, payload: History) => {
            let arr = [...state.historyList]
            arr.push(payload)
            return {
                ...state,
                historyList: arr
            }
        }

    },
    effects: (dispatch) => ({
        checkIfinit(_, state) {
            if (state.chatModel.historyList.length === 0) {
                dispatch.chatModel.setInitStatus(true)
            } else {
                dispatch.chatModel.setInitStatus(false)
            }
        },
        chatWithLLM(_, state) {
            if (state.chatModel.loading) {
                dispatch.notificationModel.notify({
                    notifyType: "error",
                    message: "发送过快，请稍后重试！！"
                })
                return
            }
            dispatch.chatModel.setInitStatus(false)
            let chatContext: History = {
                key: uuid4(),
                direction: "right",
                context: state.chatModel.content
            }
            dispatch.chatModel.addHistory(chatContext)
            dispatch.chatModel.setContent("")
            dispatch.chatModel.setLoading(true)
            setTimeout(() => {
                dispatch.chatModel.setLoading(false)
                let responseContext: History = {
                    key: uuid4(),
                    direction: "left",
                    context: "最近产品又改了需求（一砖头拍死），需要在 Windows 和 Mac 上显示相同的滚动条样式，也就是需要改变 Windows 下面滚动条的样式，那么可以这样处理，可以在 windows 下改变滚动条。"
                }
                dispatch.chatModel.addHistory(responseContext)
            }, 5000)

        },
        stopGenerate(){
            dispatch.chatModel.setLoading(false)
        }
    })
})