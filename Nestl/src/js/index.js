/**
 * Created by amyqing719@gmail.com on 14/01/2018.
 */
define(function (require,exports,module) {
    require('jquery');
    require('template')
    var route = require('route');
    var TEMPLATES = {
        login:require('../js/tpl/login')
    };

    var Index = function () {
        this._init();
    }
    $.extend(Index.prototype,{
        _init: function () {
            route.init();
            var self = this;
            self._render();
            self._event();
        },
        _render: function () {
            var $dom = $("body");
            var loginStr = template.compile(TEMPLATES.login)();
            $dom.empty().append(loginStr);
        },
        _event: function () {
            
        }
    })
    exports.init = function () {
        new Index();
    }
})