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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'sortComments') {
    const sortOptions = [
      {
        name: 'Newest',
        fn: (a, b) =>
          new Date(
            b.querySelector('#header #published-time').getAttribute('datetime')
          ) -
          new Date(
            a.querySelector('#header #published-time').getAttribute('datetime')
          ),
      },
      {
        name: 'Oldest',
        fn: (a, b) =>
          new Date(
            a.querySelector('#header #published-time').getAttribute('datetime')
          ) -
          new Date(
            b.querySelector('#header #published-time').getAttribute('datetime')
          ),
      },
      {
        name: 'Top Comments',
        fn: (a, b) =>
          parseFloat(b.querySelector('#header #vote-count-middle').innerText) -
          parseFloat(a.querySelector('#header #vote-count-middle').innerText),
      },
      {
        name: 'Worst Comments',
        fn: (a, b) =>
          parseFloat(a.querySelector('#header #vote-count-middle').innerText) -
          parseFloat(b.querySelector('#header #vote-count-middle').innerText),
      },
    ];

    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: sortComments,
      args: [sortOptions, request.sortBy],
    });
  }
});
