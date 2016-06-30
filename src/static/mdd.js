(function() {
    'use strict';

    hljs.initHighlightingOnLoad();

    var search = document.getElementById('search');
    search.addEventListener('keyup', filterMenu);

    function filterMenu() {
        var menuItems = document.querySelectorAll('.menu__item');
        for (var i = 0; i < menuItems.length; i++) {
            var menuItem = menuItems[i];

            var links = menuItem.querySelectorAll('.menu__link');

            var menuItemVisible = false;
            for (var j = 0; j < links.length; j++) {
                if (links[j].innerHTML.indexOf(search.value) >= 0) {
                    menuItemVisible = true;
                    break;
                }
            }

            if (menuItemVisible) {
                menuItem.classList.remove('menu__item--hidden');
            } else {
                menuItem.classList.add('menu__item--hidden');
            }
        }
    }
}());
