let activated = false;

chrome.runtime.onMessage.addListener((request) => {
  if (!request.activate) return;

  const trackedElement = document.getElementById('content');

  const config = {
    childList: true,
    subtree: true,
  };

  const callback = (mutationList, observer) => {
    // Check if there are comments available to sort
    const commentsSectionToSort = document.querySelectorAll(
      '#sections>#contents'
    )[1];
    const commentsSectionToSort2 = document.querySelectorAll(
      '#sections>#contents'
    )[0];

    console.log(commentsSectionToSort, commentsSectionToSort2.hasChildNodes());
    if (
      mutationList.some((mutation) => mutation.target.id === 'comments') &&
      !activated
    ) {
      activateExtension();
      activated = true;
      observer.disconnect(); // Stop observing changes to the DOM
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(trackedElement, config);
});

{
  //#sections>#contents
  /* <a class="yt-simple-endpoint style-scope yt-dropdown-menu iron-selected" aria-selected="true" tabindex="0">
        <tp-yt-paper-item class="style-scope yt-dropdown-menu" style-target="host" role="option" tabindex="0" aria-disabled="false"><!--css-build:shady-->
          <tp-yt-paper-item-body class="style-scope yt-dropdown-menu"><!--css-build:shady-->
            <div id="item-with-badge" class="style-scope yt-dropdown-menu">
              <div class="item style-scope yt-dropdown-menu">Top comments
                <span class="notification style-scope yt-dropdown-menu" hidden=""></span>
              </div>
              <ytd-badge-supported-renderer class="style-scope yt-dropdown-menu" disable-upgrade="" hidden="">
              </ytd-badge-supported-renderer>
            </div>
            <div secondary="" id="subtitle" class="style-scope yt-dropdown-menu" hidden="">
              
            </div>
          
</tp-yt-paper-item-body>
          <yt-reload-continuation class="style-scope yt-dropdown-menu">
          </yt-reload-continuation>
        
</tp-yt-paper-item>
</a> */
}

function activateExtension() {
  console.log('sort');
  //   const commentsSection = document.querySelector(
  //     '.dropdown-content style-scope yt-dropdown-menu'
  //   );

  const kest = document.querySelector('#sections>#contents');

  console.log(kest);
  const originalCommentsContainer = document.querySelector('#below');
  const commentsSection = document.querySelector(
    '#menu.dropdown-content.style-scope.yt-dropdown-menu'
  );

  const originalOption = commentsSection.children[1];

  const newOptionParent = originalOption.cloneNode(true); //creating a copy of the existing option

  const newOption = newOptionParent.querySelector(
    '.item.style-scope.yt-dropdown-menu'
  );

  newOption.textContent = 'Test Option';

  const secondChild = commentsSection.children[1];
  commentsSection.insertBefore(newOptionParent, secondChild);
  console.log(commentsSection);

  // const parentElement = copyOfOption.querySelector(
  //   '#item-with-badge.style-scope.yt-dropdown-menu'
  // );

  // copyOfOption.replaceChild(parentElement, change);

  // console.log(copyOfOption);
  // commentsSection.appendChild(newOption);

  // originalCommentsContainer.append(commentsSection);
  // console.log(originalCommentsContainer);

  // const test = document.querySelector('#sections.style-scope.ytd-comments');
  // test.style.display = 'none';
  // console.log(test);
  // const newEl = commentsSection;

  // commentsSection.parentNode.replaceChild(newEl, commentsSection);
  // const thirdChild = commentsSection.children[2];
  // commentsSection.insertBefore(newOption, thirdChild);

  // commentsSection.appendChild(newOption);
  // window.requestAnimationFrame(() => {});
}

// const newOption = document.createElement('a');

// newOption.classList.add(
//   'yt-simple-endpoint',
//   'style-scope',
//   'yt-dropdown-menu'
// ); //iron-selected
// newOption.setAttribute('tabindex', '-1');
// newOption.setAttribute('aria-selected', 'false');

// const newPaperItem = document.createElement('tp-yt-paper-item');
// newPaperItem.classList.add('style-scope', 'yt-dropdown-menu');
// newPaperItem.setAttribute('style-target', 'host');
// newPaperItem.setAttribute('role', 'option');
// newPaperItem.setAttribute('tabindex', '0');
// newPaperItem.setAttribute('aria-disabled', 'false');

// const newPaperItemBody = document.createElement('tp-yt-paper-item-body');
// newPaperItemBody.classList.add('style-scope', 'yt-dropdown-menu');

// const newDiv1 = document.createElement('div');
// newDiv1.setAttribute('id', 'item-with-badge');
// newDiv1.classList.add('style-scope', 'yt-dropdown-menu');

// const newDiv2 = document.createElement('div');
// newDiv2.classList.add('item', 'style-scope', 'yt-dropdown-menu');
// newDiv2.innerText = 'Test comments';

// const newSpan = document.createElement('span');
// newSpan.classList.add('notification', 'style-scope', 'yt-dropdown-menu');
// newSpan.setAttribute('hidden', '');

// newDiv2.appendChild(newSpan);

// const newYtBadge = document.createElement('ytd-badge-supported-renderer');
// newYtBadge.classList.add('style-scope', 'yt-dropdown-menu');
// newYtBadge.setAttribute('disable-upgrade', '');
// newYtBadge.setAttribute('hidden', '');

// newDiv1.append(newDiv2, newYtBadge);

// const newDiv3 = document.createElement('div');
// newDiv3.setAttribute('secondary', '');
// newDiv3.setAttribute('id', 'subtitle');
// newDiv3.classList.add('style-scope', 'yt-dropdown-menu');
// newDiv3.setAttribute('hidden', '');

// newPaperItemBody.append(newDiv1, newDiv3);

// const newYtReload = document.createElement('yt-reload-continuation');
// newYtReload.classList.add('style-scope', 'yt-dropdown-menu');

// newPaperItem.append(newPaperItemBody, newYtReload);
// newOption.appendChild(newPaperItem);

// const secondChild = commentsSection.children[1];

// commentsSection.insertBefore(newOption, secondChild);
