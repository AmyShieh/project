/**
 * Created by amyqing719@gmail.com on 14/01/2018.
 */
define('base',[],function (require,exports,module) {
    var curHead = window.document.location.origin;
    var pathName = window.document.location.pathname;
    window.DOMAIN = curHead+pathName;
    // var pos = curWwwPath.indexOf(pathName);
    // var staticSite = curWwwPath + 'src/js';
    // console.log(staticSite);
    var template = require('art-template');
    var basePath = DOMAIN + "/src/js/"
    seajs.config({
        base:basePath,
        chatset:"utf-8",
        alias:{
            "jquery":"https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
            "test":"./test.js",
            "template":'lib/template.js',
            "common":'common/common.js',
            "route": 'common/route.js'
        }
    })
})

seajs.use('base');