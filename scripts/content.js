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
  const commentsEl = document.querySelector('#comments');

  const sortButton = document.createElement('button');
  sortButton.classList.add('comments-header-btn');
  sortButton.innerHTML = 'SORT';

  if (!commentsEl.querySelector('header')) {
    const header = document.createElement('header');
    header.classList.add('comments-header');
    header.append(sortButton);
    commentsEl.prepend(header);
  }
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
 - copy options menu and insert new option
 const commentsEl = document.querySelector('#comments');

  const optionsMenu = document.querySelector('tp-yt-paper-listbox');

  const optionCopy = optionsMenu.children[0].cloneNode(true);

  optionCopy.textContent = 'test option';

  optionsMenu.prepend(optionCopy);
  console.log(optionsMenu);
 } */
