

const PREFIX_URL = "http://localhost:9958"


export const HTTP_API = {
    login: `${PREFIX_URL}/log_in`,
    refresh_token: `${PREFIX_URL}/refresh_token`,

    get_resource_table: `${PREFIX_URL}/resource/resource_table`,
    download_resource: `${PREFIX_URL}/resource/download_resource`,

    qa: `${PREFIX_URL}/chat/qa`

}

export const WS_API = {

}