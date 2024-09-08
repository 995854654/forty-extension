
import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { HTTP_API } from "@/api";
import { v4 as uuid4 } from "uuid"
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { postByJSON } from "@/common/utils/httpRequest";

const markdownText = `
## Langchain

### 主要组成部分

-   Model I/O: 管理LLM模型以及其输入(Prompts)和格式化输出(Output)
-   Data connection: 管理主要用于建设私域知识库的向量数据存储（Vector Stores）、内容数据获取（Document Loaders）和转化（Transformers）、以及向量数据查询（Retrievers）
-   Memory: 用于存储或获取对话历史记录的功能模块
-   Chains：用于串联Memory、Model I/O、Data connection
-   Agents: 基于Chains进一步串联工具(Tools)，从而将大语言模型的能力和本地、云服务能力结合，user --> agent --> many of LLMs --> agent --> user
-   Callbacks: 提供了一个回调系统，可以连接到LLm申请的各个阶段，便于进行日志记录、追踪等数据导流
-   Embedding: 文本嵌入，可以有两种模式，from_documents支持传入多个文档，from_text支持传入一段字符串。将文档嵌入到vector store中。原理就是将文本转化向量数据（供计算机识别）
-   retriever: 检索器，通过查询vector store，查到相似度高的内容。
-   Tool： 工具集，用于给Agent串联的工具。









## FAQ

### fastAPI文档加载异常
原因：因为fastAPI文档使用了外网CDN的资源，所以需要将资源保存到本地

解决链接：~https://blog.csdn.net/m0_52726759/article/details/124854070?spm=1001.2014.3001.5502~

1. 在~Lib/site-package/fastapi/openapi/docs.py~修改swagger url
    ~~~python
   def get_swagger_ui_html():
        ...
        swagger_js_url: str = "/static/swagger-ui/swagger-ui-bundle.js"
        swagger_css_url: str = "/static/swagger-ui/swagger-ui.css"
        swagger_favicon_url: str = "/static/swagger-ui/favicon.png"
   
   def get_redoc_html():
        ...
        redoc_js_url:str = "/static/bundles/redoc.standalone.js"
   ~~~

2. 在fastAPI应用中添加以下代码：
    ~~~python
    from fastapi import FastAPI
    from starlette.staticfiles import StaticFiles
    app = FastAPI()
    # 将OpenAI docs代码接管到本地中
    app.mount("/static", StaticFiles(directory="static"), name="static")
    ~~~
`

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
    historyID: string, 
    historyList: History[]
}

const initChatState: ChatType = {
    initStatus: true,
    isBottom: false,
    loading: false,
    content: "",
    historyID: null,
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
        },
        createHistoryID: (state:ChatType) => {
            return {
                ...state,
                historyID: uuid4()
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
            if (!state.chatModel.historyID){
                dispatch.chatModel.createHistoryID()
            }
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
            let key = uuid4()
            dispatch.chatModel.addHistory({
                direction: "left",
                key,
                context: ""
            })
            setTimeout(() => {
                let chatResponse = markdownText;
                 dispatch.chatModel.saveAIChatResponse({
                    direction: "left",
                    key,
                    context: chatResponse
                })
                dispatch.chatModel.setLoading(false)
            }, 3000)
        },
        saveHistoryToDB(_, state){
            console.log("saveHistory")
            let request = {
                historyID: state.chatModel.historyID,
                messages: state.chatModel.historyList
            }
            postByJSON(HTTP_API.saveHistory, request).then((res) => {
                if (res.success){
                    console.log("save history successfully!!")
                }
            })

        },
        sendContextBySSE(_, state) {
            const ctrl = new AbortController()
            let token_type = sessionStorage.getItem("token_type")
            let token = sessionStorage.getItem("token")
            let request = {
                context: state.chatModel.content,
                historyID: state.chatModel.historyID,
                messages: state.chatModel.historyList.slice(0, -1)
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
                    if (chatResponse === ""){
                        chatResponse = "\n"
                    }
                    dispatch.chatModel.saveAIChatResponse({
                        direction: "left",
                        key,
                        context: chatResponse
                    })
                },
                onclose() {
                    dispatch.chatModel.setLoading(false)
                    dispatch.chatModel.saveHistoryToDB(null)
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