import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from '@/models/sider'
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";

const persist_plugin = persistPlugin<RootModel, RootModel>({
    whitelist: [
        "authenModel", "sideRouterModel", "settingModel"
    ],
    key: "sider",
    storage,
  })

export const store = init({
    name:"global-redux-store",
	models,
    plugins:[persist_plugin]
})
 
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>