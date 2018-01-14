/**
 * Created by amyqing719@gmail.com on 14/01/2018.
 */
define(function (require,exports,module) {
    require('jquery');
    require('template')
    var route = require('route');
    var TEMPLATES = {
        testing:require('../tpl/testing')
    };
    var Testing = function () {
        this._init();
    }
    $.extend(Testing.prototype,{
        _init: function () {
            var self = this;
            self._render();
            self._event();
        },
        _render: function () {
            var $dom = $("body");
            var testStr = template.compile(TEMPLATES.testing)();
            $dom.empty().append(testStr);
        },
        _event: function () {

        }
    })
    exports.init = function () {
        new Testing()
    }
})