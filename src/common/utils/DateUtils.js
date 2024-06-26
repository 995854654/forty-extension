
// 计算两个时间的时间差（返回天数）
export function calculateDateDiff(date1, date2) {
    // 两个日期
var date1 = new Date(date1);
var date2 = new Date(date2);

// 将日期转换为时间戳并计算相差的毫秒数
var timeDiff = Math.abs(date2.getTime() - date1.getTime());

// 将毫秒数转换为天数
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
return diffDays

}

export function getCurrentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要加1，然后用padStart补齐两位
    var day = today.getDate().toString().padStart(2, '0'); // 日期也要用padStart补齐两位

    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate

}