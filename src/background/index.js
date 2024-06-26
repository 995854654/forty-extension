/*global chrome*/

// 在上下文中设置openSidePanel事件
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'forty-extension',
        title: 'forty-extension',
        contexts: ['all']
    });

    chrome.contextMenus.create({
        parentId: "forty-extension",
        id: 'openSidePanel',
        title: '打开侧边栏',
        contexts: ['all']
    });
    chrome.contextMenus.create({
        parentId: "forty-extension",
        id: 'openOptions',
        title: '打开forty新页面',
        contexts: ['all']
    });

});

// 在上下文中点击openSidePanel弹出侧边栏
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
        // This will open the panel in all the pages on the current window.
        chrome.sidePanel.open({ windowId: tab.windowId });
    }
    else if (info.menuItemId === 'openOptions'){
        chrome.tabs.create({
            url: "options.html"
        })
    }
});