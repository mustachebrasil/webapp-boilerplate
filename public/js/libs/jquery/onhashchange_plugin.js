(function() {
    if ('onhashchange' in window) {
        if (window.addEventListener) {
            window.addHashChange = function(func, before) {
                window.addEventListener('hashchange', func, before);
            };
            window.removeHashChange = function(func) {
                window.removeEventListener('hashchange', func);
            };
            return;
        } else if (window.attachEvent) {
            window.addHashChange = function(func) {
                window.attachEvent('onhashchange', func);
            };
            window.removeHashChange = function(func) {
                window.detachEvent('onhashchange', func);
            };
            return;
        }
    }
    var hashChangeFuncs = [];
    var oldHref = location.href;
    window.addHashChange = function(func, before) {
        if (typeof func === 'function')
            hashChangeFuncs[before?'unshift':'push'](func);
    };
    window.removeHashChange = function(func) {
        for (var i=hashChangeFuncs.length-1; i>=0; i--)
            if (hashChangeFuncs[i] === func)
                hashChangeFuncs.splice(i, 1);
    };
    setInterval(function() {
        var newHref = location.href;
        if (oldHref !== newHref) {
            oldHref = newHref;
            for (var i=0; i<hashChangeFuncs.length; i++) {
                hashChangeFuncs[i].call(window, {
                    'type': 'hashchange',
                    'newURL': newHref,
                    'oldURL': oldHref
                });
            }
        }
    }, 100);
})();