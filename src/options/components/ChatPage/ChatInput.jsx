import React from 'react'
import {
    Box, Paper, IconButton,
    ButtonBase, Tooltip,
} from '@mui/material'
import Textarea from '@mui/joy/Textarea';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import HistoryIcon from '@mui/icons-material/History';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ModelSelect from './ModelSelect';

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
                    width: "58%"
                }}>
                    <Grid container justifyContent="space-between">
                        <Grid xs={8} container justifyContent="start" spacing={2} sx={{ marginBottom: 0 }}>
                            <Grid>
                                <ModelSelect />
                            </Grid>
                            <Grid>
                                <Tooltip title="上传文件" placement="top">
                                    <FileUploadIcon />
                                </Tooltip>
                            </Grid>
                            <Grid>
                                <Tooltip title="prompt提示" placement="top">
                                    <AutoFixHighIcon />
                                </Tooltip>
                            </Grid>

                        </Grid>
                        <Grid xs={4} container justifyContent="end" spacing={2} sx={{ marginBottom: 0 }}>
                            <Grid>
                                <Tooltip title="聊天记录" placement="top">
                                    <HistoryIcon />
                                </Tooltip>
                            </Grid>
                            <Grid>
                                <Tooltip title="新聊天" placement="top">
                                    <AddCommentIcon />
                                </Tooltip>
                            </Grid>


                        </Grid>

                    </Grid>
                </Box>
            </Grid>

            <Grid container justifyContent="center">
                <Paper
                    sx={{
                        p: '0.5% 1%',
                        display: 'flex',
                        alignItems: 'center',
                        width: "60%",
                        borderRadius: "50px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)"
                        }
                    }}
                >
                    <Grid container justifyContent="space-between" sx={{ width: "100%" }}>
                        <Grid xs={1} container alignItems="center">
                            <ButtonBase sx={{ marginLeft: "10px" }}>
                                <img alt="brain" src={process.env.PUBLIC_URL + "/images/brain_icon.png"} style={{ width: "25px", height: "25px" }}></img>
                            </ButtonBase>
                        </Grid>
                        <Grid xs={10} container alignItems="center">
                            <Textarea
                            sx={{width: "100%"}}
                            variant="plain"
                                placeholder="input what you want to know"
                            />
                        </Grid>

                        <Grid container xs={1} justifyContent="end">
                            <IconButton type="button" sx={{
                                backgroundColor: "#5662f6",
                                "&:hover": {
                                    backgroundColor: "#d7f7eb"
                                }
                            }} aria-label="search"
                            >
                                <NearMeOutlinedIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Grid>

                    </Grid>



                </Paper>
            </Grid >



        </Box >
    )
}
