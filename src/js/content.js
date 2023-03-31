// Get the comments section element
const commentsSection = document.querySelector('#comments');

// Get the comment list element
const commentList = commentsSection.querySelector('#contents');

// Get the sort menu element
const sortMenu = commentsSection.querySelector('#sort-menu');

// Create the sort options
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

// Create the sort menu options
const sortMenuOptions = document.createElement('div');
sortMenuOptions.className = 'ytd-menu-popup-renderer';

sortOptions.forEach((option, index) => {
  const menuItem = document.createElement('paper-item');
  menuItem.className = 'style-scope ytd-menu-popup-renderer';

  menuItem.innerText = option.name;
  menuItem.setAttribute('role', 'menuitem');
  menuItem.setAttribute('tabindex', '0');
  menuItem.setAttribute('aria-disabled', 'false');

  menuItem.addEventListener('click', () => {
    const sortedComments = Array.from(commentList.children).sort(option.fn);
    commentList.append(...sortedComments);
  });
  sortMenuOptions.appendChild(menuItem);
});

// Add the sort menu options to the sort menu
sortMenu.appendChild(sortMenuOptions);
