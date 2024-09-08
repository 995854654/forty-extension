import React, { useEffect } from 'react'
import { Box, InputLabel } from '@mui/material'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import DownloadTable from './DownloadTable';
import Grid from '@mui/material/Unstable_Grid2';
import CachedIcon from '@mui/icons-material/Cached';
import type { Dispatch } from '@/store/sider'
import { useDispatch } from 'react-redux';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';


export default function Downloader() {
    const dispatch = useDispatch<Dispatch>()
    
    const inputURL = (event: any) => {
        const { value } = event.target
        dispatch.downloaderModel.setInputURL(value)
    }
    const click_refresh_table = () => {
        dispatch.notificationModel.notify({notifyType: "success", message: "刷新成功"})
        dispatch.downloaderModel.refresh_table()
    }
    useEffect(() => {
        dispatch.downloaderModel.checkWebsiteStatus()
    }, [])
    return (
        <Box sx={{

            height: "100%"
        }}>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                sx={{
                    padding: "5%",

                    height: "100%"
                }}
            >
                <Grid >
                    <Box>
                        <InputLabel sx={{ color: "white", fontWeight: "600" }}>URL:</InputLabel>
                        <Input
                            color="neutral"
                            variant="soft"
                            onChange={inputURL}
                        ></Input>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end"
                            }}>
                            <Button
                                sx={{
                                    marginTop: "3%"
                                }}
                                loading={false}
                                variant="soft"
                                onClick={dispatch.downloaderModel.downloadResource}
                            >download</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid>
                    <Typography sx={{color: "white"}}>
                        目前下载器支持&nbsp;
                        <Typography sx={{fontWeight: 700}}>
                            youtube、&nbsp;bilibili
                        </Typography>
                        网站的资源下载！！<br />
                        <Typography sx={{fontWeight: 700, color: "red"}}>
                            操作方法：
                            </Typography>
                            复制视频地址到输入框，最后点击按钮即可。可以点击表格上方的刷新按钮查看进度。
                    </Typography>
                    <Card>


                    </Card>
                </Grid>
                <Grid >
                    <CachedIcon onClick={click_refresh_table} sx={{
                        ":hover": {
                            color: "#8a57ea",
                            backgroundColor: "white",
                            borderRadius: "30px"
                        }
                    }}/>
                    <DownloadTable />

                </Grid>
            </Grid>



        </Box>
    )
}
