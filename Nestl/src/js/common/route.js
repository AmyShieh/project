/**
 * Created by Amy on 2017/8/7.
 */
define(function (require,exports,module) {
    var Route = function () {
        this._init();
    }
    $.extend(Route.prototype,{
        _init : function () {
            var self = this;
            self._render();
            self._event();
        },
        _render: function () {
            var self = this;
        },
        _event: function () {
            var self = this;
            console.log("in route");
            if(location.hash.slice(1)){
                self._handle();
            }

            window.onhashchange = self._handle.bind(self);
        },
        _handle: function () {
            var self = this;
            var hashStr = location.hash.slice(1);
            if(hashStr) {
                self._loadModule(hashStr);
            }
        },
        _loadModule: function (hashStr) {
            var self = this;
            var json = self._hashToJson(hashStr);
            var hashUrl = json.hash.replace('_','/');
            console.log(hashUrl,json);
            require.async('./../'+hashUrl,function (module) {
                module.init(json);
            });
        },
        _hashToJson:function(str){
            var self = this;
            var obj = {};
            if(str.indexOf('&') != -1){
                var arr = str.split('&');
                obj['para'] = {};
                arr.forEach(function (value,index,arr) {
                    if(value.indexOf('=') == -1){
                        if(!obj.hash){
                            obj.hash = value;
                        }else{
                            var _arr = value.split('=');
                            obj['para'][_arr[0]] = _arr[1]
                        }
                    }
                })
            }else{
                // console.log("这个是不带参数的请求js");
                obj.hash = str;
            }

            return obj;
        }

    });
    exports.init = function (opt) {
        new Route(opt);
    }
})