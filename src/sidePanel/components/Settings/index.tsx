import React from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalClose from "@mui/joy/ModalClose"
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from '@/store/sider'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Theme } from '@/data/config';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const themeList = function () {
    let arr = []
    for (let e in Theme) {
        arr.push({
            key: Theme[e],
            label: Theme[e]
        })
    }
    return arr
}()

export default function Settings() {
    const open = useSelector((rootState: RootState) => rootState.settingModel.open)
    const config = useSelector((rootState: RootState) => rootState.settingModel.config)
    const dispatch = useDispatch<Dispatch>()

    const changeTheme = (event: any, newValue: any) => {
        dispatch.settingModel.setTheme(newValue)
    }
    return (
        <Modal
            open={open}
            onClose={() => dispatch.settingModel.setOpen(false)}
        >
            <ModalDialog
                layout="fullscreen"
                variant="solid"
            >
                <ModalClose />
                <DialogTitle>设置</DialogTitle>
                <Grid container justifyContent="center" sx={{ width: "100%" }}>
                    <Grid container sx={{ width: "60%" }} justifyContent="start">
                        {/* 主题色 */}
                        <Box>
                            <InputLabel sx={{ color: "white" }}>主题色：</InputLabel>
                            <Select
                                indicator={<KeyboardArrowDown sx={{ width: 20, height: 20 }} />}
                                defaultValue={config.theme}
                                sx={{
                                    minWidth: 60,
                                    minHeight: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                                onChange={changeTheme}
                            >
                                {
                                    themeList.map((item) => {
                                        return (
                                            <Option key={item.key} value={item.key}>{item.label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Box>

                    </Grid>

                </Grid>


            </ModalDialog>

        </Modal>
    )
}
