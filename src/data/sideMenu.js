import ChatIcon from '@mui/icons-material/Chat';
import ChatPage from "@/sidePanel/components/ChatPage";
import Downloader from "@/sidePanel/components/Downloader";
import Login from '@/sidePanel/components/Login';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';


export const sideMenu = [
    {
        key: "chat",
        icon: ChatIcon,
        title: "聊天",
        element: ChatPage,
        isDisplay: true,  // 是否展现到右侧导航栏中
        default: true, // 初始默认页面
    },
    {
        key: "downloader",
        icon: DownloadForOfflineIcon,
        title: "下载管理器",
        element: Downloader,
        isDisplay: true,
    },
    {
        key: "login",
        icon: DownloadForOfflineIcon,
        title: "登录页面",
        element: Login,
        isDisplay: false,
    }

]

export const siderConfig = {
    // 右导航条宽度
    SIDER_WIDTH: "50px",
    DEFAULT_PAGE: "chat"
}

export const modelList = {
    baseModel: [
        {
            key: "GPT-4",
            label: "GPT-4",
        },
        {
            key: "moonshot-v1-8k",
            label: "Moonshot",
        },
        {
            key: "gpt-3.5",
            label: "GPT-3.5",
        },
    ],
    seniorModel: [
        {
            key: "gpt-4-turbo",
            label: "GPT-4 Turbo",
        },
        {
            key: "Gemini-1.5-Pro",
            label: "Gemini 1.5 Pro",
        },
    ]
}
