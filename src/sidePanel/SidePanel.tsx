import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import LeftLayout from './components/layout/LeftLayout';
import RightLayout from './components/layout/RightLayout';
import { siderConfig } from "@/data/sideMenu"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from "@/store/sider"
export default function SidePanel() {

  const siderKey = useSelector(
    (rootState: RootState) => rootState.sideRouterModel.key
  )
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (siderKey !== "login"){
      dispatch.authenModel.verify_authen_state()
    }
  }, [])
  return (

    <Box
      sx={{
        width: "100%",
        height: "100vh"
      }}
    >
      <Grid container spacing={0} sx={{
        padding: 0,
        margin: 0,
        width: "100vw",
      }}>
        <Box sx={{
          display: "inline-block",
          width: `calc(100% - ${siderConfig.SIDER_WIDTH} - 1%)`,
          marginBottom: "1%",
          marginTop: "1%",
          marginLeft: "1%"
        }}>
          <LeftLayout></LeftLayout>
        </Box>
        <Box sx={{
          display: "inline-block",
          width: siderConfig.SIDER_WIDTH,
        }}>
          <RightLayout></RightLayout>
        </Box>
      </Grid>
    </Box>

  )
}
