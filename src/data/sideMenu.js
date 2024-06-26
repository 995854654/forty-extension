import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';

export const sideMenu = [
    {
        key: "chat",
        icon: ChatIcon,
        title: "聊天" 
    },
    {
        key: "youtube-downloader",
        icon: YouTubeIcon,
        title: "Youtube下载器" 
    }
]

export const siderConfig = {
    // 右导航条宽度
    SIDER_WIDTH:"60px"
}

export const modelList = {
    baseModel: [
        
        {
            key: "GPT-4",
            label: "GPT-4",
        },
        {
            key: "moonshot",
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
    