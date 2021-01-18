import { View, createVNode, renderCustomSlot, Base } from '@hummer/tenon-vue';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var _GLOBAL__ = __GLOBAL__,
    List = _GLOBAL__.List;

var ExList = /*#__PURE__*/function (_Base) {
  _inherits(ExList, _Base);

  var _super = _createSuper(ExList);

  function ExList() {
    var _this;

    _classCallCheck(this, ExList);

    _this = _super.call(this);
    _this.list = null;
    _this.render = null;
    _this.data = [];

    _this.initElement();

    _this._cacheView = [];
    _this.id = 0;
    return _this;
  }

  _createClass(ExList, [{
    key: "initElement",
    value: function initElement() {
      this.list = this.element = new List(); // HACK: 设定样式时，才会真实创建List

      this.list.style = {
        width: "1px"
      };
    }
    /**
     * 结束下拉刷新
     */

  }, {
    key: "stopPullRefresh",
    value: function stopPullRefresh() {
      this.element.stopPullRefresh();
    }
    /**
     * 滚动到指定位置
     * @param {*} position 
     */

  }, {
    key: "scrollToPosition",
    value: function scrollToPosition(position) {
      this.element.scrollToPosition(position);
    }
    /**
     * 结束加载更多
     */

  }, {
    key: "stopLoadMore",
    value: function stopLoadMore(enable) {
      this.element.stopLoadMore(enable);
    }
    /**
     * 触发列表的刷新
     */

  }, {
    key: "refresh",
    value: function refresh() {
      this.list.refresh(this.data.length);
    } // 页面布局的变化，会导致重新绘制，重新设定属性

  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'render':
          if (!this.render) {
            this.render = value;
            this.renderElement();
            this.data && this.refresh();
          }

          break;

        case 'data':
          this.data = value;
          this.render && this.refresh();
          break;
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this$render = this.render,
          refresh = _this$render.refresh,
          loadmore = _this$render.loadmore,
          item = _this$render.item;
      refresh && this.renderRefreshView();
      loadmore && this.renderLoadMoreView();
      item && this.renderListView(item);
    }
  }, {
    key: "renderListView",
    value: function renderListView(render) {
      var _this2 = this;

      this.list.onCreate = function (type) {
        var itemView = new View();
        var component = createVNode({
          data: function data() {
            return {
              data: {},
              item: {},
              index: null
            };
          },
          render: render
        });
        renderCustomSlot(component, itemView);
        var cell = itemView.element;
        cell._id = _this2.id++;

        _this2._cacheView.push(component.component);

        return cell;
      };

      this.list.onUpdate = function (position, cell) {
        var data = _this2.data[position];
        var id = cell._id;
        var itemInstance = _this2._cacheView[id];
        itemInstance.data.data = data;
        itemInstance.data.item = data;
        itemInstance.data.index = position;
      };
    }
  }, {
    key: "renderRefreshView",
    value: function renderRefreshView() {
      var refresh = this.render.refresh;
      var refreshView = new View();
      renderCustomSlot({
        render: refresh
      }, refreshView);
      this.list.refreshView = refreshView.element;
    }
  }, {
    key: "renderLoadMoreView",
    value: function renderLoadMoreView() {
      var loadmore = this.render.loadmore;
      var loadMoreView = new View();
      renderCustomSlot({
        render: loadmore
      }, loadMoreView);
      this.list.loadMoreView = loadMoreView.element;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, func) {
      var _this3 = this;

      switch (event) {
        case 'refresh':
          this.element.onRefresh = function (state) {
            func.call(_this3, state, _this3);
          };

          break;

        case 'loadmore':
          this.element.onLoadMore = function (state) {
            func.call(_this3, state, _this3);
          };

          break;
      }
    }
  }]);

  return ExList;
}(Base);

var index = {
  name: 'list',
  factory: function factory() {
    var component = new ExList();
    return component;
  }
};

export default index;
