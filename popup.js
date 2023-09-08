document.getElementById('checkNow').addEventListener('click', () => {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let activeTab = tabs[0];

        // Send a message to the content script of the active tab
        chrome.tabs.sendMessage(activeTab.id, { action: "checkNow" });
    });
});
