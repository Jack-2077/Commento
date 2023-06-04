// init = (tab) => {
//   const { id, url } = tab;
//   chrome.scripting.executeScript({
//     target: { tabId: id, allFrames: true },
//     files: ['scripts/clientside.js'],
//   });
//   console.log(`Loading: ${url}`);
// };

// chrome.action.onClicked.addListener((tab) => {
//   init(tab);
// });

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/scripts/serviceworker.js', { scope: '/' })
//     .then((registration) => {
//       console.log('Service worker registered:', registration);
//     })
//     .catch((error) => {
//       console.error('Error registering service worker:', error);
//     });
// }

// {
//   "name": "Commento",
//   "description": "Sort YouTube comments by newest, oldest, top, or worst",
//   "version": "2.0",
//   "manifest_version": 3,
//   "background": {
//     "service_worker": "service.js"
//   },
//   "permissions": ["activeTab", "scripting"],
//   "host_permissions": ["*://*.youtube.com/watch?*"],
//   "action": {
//     "default_title": "Commento",
//     "default_icon": "icons/icon-48.png"
//   }
// }
