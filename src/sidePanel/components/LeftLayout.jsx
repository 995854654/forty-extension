import React, { useState } from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import ChatInput from './ChatInput';
export default function Left() {
  const [isInit, setIsInit] = useState(false)
  return (
    <Box sx={{
      backgroundColor: "#1f1f1f",
      height: "100%",
      color: "white",
      borderRadius: "20px",
    }}>
      <Grid container
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Grid xs={10} sx={{ width: "100%" }}>
          {
            isInit ? (null) : (<>


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





            </>)
          }
        </Grid>
        <Grid xs={2} sx={{width: "100%"}}>
          <ChatInput />
        </Grid>
      </Grid>



    </Box>
  )
}
