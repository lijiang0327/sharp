/*
* @Author: lj
* @Date:   2016-03-10 08:28:51
* @Last Modified by:   lj
* @Last Modified time: 2016-03-11 10:29:52
*/

'use strict';

(function(w) {
  function sharp(selector,context) {
    return sharp.prototype.init(selector, context);
  }
  sharp.prototype = {
      // 选择器
      init: function(selector, context) {
        context = context || document;
        var doms = [] ;
        if($$.isString(selector)) {
            doms = context.querySelectorAll(selector);
        }
        else if ($$.isDom(selector)) {
            doms = [selector];
        }
        else if ($$.isLikeArray(selector)) {
            doms = selector;
        }
        this.length = doms.length;
        for(var i = 0, len = doms.length; i < len ; i ++) {
            this[i] = doms[i];
        }
        return this;
      }
  }

  var $$ = function(selector, context) {
      return new sharp(selector,context);
  }
  // 扩展方法
  $$.extend = function() {
      var   i = 1 ,
              len = arguments.length,
              args = arguments,
              target,
              key;
      if(len === 0 ) {
        return ;
      }
      else if (len === 1) {
        target = sharp.prototype;
        i --;
      }
      else {
        target = args[0];
      };
      for(; i < len ; i ++) {
        for( key in args[i]) {
          target[key] = args[i][key];
        }
      }
      return target;
  }

  w.$ = $$;
})(window);

// 判断数据类型
(function ($$) {
    $$.extend($$,{
       // 判断是否为数字
        isNumber: function(val) {
            return typeof(val) === "number"
        },
        // 判断是否为字符串
        isString: function(val) {
            return typeof(val) === "string" || val.constructor === String;
        },
        // 判断是否为boolean
        isBoolean: function(val) {
            return typeof(val) === "boolean";
        },
        // 判断是否为数组
        isArray: function(val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        },
        // 判断是否为空
        isNull: function(val) {
            return val === null;
        },
        // 判断是否为函数
        isFunction: function(val) {
            return typeof(val) === "function";
        },
        // 判断是否为undefined
        isUndefined: function(val) {
            return typeof(val) === "undefined";
        },
        // 判断是否为DOM元素
        isDom: function(val) {
            return val.nodeType === 1;
        },
        // 判断是否为对象
        isObject: function(val) {
            return typeof(val) === "object";
        }
    });
})($);
// 事件模块
(function ($$) {
  $$.extend({
    on: function(type,fn) {
      var that = this;
      for(var i = 0 , len = that.length; i < len ; i ++) {
        // 如果浏览器支持addEventListener, 就使用这个方法添加事件
        if(document.addEventListener) {
          that[i].addEventListener(type, fn);
        }
        // 如果是IE浏览器就使用attachEvent添加事件
        else {
          that[i].attachEvent("on"+type, fn);
        }
      }
    },
    // 单击事件
    click: function(fn) {
      this.on("click", fn);
    },
    // 鼠标进入
    mouseover: function(fn) {
      this.on("mouseover", fn);
    },
    // 鼠标离开
    mouseout: function(fn) {
      this.on("mouseout", fn);
    },
    // 双击事件
    dblclick: function(fn) {
      this.on("dblclick", fn);
    },
    hover: function(fn1,fn2) {
      this.on("mouseover", fn1);
      this.on("mouseout", fn2);
    }
  })
})($);
// CSS模块
(function($$) {
  $$.extend({
      //设置css样式 ，支持传入一个键值对，或一个对象进行设置，只传入键值为获取样式
      css: function(key,val) {
          var that = this;
          if(!$$.isUndefined(val)) {
              // 设置模式
              for(var i = 0 , len = that.length; i < len; i ++) {
                  setStyle(that[i],key,val);
              }
          }
          else {
              // 如果key是一个对象 设置多个属性
              if($.isObject(key)) {
                  for(var i = 0 , len = that.length; i < len ; i ++) {
                      for(var k in key) {
                          setStyle(that[i],k,key[k]);
                      }
                  }
              }
              // 否则为获取模式
              else {
                  return getStyle(that[0],key)
              }
          }
          // 设置属性方法
          function setStyle(dom,key,val) {
              dom.style[key] = val;
          }
          // 获取属性方法
          function getStyle(dom,key) {
              return window.getComputedStyle ?  window.getComputedStyle(dom,null)[key] : dom.currentStyle[key] ;
          }
      },
      // 隐藏
      hide: function() {
        this.css("display", "none");
      },
      //  显示
      show: function() {
        this.css("display", "");
      }
  });
})($);
// 选择器
(function ($$) {
  $$.extend({
    eq: function(val) {
      var arrElement = [];
      for(var i = 0 , len = this.length; i < len; i ++) {
        arrElement.push(this[i]);
      }
      if(arrElement[val]) {
        this[0] = arrElement[val];
        this.length = 1;
      }
      else {
        this.length = 0;
      }
      return this;
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(this.length - 1);
    }
  })
})($);
// 属性模块
(function($$) {
  $$.extend({
    attr: function(key, val) {
      // 如果key是一个字符串，val是undefined，获取值
      if(this.isString(key) && this.isUndefined(val)) {
        return this[0][key];
      }
    },
    addClass: function(className) {

    },
    removeClass: function(className) {

    },
    toggleClass: function(className) {

    }
  })
})($);