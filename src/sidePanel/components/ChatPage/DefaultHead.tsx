import React from 'react'
import { Box } from '@mui/material'

export default function DefaultHead() {
    return (
        <>
            <Box sx={{
                fontWeight: "900",
                fontSize: "1.5em",
                marginLeft: "2%",
                paddingTop: "1%"
            }}>CHAT</Box>
            <Box sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "15%"
            }}>
                <Box sx={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                }}>
                    <img
                        src={process.env.PUBLIC_URL + "/images/brain.png"}
                        style={{ width: "80%", marginTop: "20%", marginLeft: "10%" }}
                        alt="" />
                </Box>
            </Box>

            <Box sx={{
                fontWeight: "700",
                fontSize: "1em",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "2%"
            }}>What I can help you?</Box>
        </>
    )
}
