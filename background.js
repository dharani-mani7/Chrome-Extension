let activeTab = null;
let startTime = null;
let siteData = {};

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        trackTime(tab.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        trackTime(tab.url);
    }
});

function trackTime(url) {
    let domain = new URL(url).hostname;

    if (activeTab) {
        let endTime = new Date().getTime();
        let duration = (endTime - startTime) / 1000;

        if (!siteData[activeTab]) {
            siteData[activeTab] = 0;
        }
        siteData[activeTab] += duration;
        chrome.storage.local.set({ siteData });
    }

    activeTab = domain;
    startTime = new Date().getTime();
}
