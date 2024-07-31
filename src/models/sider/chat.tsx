
import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { HTTP_API } from "@/api";
import { v4 as uuid4 } from "uuid"
import { fetchEventSource } from '@microsoft/fetch-event-source'

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
        },
        saveAIChatResponse: (state: ChatType, payload: History) => {
            let len = state.historyList.length
            let current_context = state.historyList[len - 1].context
            current_context += payload.context
            let record = {
                ...payload,
                context: current_context
            }
            let new_history = state.historyList.slice(0, len - 1)
            new_history.push(record)
            return {
                ...state,
                historyList: new_history
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
            if (!state.chatModel.content.trim()) {
                dispatch.notificationModel.notify({
                    notifyType: "error",
                    message: "请输入内容"
                })
                return
            }
            if (state.chatModel.loading) {
                dispatch.notificationModel.notify({
                    notifyType: "error",
                    message: "发送过快，请稍后重试！！"
                })
                return
            }
            dispatch.chatModel.setLoading(true)
            dispatch.chatModel.setInitStatus(false)
            let chatContext: History = {
                key: uuid4(),
                direction: "right",
                context: state.chatModel.content
            }
            dispatch.chatModel.addHistory(chatContext)
            // 发送SSE请求给BE
            // dispatch.chatModel.sendContextBySSE(null)
            // 临时版，避免过度消耗gpt
            dispatch.chatModel.sendContextByTemp(null)

            // 清空信息
            dispatch.chatModel.setContent("")



        },
        stopGenerate() {
            dispatch.chatModel.setLoading(false)
        },

        sendContextByTemp(_, state) {
            function heredoc(fn) {
                return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
            }
            let key = uuid4()
            dispatch.chatModel.addHistory({
                direction: "left",
                key,
                context: ""
            })
            setTimeout(() => {
                let chatResponse = heredoc(function () {/*
                   在一个阳光明媚的春天，我出生在一个小镇上。小镇的生活虽然平淡，但却充满了温暖。我的父母都是普通的工人，尽管他们的日子过得很辛苦，但他们始终给予我无尽的爱和关怀。

我在这个小镇上度过了快乐的童年。记得和小伙伴们一起在河边捉蝌蚪，在田野里奔跑，或者在傍晚时分听着虫鸣、看着星空。那时的我，心中充满了对世界的好奇与向往，觉得未来充满了无限可能。

上学后，我渐渐意识到，我的生活与许多同学的生活并不一样。家庭经济的拮据让我有时无法参加课外活动，也让我在学业上感到一丝压力。尽管如此，我从未放弃过。努力学习和克服困难成为了我生活的一部分。我开始理解，成长不仅是身体的变化，更是心灵和思想的蜕变。

随着年纪的增长，我开始更加深入地思考自己的理想与目标。高中时，我对文学产生了浓厚的兴趣，常常写一些小文章或诗歌。老师的鼓励让我对写作充满信心，我渐渐意识到，文字是我表达内心世界的一种方式。通过写作，我学会了观察生活、反思自我，也让我在与他人的沟通中变得更加敏感与 empathetic。

然而，人生的道路并不像我想象的那样一帆风顺。在大学里，经济压力再一次压得我喘不过气来。为了减轻家庭负担，我选择了一份兼职工作。那段时间，我常常忙碌于课程与工作之间，几乎没有时间休息。一次次的疲惫让我感到无比沮丧，但我告诉自己，这些经历终将成为我成长的一部分。

正是因为这些艰辛的经历，让我更加懂得了珍惜。当我终于站在毕业典礼的舞台上，手握学位证书的那一刻，泪水夺眶而出。那是无数个日日夜夜努力的结晶，是我和我的家人共同付出的结果。这份成就感不只是属于我，也属于所有支持我的人。

步入社会后，我开始真正面对生活的挑战。工作中的压力、人与人之间的摩擦，让我意识到，成长不仅仅是取得成就，更是学会面对挫折与困难。每一次失败都是一次宝贵的经验，每一次挑战都让我变得更加成熟。

回首一路走来的点滴，我明白了成长的意义。它不仅是身体的变化，更是心灵的成长，是对生活的深刻理解和对未来的美好期待。无论未来有什么样的挑战，我都将以一颗勇敢和坚定的心，继续前行。

                 */});
                 dispatch.chatModel.saveAIChatResponse({
                    direction: "left",
                    key,
                    context: chatResponse
                })
                dispatch.chatModel.setLoading(false)
            }, 3000)
        },

        sendContextBySSE(_, state) {
            const ctrl = new AbortController()
            let token_type = sessionStorage.getItem("token_type")
            let token = sessionStorage.getItem("token")
            let request = {
                context: state.chatModel.content
            }
            let key = uuid4()

            dispatch.chatModel.addHistory({
                direction: "left",
                key,
                context: ""
            })
            fetchEventSource(HTTP_API.qa, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${token_type} ${token}`
                },
                body: JSON.stringify(request),
                signal: ctrl.signal,
                openWhenHidden: true,  //页面退至后台保持连接
                onmessage(msg: { data: any, event: string }) {
                    // 服务器返回消息回调 返回{ data,event,id,retry } ，data即服务器返回数据
                    let chatResponse = msg.data
                    dispatch.chatModel.saveAIChatResponse({
                        direction: "left",
                        key,
                        context: chatResponse
                    })
                },
                onclose() {
                    dispatch.chatModel.setLoading(false)
                    console.log("Closing EventSource")
                    // 正常结束的回调
                    ctrl?.abort()
                    throw new Error()
                },
                onerror(err: any) {
                    // 连接出现异常回调
                    // 必须抛出错误才会停止
                    console.log("onError EventSource")
                    ctrl?.abort()
                    throw new Error()
                },

            })
        },
    })
})