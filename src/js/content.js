//Chrome action listener for executing content script on extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

//onInstalled listener for extension initialization
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});
