import { createModel } from "@rematch/core";
import type { RootModel } from '@/models/sider'
import { LLMConfiguration } from "@/common/types/llm";
import { DEFAULT_MODEL_NAME } from "@/data/config";
type LLMStateType = {
    // 当前模型名称
    modelName: string,
    config: LLMConfiguration
}


const initLLMState: LLMStateType = {
    modelName: DEFAULT_MODEL_NAME,
    config: {
        model_name: DEFAULT_MODEL_NAME,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        seed: 255
    }
}

export const llmModel = createModel<RootModel>()({
    state: initLLMState,
    reducers: {
        setCurrentModel: (state: LLMStateType, payload: string) => {
            return {
                ...state,
                modelName: payload
            }
        }
    },
    effects: (dispatch) => ({
        
    })
})