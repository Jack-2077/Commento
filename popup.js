function sortComments(criteria) {
  var comments = Array.from(
    document.querySelectorAll('#comments .comment')
  ).sort(function (a, b) {
    switch (criteria) {
      case 'newest':
        return b.getAttribute('data-time') - a.getAttribute('data-time');
      case 'oldest':
        return a.getAttribute('data-time') - b.getAttribute('data-time');
      default:
        var aLikes = parseInt(
          a
            .querySelector('.like-button-renderer-like-button-unclicked span')
            .innerText.replace(/[^0-9]/g, '')
        );
        var bLikes = parseInt(
          b
            .querySelector('.like-button-renderer-like-button-unclicked span')
            .innerText.replace(/[^0-9]/g, '')
        );
        return bLikes - aLikes;
    }
  });
  var parent = document.querySelector(
    '#contents #comment-section-renderer-items'
  );
  comments.forEach(function (comment) {
    parent.appendChild(comment);
  });

  // Add custom sort options to the "Sort by" menu
  var menu = document.querySelector('.comment-section-sort-menu');
  var customOptions = menu.querySelectorAll(
    '.yt-simple-endpoint:not(.custom-sort)'
  );
  customOptions.forEach(function (option) {
    option.remove();
  });
  var newestOption = document.createElement('a');
  newestOption.href = '#';
  newestOption.classList.add(
    'yt-simple-endpoint',
    'style-scope',
    'ytd-comment-section-renderer',
    'custom-sort'
  );
  newestOption.textContent = 'Newest';
  newestOption.addEventListener('click', function (event) {
    event.preventDefault();
    sortComments('newest');
  });
  var oldestOption = document.createElement('a');
  oldestOption.href = '#';
  oldestOption.classList.add(
    'yt-simple-endpoint',
    'style-scope',
    'ytd-comment-section-renderer',
    'custom-sort'
  );
  oldestOption.textContent = 'Oldest';
  oldestOption.addEventListener('click', function (event) {
    event.preventDefault();
    sortComments('oldest');
  });
  menu.appendChild(newestOption);
  menu.appendChild(oldestOption);
}

document.addEventListener('DOMContentLoaded', function () {
  var sortButton = document.getElementById('sort');
  sortButton.addEventListener('click', function () {
    var criteria = document.getElementById('criteria').value;
    sortComments(criteria);
  });
});
