import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { Theme } from "@/data/config";
type ConfigType = {
    theme: Theme
}

type SettingType = {
    open: boolean,
    config: ConfigType
}

const initSetting: SettingType = {
    open: false,
    config: {
        theme: Theme.DARK
    }
}
export const settingModel = createModel<RootModel>()({
    state: initSetting,
    reducers: {
        setOpen: (state: SettingType, payload:boolean) => {
            return {
                ...state,
                open: payload
            }
        },
        setTheme: (state: SettingType, payload:Theme) => {
            return {
                ...state,
                config: {
                    ...state.config,
                    theme: payload
                }
            }
        }
    },
    effects: (dispatch) => ({
        
    })

})