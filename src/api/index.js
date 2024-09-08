

const PREFIX_URL = "http://localhost:9958"


export const HTTP_API = {
    login: `${PREFIX_URL}/log_in`,
    refresh_token: `${PREFIX_URL}/refresh_token`,

    get_resource_table: `${PREFIX_URL}/resource/resource_table`,
    download_resource: `${PREFIX_URL}/resource/download_resource`,
    check_website_status: `${PREFIX_URL}/resource/check_resource_status`,

    qa: `${PREFIX_URL}/chat/qa`,
    saveHistory: `${PREFIX_URL}/chat/saveMessages`

}

export const WS_API = {

}