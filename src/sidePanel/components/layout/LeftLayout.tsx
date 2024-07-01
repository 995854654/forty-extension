import React from 'react'
import { Box } from '@mui/material'
import ChatPage from '@/sidePanel/components/ChatPage'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/sider'
import {sideMenu} from "@/data/sideMenu"
export default function LeftLayout() {
  const LayoutComponent = useSelector((rootState:RootState)=> {
    let obj = sideMenu.filter((item) => {
      return item.key == rootState.sideRouterModel.key
    })
    if (obj.length >= 1) {
      return obj[0].element
    }else {
      return ChatPage
    }
  })
  return (
    <Box  sx={{
      backgroundColor: "#1f1f1f",
      height: "100%",
      color: "white",
      borderRadius: "20px",
    }}>
      <LayoutComponent />
    </Box>
  )
}
