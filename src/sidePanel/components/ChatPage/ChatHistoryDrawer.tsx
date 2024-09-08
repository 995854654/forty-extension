import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { HistoryBase } from "@/common/types/chat";
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CardContent from '@mui/joy/CardContent';
import { siderConfig } from "@/data/sideMenu"

export default function ChatHistoryDrawer({ open, setOpen, historyList, changeChatMessage }) {
    return (
        <Drawer open={open} onClose={() => setOpen(false)} anchor="bottom"
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: "#1f1f1f",
                    borderTopLeftRadius: "40px",
                    borderTopRightRadius: '40px',
                    maxHeight: "70vh",
                    minHeight: "30vh",
                    width: `calc(100vw - ${siderConfig.SIDER_WIDTH})`
                },
            }}
        >
            <Typography level="h4" sx={{
                color: "white",
                marginLeft: "20px",
                marginTop: "20px"
            }}>聊天历史</Typography>
            <List
                sx={{
                    overflow: "auto",
                }}>
                {
                    historyList.map((item: HistoryBase) => {
                        return (
                            <ListItem key={item.history_id} sx={{
                                "& :hover": {
                                    backgroundColor: "#2c2c2c"
                                },
                            }} onClick={()=>changeChatMessage(item)}>
                                <Card variant="plain" sx={{
                                    backgroundColor: "#1f1f1f",

                                }}>
                                    <Typography sx={{
                                        fontWeight: 700,
                                        color: "white"
                                    }}>{item.history_name}</Typography>
                                    <CardContent>
                                        <Typography
                                            noWrap
                                            sx={{ color: "white", width: `calc(85vw - ${siderConfig.SIDER_WIDTH})` }}
                                        >{item.description}</Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Drawer>
    )
}
