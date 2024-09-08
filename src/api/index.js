

const PREFIX_URL = "http://localhost:9958"


export const HTTP_API = {
    login: `${PREFIX_URL}/log_in`,
    refreshToken: `${PREFIX_URL}/refresh_token`,

    getResourceTable: `${PREFIX_URL}/resource/resource_table`,
    downloadResource: `${PREFIX_URL}/resource/download_resource`,
    checkWebsiteStatus: `${PREFIX_URL}/resource/check_resource_status`,

    qa: `${PREFIX_URL}/chat/qa`,
    saveHistory: `${PREFIX_URL}/chat/saveMessages`,
    getChatHistory: `${PREFIX_URL}/chat/history`

}

export const WS_API = {

}