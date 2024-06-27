import React from 'react'
import { Box, Tooltip, Avatar } from '@mui/material'
import {sideMenu} from "@/data/sideMenu"
import Grid from '@mui/material/Unstable_Grid2';
export default function Right() {
  return (
    <Box sx={{
      width: "100%",
    }}>
      <Grid container flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "100vh",
          paddingTop: "40%",
          paddingBottom: "40%"
        }}
      >
        {/* 功能模块 */}
        <Grid container rowSpacing={3}>
          {
            sideMenu.map((item, index) => {
              return (

                <Grid xs={12} key={item.key}>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Tooltip title={item.title} placement="left">
                      <item.icon sx={{
                        color: "white",

                      }}></item.icon>
                    </Tooltip>
                  </Box>
                </Grid>

              )
            })
          }
        </Grid>
        {/* 用户操作 */}
        <Grid container rowSpacing={2}>
          <Grid xs={12}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Avatar alt="personal avator" src="/images/yami.png" sx={{ width: "24px", height: "24px" }} />
            </Box>
          </Grid>
        </Grid>



      </Grid>




    </Box>
  )
}
