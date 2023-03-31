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
