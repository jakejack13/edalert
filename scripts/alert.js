chrome.storage.onChanged.addListener(function (changes, namespace) {
    let numPosts = changes.numPosts.newValue;
    if (numPosts === 0) (async () => await chrome.action.setBadgeText({text: ""}))();
    else (async () => await chrome.action.setBadgeText({text: numPosts.toString()}))();
    chrome.action.setBadgeBackgroundColor({color: '#9688F1'}); 
  });
