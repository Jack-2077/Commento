/* 
Various sections of YouTube are loaded dynamically.
The code below uses a mutation observer to listen to
DOM changes and check if the comments have been
loaded on the page.
*/

chrome.runtime.onMessage.addListener((request) => {
  if (!request.activate) return;

  const trackedElement = document.getElementById('content');
  const config = {
    childList: true,
    subtree: true,
  };

  const callback = (mutationList, observer) => {
    if (mutationList.some((mutation) => mutation.target.id === 'comments')) {
      activateExtension();
      observer.disconnect();
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(trackedElement, config);
});

function activateExtension() {
  console.log(document.querySelector('ytd-comments'));
}

function test() {
  console.log(document.querySelector('ytd-comments'));

  console.log(document.querySelector('#below'));
  const trackedElement = document.querySelector('ytd-comment-thread-renderer');

  console.log(trackedElement);
  // if (!trackedElement) {
  //   window.setTimeout(test, 500);
  //   return;
  // }

  const config = {
    childList: true,
    subtree: true,
  };

  // const callback = (mutationList, observer) => {
  //   if (mutationList.some((mutation) => mutation.target.id === 'comments')) {
  //     activateExtension();
  //     observer.disconnect(); // Stop observing changes to the DOM
  //   }
  // };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  };

  // const observer = new MutationObserver(callback);
  // observer.observe(trackedElement, config);
  // observer.disconnect();
}

// function addObserverIfDesiredNodeAvailable() {
//   var composeBox = document.querySelectorAll('.no')[2];
//   if (!composeBox) {
//     //The node we need does not exist yet.
//     //Wait 500ms and try again
//     window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
//     return;
//   }
//   var config = { childList: true };
//   composeObserver.observe(composeBox, config);
// }
// addObserverIfDesiredNodeAvailable();

/* {
 
 
 - check for the comment element and if it exists check the parent
 } */
