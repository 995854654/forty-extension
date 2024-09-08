import React, { useEffect, useState } from 'react'
import Table from '@mui/joy/Table';
import columns from "./columns"
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Tooltip } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import type { Dispatch, RootState } from '@/store/sider'
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/joy/Typography';
import HelpIcon from '@mui/icons-material/Help';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const DetailTip = ({ message }) => {
    return (
        <Box>
            <Grid container justifyContent="center">
                <Grid spacing={4}>
                    <Typography >
                        描述：
                    </Typography>
                </Grid>
                <Grid spacing={8}>
                    <Typography >
                        {message}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
enum DownloadStatus {
    UNKNOWN = 0,
    PROCESSING = 1,
    READY = 2,
    FAIL = 3
}
const StatusIcon = ({ num }) => {
    switch (num) {
        case DownloadStatus.UNKNOWN:
            return (<Tooltip title="未知状态" placement="top">
                <AccessTimeFilledRoundedIcon sx={{ color: "orange" }} />
            </Tooltip>)
        case DownloadStatus.PROCESSING:
            return (<Tooltip title="正在下载" placement="top">
                <CircularProgress
                    color="neutral" size="sm" variant="soft"
                />
            </Tooltip>)
        case DownloadStatus.READY:
            return (<Tooltip title="下载成功" placement="top">
                <CheckCircleIcon sx={{ color: "green" }} />
            </Tooltip>)
        case DownloadStatus.FAIL:
            return (<Tooltip title="下载失败" placement="top">
                <HighlightOffOutlinedIcon sx={{ color: "red" }} />
            </Tooltip>)
        default:
            return "-"
    }

}

export default function DownloadTable() {
    // 1为放大倍数
    const [customFontSize, setCustomFontSize] = useState(1)
    const resourceList = useSelector((rootState: RootState) => rootState.downloaderModel.table)
    const dispatch = useDispatch<Dispatch>()
    const handleResize = () => {
        let screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
            setCustomFontSize(0.7)
        } else {
            let fontSizeIncrement = (screenWidth - 480) / 480 * 0.5
            let newFontSize = Math.min(1, 0.7 + fontSizeIncrement).toFixed(1)
            setCustomFontSize(Number.parseFloat(newFontSize))
        }
    }


    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        dispatch.downloaderModel.refresh_table()
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <Sheet
            sx={{
                borderRadius: "sm",
                height: 350,
                overflow: 'auto',
                scrollbarWidth: "none"
            }}>
            <Table
                color="neutral"
                variant="soft"
                stickyHeader
                sx={{
                    "--unstable_TableCell-height": "auto",
                    "& td, th": {
                        textAlign: 'center',
                    },
                    fontSize: `${customFontSize}em`
                }}
                hoverRow
                size="sm"
            >
                <thead>
                    <tr>
                        {
                            columns.map((item) => {
                                return (
                                    <th key={item.key}>{item.label}</th>
                                )
                            })
                        }

                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {resourceList.map((item) => {
                        return (
                            <tr key={item.resource_id}>
                                {
                                    columns.map((columnItem) => {
                                        if (columnItem.key === "status") {
                                            return (
                                                <td key={`${item.resource_id} + ${columnItem.key}`}>
                                                    <StatusIcon num={item.status} />
                                                </td>
                                            )

                                        } else {
                                            return (
                                                <td
                                                    key={`${item.resource_id} + ${columnItem.key}`}
                                                >{item[columnItem["key"]]}</td>
                                            )
                                        }

                                    })
                                }

                                <td>
                                    <Grid container justifyContent="center" spacing={1}>
                                        <Grid>
                                            <Tooltip title={<DetailTip message={item.description}/>}
                                            placement='top'
                                            >
                                                <HelpIcon sx={{
                                                    color: '#1f1f1f',
                                                    width: "20px",
                                                    height: "20px"
                                                }}/>
                             
                                            </Tooltip>
                                       
                                        </Grid>
                                        <Grid>
                                            <DownloadIcon sx={{
                                                    color: '#1f1f1f',
                                                    width: "20px",
                                                    height: "20px"
                                                }}  />
                                            {/* <Box sx={{
                                                fontSize: `${customFontSize}em`,
                                                color: "#0782d8",
                                                fontWeight: "600"
                                            }}>下载</Box> */}
                                        </Grid>


                                    </Grid>


                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Sheet>
    )
}
