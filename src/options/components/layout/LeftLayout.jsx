import React from 'react'
import { Box } from '@mui/material'
import ChatPage from '@/sidePanel/components/ChatPage'
export default function LeftLayout() {
  return (
    <Box  sx={{
      backgroundColor: "#1f1f1f",
      height: "100%",
      color: "white",
      borderRadius: "20px",
    }}>
      <ChatPage />

    </Box>
  )
}
