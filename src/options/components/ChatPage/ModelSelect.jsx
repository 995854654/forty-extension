import React from 'react'
import { Box, Tooltip } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SmoothIcon from '@/components/icons/SmoothIcon';
export default function ModelSelect() {
    return (
        <Box sx={{
            width: "50px",
            height: "100%",
            backgroundColor: "#353535",
            borderRadius: "50px",
            paddingLeft: "10px"
        }} className="model-select">
            <Box className="model-content">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid >
                        <Tooltip title="Smooth" placement="top">
                            <Box>
                                <SmoothIcon />
                            </Box>
                        </Tooltip>

                    </Grid>

                    <Grid >
                        <Box>
                            <ArrowDropDownIcon />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className="model-options"></Box>
        </Box>
    )
}
