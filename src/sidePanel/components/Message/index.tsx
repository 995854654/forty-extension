import React from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, Dispatch } from '@/store/sider'
import { Snackbar,Alert } from '@mui/material'

export default function Notification() {
    const open = useSelector(
        (rootState: RootState) => rootState.notificationModel.open
    )

    const message = useSelector(
        (rootState: RootState) => rootState.notificationModel.message
    )

    const notifyType = useSelector(
        (rootState: RootState) => rootState.notificationModel.notifyType
    )

    const dispatch = useDispatch<Dispatch>()
    const onClose = () => {
        dispatch.notificationModel.closeNotification()
    }
    return (
        <Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top', horizontal: 'center'
                }}
                autoHideDuration={1000}
                open={open}
                onClose={onClose}
            >
                <Alert
                    onClose={onClose}
                    severity={notifyType}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>

        </Box>
    )
}
