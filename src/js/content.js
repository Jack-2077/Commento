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

function sortComments(sortOptions, sortBy) {
  const commentsSection = document.querySelector('#comments');
  const commentList = commentsSection.querySelector('#contents');
  const sortMenu = commentsSection.querySelector('#sort-menu');

  console.log(commentList);

  // Remove any existing sort menu options
  const existingSortMenuOptions = sortMenu.querySelector(
    '.ytd-menu-popup-renderer'
  );
  if (existingSortMenuOptions) {
    existingSortMenuOptions.remove();
  }

  // Create the sort menu options
  const sortMenuOptions = document.createElement('div');
  sortMenuOptions.className = 'ytd-menu-popup-renderer';
  sortOptions.forEach((option, index) => {
    const menuItem = document.createElement('paper-item');
    menuItem.className = 'style-scope ytd-menu-popup-renderer';
    menuItem.setAttribute('role', 'menuitem');
    menuItem.setAttribute('tabindex', '0');
    menuItem.setAttribute('aria-disabled', 'false');
    menuItem.innerText = option.name;
    menuItem.addEventListener('click', () => {
      chrome.runtime.sendMessage(
        { message: 'sortComments', sortBy: index },
        (response) => {}
      );
    });
    sortMenuOptions.appendChild(menuItem);
  });

  // Add the sort menu options to the sort menu
  sortMenu.appendChild(sortMenuOptions);

  // Sort the comments by the specified option
  const sortedComments = Array.from(commentList.children).sort(
    sortOptions[sortBy].fn
  );
  commentList.append(...sortedComments);
}

//Chrome action listener for executing content script on extension icon click
// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: sortComments,
//     args: [sortOptions, request.sortBy],
//   });
// });

//onInstalled listener for extension initialization
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'sortComments') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: sortComments,
      args: [sortOptions, request.sortBy],
    });
  }
});

// {
//     "manifest_version": 3,
//     "name": "Commento",
//     "description": "Sort YouTube comments by newest, oldest, top, or worst",
//     "version": "2.0",
//     "icons": {
//       "16": "icons/icon-16.png",
//       "48": "icons/icon-48.png",
//       "128": "icons/icon-128.png"
//     },
//     "permissions": ["activeTab", "scripting"],
//     "host_permissions": ["*://*.youtube.com/*"],
//     "background": {
//       "service_worker": "scripts/content.js"
//     },
//     "action": {
//       "default_icon": {
//         "16": "src/icons/icon-16.png",
//         "48": "src/icons/icon-48.png",
//         "128": "src/icons/icon-128.png"
//       }
//     }
//   }
