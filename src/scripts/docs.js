(function() {

  // Search
  const version = 'latest';

  let debounce = function (fn) {
    let timeout;
    return function () {
      let args  = Array.prototype.slice.call(arguments);
      let ctx   = this;

      clearTimeout(timeout)
      timeout = setTimeout(() => { fn.apply(ctx, args) }, 100)
    }
  }

  const searchInput = $('.docs-search__input');
  searchInput.setAttribute('disabled', 'disabled');

  fetch(`/docs/${version}/lunr.json`)
    .then(response => response.text())
    .then(body => {
      searchInput.removeAttribute('disabled');
      const idx = lunr.Index.load(JSON.parse(body));

      searchInput.addEventListener('keyup', debounce(function (event) {
        var query = searchInput.value;
        if (query < 2) return;

        let results = idx.search(query);
        console.log(results);

        // compare results with bootstrapped data
      }))
    })


  // Navigation
  Array.prototype.forEach.call($$('.docs-nav__item_folder a'), el => {
    el.addEventListener('click', function(e) {
      if(e.target.hasClassName('docs-nav__item__arrow')) e.preventDefault();
      e.target.parentNode.hasClassName('docs-nav__item--closed') ? e.target.parentNode.removeClassName('docs-nav__item--closed') : e.target.parentNode.addClassName('docs-nav__item--closed')
    });
  });


  Array.prototype.forEach.call($$('pre code'), el => {
    console.log(el)
    hljs.highlightBlock(el);
  });

})()
