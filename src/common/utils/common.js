import Logger from "./Logger"


const TAG = "utils.common"


// 给定一个数组，每个元素是一个对象，根据key和value查找对象
// opacity_match:是否模糊匹配,但只返回第一个元素
export function findObjectByKeyValue(arr_list, key, value,opacity_match=false) {
    if (!arr_list || arr_list.length == 0) {
        return null
    }
    try {
        for (var item of arr_list) {
            if (opacity_match) {
                if (item[key].indexOf(value) != -1 || value.indexOf(item[key]) != -1) {
                    return item
                }
            } else {
                if (item[key] === value) {
                    return item
                }
            }
           
        }
        return null

    } catch (err) {
        Logger.error(TAG, err)
        return null
    }

}

