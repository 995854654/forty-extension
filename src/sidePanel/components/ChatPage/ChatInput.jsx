import React from 'react'
import {
    Box, Paper, IconButton,
    ButtonBase, Tooltip, InputBase
} from '@mui/material'
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import HistoryIcon from '@mui/icons-material/History';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { modelList } from "@/data/sideMenu"
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/joy/Typography';
export default function ChatInput() {
    return (
        <Box sx={{
            width: "100%",
            marginBottom: "2%",

        }} className="S-chat-input">

            <Grid container justifyContent="center" sx={{
                width: "100%",

            }}>
                <Box sx={{
                    width: "88%"
                }}>
                    <Grid container justifyContent="space-between">
                        <Grid xs={8} container justifyContent="start" spacing={1} sx={{ marginBottom: 0 }}>
                            <Grid>
                                <Select
                                    indicator={<KeyboardArrowDown sx={{ width: 18, height: 18 }} />}
                                    variant="solid"
                                    size="sm"
                                    sx={{
                                        minHeight: 0,
                                        fontSize: "0.7em",
                                        paddingTop: 0,
                                        paddingBottom: 0
                                    }}
                                >
                                    <>
                                        <Typography
                                            id="decorated-list-demo"
                                            level="body-xs"
                                            textTransform="uppercase"
                                            fontWeight="lg"
                                            mb={1}
                                            sx={{
                                                color: "#bebebe",
                                                paddingLeft: '5%'
                                            }}
                                        >
                                            基础模型
                                        </Typography>
                                        {modelList.baseModel.map((item) => {
                                            return (
                                                <Option key={item.key} value={item.key}>
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </>
                                    <>
                                        <Typography
                                            id="decorated-list-demo"
                                            level="body-xs"
                                            textTransform="uppercase"
                                            fontWeight="lg"
                                            mb={1}
                                            sx={{
                                                color: "#bebebe",
                                                paddingLeft: '5%'
                                            }}
                                        >
                                            高级模型
                                        </Typography>
                                        {modelList.seniorModel.map((item) => {
                                            return (
                                                <Option key={item.key} value={item.key}>
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </>
                                </Select>
                            </Grid>
                            <Grid>
                                <Tooltip title="上传文件" placement="top">
                                    <FileUploadIcon sx={{ width: 20, height: 20 }} />
                                </Tooltip>
                            </Grid>
                            <Grid>
                                <Tooltip title="prompt提示" placement="top">
                                    <AutoFixHighIcon sx={{ width: 20, height: 20 }} />
                                </Tooltip>
                            </Grid>

                        </Grid>
                        <Grid xs={4} container justifyContent="end" spacing={1} sx={{ marginBottom: 0 }}>
                            <Grid>
                                <Tooltip title="聊天记录" placement="top">
                                    <HistoryIcon sx={{ width: 20, height: 20 }} />
                                </Tooltip>
                            </Grid>
                            <Grid>
                                <Tooltip title="新聊天" placement="top">
                                    <AddCommentIcon sx={{ width: 20, height: 20 }} />
                                </Tooltip>
                            </Grid>


                        </Grid>

                    </Grid>
                </Box>
            </Grid>

            <Grid container justifyContent="center">
                <Paper
                    sx={{
                        // p: '0.5% 1%',
                        display: 'flex',
                        alignItems: 'center',
                        width: "90%",
                        borderRadius: "50px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)"
                        }
                    }}
                >
                    <Grid container justifyContent="space-between" sx={{ width: "100%", paddingLeft: "2%" }}>
                        <Grid xs={1} container alignItems="center">
                            <ButtonBase>
                                <img alt="brain" src={process.env.PUBLIC_URL + "/images/brain_icon.png"} style={{ width: "20px", height: "20px" }}></img>
                            </ButtonBase>
                        </Grid>
                        <Grid xs={10} container alignItems="center">
                            <InputBase
                                multiline
                                sx={{ width: "90%", fontSize: "0.8em" }}
                                placeholder="input what you want to know"
                            />
                        </Grid>

                        <Grid container xs={1} justifyContent="end" alignItems="center">
                            <IconButton type="button" sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#5662f6",
                                "&:hover": {
                                    backgroundColor: "#d7f7eb"
                                }
                            }} aria-label="search"
                            >
                                <NearMeOutlinedIcon sx={{ color: "white", width: 20, height: 20 }} />
                            </IconButton>
                        </Grid>

                    </Grid>



                </Paper>
            </Grid >



        </Box >
    )
}
