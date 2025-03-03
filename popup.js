document.addEventListener("DOMContentLoaded", function () {
    // Get current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentUrl = new URL(tabs[0].url).hostname;

        // Retrieve stored time from Chrome storage
        chrome.storage.local.get([currentUrl], function (result) {
            let timeSpent = result[currentUrl] || 0; // Default to 0 if no data
            document.getElementById("time").textContent = timeSpent + " seconds";
        });
    });
});
