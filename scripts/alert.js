chrome.storage.onChanged.addListener(function(changes, namespace) {
    let numPosts = changes.numPosts.newValue;

    if (numPosts === 0) {
        chrome.action.setBadgeText({ text: "" });
    } else {
        chrome.action.setBadgeText({ text: numPosts.toString() });
    }
    chrome.action.setBadgeBackgroundColor({ color: '#9688F1' });

    let iconUrl = 'images/edstem.png';
    chrome.notifications.create({
        type: 'basic',
        iconUrl: iconUrl,
        title: 'New Ed posts',
        message: "There are " + numPosts + " new posts",
        priority: 2,
        requireInteraction: true
    });
});
