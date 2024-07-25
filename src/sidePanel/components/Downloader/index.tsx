import React from 'react'
import { Box, InputLabel } from '@mui/material'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import DownloadTable from './DownloadTable';
import Grid from '@mui/material/Unstable_Grid2';
import CachedIcon from '@mui/icons-material/Cached';
import type { Dispatch } from '@/store/sider'
import { useDispatch } from 'react-redux';


export default function Downloader() {
    const dispatch = useDispatch<Dispatch>()
    
    const inputURL = (event: any) => {
        const { value } = event.target
        dispatch.downloaderModel.setInputURL(value)
    }
 
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

                <Grid >
                    <CachedIcon onClick={dispatch.downloaderModel.refresh_table}/>
                    <DownloadTable />

                </Grid>
            </Grid>



        </Box>
    )
}
