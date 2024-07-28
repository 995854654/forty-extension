import React, { useEffect, useRef } from 'react'
import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Unstable_Grid2';
import ChatItem from './ChatItem';
import { Box } from '@mui/joy';
import { Dispatch, RootState } from '@/store/sider';
import { useDispatch, useSelector } from 'react-redux';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
const chatStyle = {
    width: "90%",
    height: "500px",
    overflowY: "scroll",
    scrollbarWidth: "none",
    backgroundColor: "#1f1f1f",
    scrollBehavior: "smooth"

}
const chatStyleForNotBottom = {
    boxShadow: "3px 3px 3px rgb(200, 200, 200)",
    transition: "box-shadow 0.3s ease"
}

export default function ChatBox() {
    const scrollRef = useRef()
    const isBottom = useSelector((rootState: RootState) => rootState.chatModel.isBottom)
    const historyList = useSelector((rootState: RootState) => rootState.chatModel.historyList)
    const loading = useSelector((rootState: RootState) => rootState.chatModel.loading)
    const dispatch = useDispatch<Dispatch>()
    useEffect(() => {
        const scrollableDiv = document.getElementById('chat-box');
        // if (scrollableDiv.scrollHeight > scrollableDiv.clientHeight) {

        // 监听滚动事件  
        scrollableDiv.addEventListener('scroll', function () {
            // 获取当前滚动高度  
            const scrollTop = scrollableDiv.scrollTop;
            // 获取可视区域的高度  
            const clientHeight = scrollableDiv.clientHeight;
            // 获取内容的总高度  
            const scrollHeight = scrollableDiv.scrollHeight;
            // console.log(scrollTop, clientHeight, scrollHeight, Math.ceil(scrollTop) + clientHeight)
            // 检查是否滚动到达底部  
            if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
                dispatch.chatModel.setIsBottom(true)
            } else {
                if (!isBottom)
                dispatch.chatModel.setIsBottom(false)
            }

        });


    }, [])
    useEffect(() => {
        if (scrollRef.current) {
            let event: any = scrollRef.current
            event.scrollIntoView({ behavior: 'smooth' });
        }
    }, [historyList])
    return (
        <Box sx={{
            height: "100%",
            width: "100%",
            paddingTop: "1%"
        }}>
            <Grid container justifyContent="center"
            >
                <Card
                    id="chat-box"
                    sx={isBottom ? chatStyle : { ...chatStyle, ...chatStyleForNotBottom }}
                    variant="plain">
                    {
                        historyList.map((item) => {
                            return <ChatItem key={item.key} direction={item.direction} chatContext={item.context} />
                        })
                    }
                    <div ref={scrollRef}></div>
                </Card>
           

            </Grid>
            <Grid container justifyContent="center">
            <Button 
            size="sm"
            sx={{
                    marginTop: "1%",
                    color: "#8a57ea",
                    display: loading ? "show" : "none",
                    float: "inherit",
                    fontSize: "0.5em"
                }} startDecorator={<StopCircleOutlinedIcon />} variant="outlined"
                    onClick={dispatch.chatModel.stopGenerate}
                >停止生成</Button>
            </Grid>
         
        </Box>



    )
}
