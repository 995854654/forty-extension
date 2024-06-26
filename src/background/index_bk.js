/*global chrome*/

// import { api, page_api_url, pattern_url_list } from "@/api";
// import Logger from "@/common/utils/Logger";
// import { findObjectByKeyValue } from "@/common/utils/common";
// import { SendMessageMapping, functionModule } from "@/common/js/CommonConstants";
// const TAG = "background";

// // 谷歌插件第一次加载触发
// chrome.runtime.onInstalled.addListener(() => {

//     // 加载对应的模块功能到storage里
//     chrome.storage.sync.set({
//         "functionModule": functionModule
//     })
// })




// // 监听宿主页面的请求
// chrome.webRequest.onCompleted.addListener(
//     (detail) => {
//         // 获取对应的api对象
//         let api_obj = findObjectByKeyValue(page_api_url, "api", detail.url, true)
//         if (api_obj) {
//             Logger.info(TAG, `监听到api请求：${api_obj.name}`)
//             sendContentMessage(SendMessageMapping.DEAL_API_REQUEST, api_obj)
//         } else {
//             Logger.error(TAG, `查找不到对象`, detail)
//         }

//     },
//     {
//         urls: pattern_url_list
//     }

// );


// // 监听content_scripts页面发来的消息
// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     switch (request.todo) {
//         case "getMeicalInfoData":
//             let responseData = await getMedicalInfoData(request.data);
//             sendContentMessage("setMedicalInfoData", responseData)
//             console.log("background sendContentMessage")
//             break;
//         default:
//             break;
//     }
// });






// // 发送消息给content_scripts
// function sendContentMessage(todoType, data = {}) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, {
//             todo: todoType,
//             data: data
//         })
//     })

// }

// async function getMedicalInfoData(data) {
//     let prefix_url = chrome.i18n.getMessage("PREFIX_URL")
//     let url = `${prefix_url}${api.getMedicalInfoData}`

//     let formData = new FormData()
//     formData.append("card_ID", data.card_ID)
//     // 准备好请求的全部数据
//     let axiosConfig = {
//         method: "POST",
//         headers: {
//             "Api-Token": "jyzx-skip-authentication"
//         },
//         body: formData,
//     };
//     let responseData = null
//     await fetch(url, axiosConfig)
//         .then((res) => res.json())
//         .then((data) => {
//             responseData = data
//         })
//         .catch((err) => {
//             responseData = {
//                 code: -1,
//                 msg: "接口异常",
//                 data: null
//             }
//         })
//     return responseData


// }