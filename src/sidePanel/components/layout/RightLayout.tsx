import React from 'react'
import { Box, Tooltip, Avatar } from '@mui/material'
import { sideMenu } from "@/data/sideMenu"
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from "@/store/sider"
export default function Right() {
  const siderList = useSelector((rootState: RootState) => {
    return sideMenu.map((item) => {
      if (item.key === rootState.sideRouterModel.key) {
        item["active"] = true
      } else {
        item["active"] = false
      }
      return item
    })

  })
  const dispath = useDispatch<Dispatch>()

  const clickMenuButton = (key: string) => {
    dispath.sideRouterModel.push(key, {})
  }
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
            siderList.map((item, index) => {
              return (

                <Grid xs={12} key={item.key}>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Tooltip title={item.title} placement="left">
                      {item.active ? (
                        <Box sx={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "25%"
                        }}>
                          <item.icon sx={{
                            color: "#8a57ea",
                          }}
                            onClick={() => clickMenuButton(item.key)}
                          ></item.icon>
                        </Box>

                      ) : (
                        <Box sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.3)",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)"
                          }
                        }}>
                          <item.icon sx={{
                            color: "white",

                          }}
                            onClick={() => clickMenuButton(item.key)}
                          ></item.icon>

                        </Box>

                      )}

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
