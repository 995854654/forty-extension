

// 通过xpath获取单个元素
export function getElementByXpath(path, obj=null) {
    if (obj) {
        let iframeDoc = obj.contentDocument
        return iframeDoc.evaluate(path, iframeDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } else {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}
// 通过xpath获取多个元素
export function getElementByMoreXpath(xpath, obj = null) {
    let nodes;
    if (obj) {
        nodes = document.evaluate(xpath, obj, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    } else {
        nodes = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    }
    let arr = []
    let ele;
    while ((ele = nodes.iterateNext()) != null) {
        arr.push(ele)
    }
    return arr;
}

// 通过xpath定位添加线框
export function addBorderByXpath(xpath, borderObj = {}) {
    let arr = getElementByMoreXpath(xpath);
    if (arr.length === 0) {
        console.log(xpath,"定位失败")
    }
    arr.forEach((item,index) => { 
        for (let config in borderObj) {
            item.style[config] = borderObj[config]
        }
    })
}

// 通过xpath定位添加文字
export function addTextByXpath(xpath, comment) {
    let arr = getElementByMoreXpath(xpath);
    if (arr.length === 0) {
        console.log(xpath,"定位失败")
    }
    arr.forEach((item, index) => { 
        var p = document.createElement("p")
        p.innerText = comment
        item.appendChild(p)
    })
}



