import React from 'react'
import Card from '@mui/joy/Card';
import Grid from '@mui/material/Unstable_Grid2';
import { USER_AVATOR, SYSTEM_AVATOR } from '@/data/config';
import { Avatar, Box } from '@mui/material'
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Dispatch } from '@/store/sider';
import { useDispatch } from 'react-redux';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import MarkdownRender from '@/components/MarkdownRender';
const ChatMessage = ({ direction, chatContext, systemName, userName }) => {
    const dispatch = useDispatch<Dispatch>()
    const duplicateText = (context: string = null) => {
        if (context){
            navigator.clipboard.writeText(context)
        }else {
            navigator.clipboard.writeText(chatContext)
        }
        dispatch.notificationModel.notify({
            notifyType: "success",
            message: "复制成功"
        })
    }
    return (
        <Box sx={{
            maxWidth: "70vw",
            position: "relative"
        }}>
            {
                direction === "left" ? (
                    <Box sx={{
                        position: "relative",
                        marginBottom: "5px"
                    }}>
                        <Avatar component="span" alt="system" src={SYSTEM_AVATOR} sx={{
                            width: 18, height: 18,
                            position: "absolute"
                        }} />
                        <Typography component="span" sx={{
                            fontSize: "0.8em",
                            fontWeight: "700",
                            marginLeft: "20px",
                            color: "white"
                        }}>
                            {systemName}
                        </Typography>
                    </Box>

                ) : (
                    <Box sx={{
                        position: "relative",
                        marginBottom: "5px"
                    }}>
                        <Grid container justifyContent="right">
                            <Typography component="span" sx={{
                                fontSize: "0.8em",
                                fontWeight: "700",
                                marginRight: "20px",
                                position: "absolute",
                                color: "white"
                            }}>
                                {userName}
                            </Typography>
                            <Avatar component="span" alt="user" src={USER_AVATOR} sx={{
                                width: 18, height: 18,
                            }} />
                        </Grid>
                    </Box>

                )
            }
            <Card sx={{paddingTop: 0, paddingBottom: 0}}>
                <MarkdownRender markdownText={chatContext} copyText={duplicateText}></MarkdownRender>
            </Card>
            <Grid container sx={{
                marginTop: "5px"
            }} spacing={1}>
                <Grid>
                    <Tooltip title="复制" size="sm">
                        <ContentCopyIcon sx={{
                            width: 18,
                            height: 18,
                            color: "white"
                        }} onClick={() => duplicateText(null)} />
                    </Tooltip>
                </Grid>
                <Grid>
                    <Tooltip title="good" size="sm">
                        <ThumbUpAltIcon sx={{
                            width: 18,
                            height: 18,
                            color: "white"
                        }} />
                    </Tooltip>
                </Grid>
                <Grid>
                    <Tooltip title="bad" size="sm">
                        <ThumbDownAltIcon sx={{
                            width: 18,
                            height: 18,
                            color: "white"
                        }} />
                    </Tooltip>
                </Grid>

            </Grid>
        </Box>

    )
}


export default function ChatItem({ direction, chatContext }) {
    return (
        <Box>
            <Grid container justifyContent={direction === "left" ? "start" : "end"}>
                <ChatMessage
                    direction={direction}
                    chatContext={chatContext} systemName="gpt-4-turbo" userName="you" />
            </Grid>
        </Box>
    )
}
