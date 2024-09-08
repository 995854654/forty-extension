export type ChatBase = {
    direction: "left" | "right",
    key: string,
    context: string
}

export type HistoryBase = {
    history_id: string
    history_name: string
    description: string
    messages: string
    create_time: string
}

export type ChatType = {
    initStatus: boolean,
    isBottom: boolean,
    loading: boolean,
    content: string,
    chatHistoryOpen: boolean,
    historyID: string, 
    chatList: ChatBase[],
    historyList: HistoryBase[]
}