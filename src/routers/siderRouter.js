import ChatPage from "@/sidePanel/components/ChatPage";
import YoutubePage from "@/sidePanel/components/YoutubePage";
 
const router = [
    {
        path:'/chat',
        element: <ChatPage />,
        
    },
    {
        path:'/youtube',
        element: <YoutubePage />,
    }
]
 
export default router