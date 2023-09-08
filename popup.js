document.getElementById('checkNow').addEventListener('click', () => {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let activeTab = tabs[0];

        // Send a message to the content script of the active tab
        chrome.tabs.sendMessage(activeTab.id, { action: "checkNow" });
    });
});
document.getElementById("saveDuration").addEventListener("click", function() {
    const duration = document.getElementById("sleepDuration").value;
    chrome.storage.local.set({ sleepDuration: duration });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "updateDuration", value: duration});
    });
});

document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get("sleepDuration", function(data) {
        if (data.sleepDuration) {
            document.getElementById("sleepDuration").value = data.sleepDuration;
        }
    });
});
