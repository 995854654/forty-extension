import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import ChatInput from './ChatInput';
import DefaultHead from './DefaultHead';
import ChatBox from './ChatBox';
import { RootState,Dispatch } from '@/store/sider';
import { useSelector, useDispatch } from 'react-redux';
import "./index.css"
export default function ChatPage() {
  const isInit = useSelector((rootState: RootState) => rootState.chatModel.initStatus)
  const dispatch = useDispatch<Dispatch>()
  useEffect(() => {
    dispatch.chatModel.checkIfinit(null)
  }, [])
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter' && !event.shiftKey) { 
      dispatch.chatModel.chatWithLLM(null)
    }  
  }
  return (
    <Box sx={{
      height: "100%"
    }}
      onKeyDown={handleKeyDown}
    >
      <Grid container
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Grid xs={10} sx={{ width: "100%", height: "65vh" }}>
          {
            isInit ? (<DefaultHead />) : (<ChatBox />)
          }
        </Grid>
        <Grid container xs={2} sx={{ width: "100%", height: "25vh" }} alignItems="end">
          <ChatInput />
        </Grid>
      </Grid>



    </Box>
  )
}
