'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OrderListControls = require('./OrderListControls');

var _OrderListSubList = require('./OrderListSubList');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderList = exports.OrderList = function (_Component) {
    _inherits(OrderList, _Component);

    function OrderList(props) {
        _classCallCheck(this, OrderList);

        var _this = _possibleConstructorReturn(this, (OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call(this, props));

        _this.state = {
            selection: []
        };

        _this.onItemClick = _this.onItemClick.bind(_this);
        _this.onReorder = _this.onReorder.bind(_this);
        return _this;
    }

    _createClass(OrderList, [{
        key: 'onItemClick',
        value: function onItemClick(event) {
            var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
            var index = _ObjectUtils2.default.findIndexInList(event.value, this.state.selection);
            var selected = index !== -1;
            var selection = void 0;

            if (selected) {
                if (metaKey) selection = this.state.selection.filter(function (val, i) {
                    return i !== index;
                });else selection = [event.value];
            } else {
                if (metaKey) selection = [].concat(_toConsumableArray(this.state.selection), [event.value]);else selection = [event.value];
            }

            this.setState({ selection: selection });
        }
    }, {
        key: 'onReorder',
        value: function onReorder(event) {
            if (this.props.onChange) {
                this.props.onChange({
                    event: event.originalEvent,
                    value: event.value
                });
            }

            this.reorderDirection = event.direction;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.reorderDirection) {
                this.updateListScroll();
                this.reorderDirection = null;
            }
        }
    }, {
        key: 'updateListScroll',
        value: function updateListScroll() {
            var listItems = _DomHandler2.default.find(this.subList.listElement, '.ui-orderlist-item.ui-state-highlight');

            if (listItems && listItems.length) {
                switch (this.reorderDirection) {
                    case 'up':
                        _DomHandler2.default.scrollInView(this.subList.listElement, listItems[0]);
                        break;

                    case 'top':
                        this.subList.listElement.scrollTop = 0;
                        break;

                    case 'down':
                        _DomHandler2.default.scrollInView(this.subList.listElement, listItems[listItems.length - 1]);
                        break;

                    case 'bottom':
                        this.subList.listElement.scrollTop = this.subList.listElement.scrollHeight;
                        break;

                    default:
                        break;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-orderlist ui-widget', this.props.className, {
                'ui-orderlist-responsive': this.props.responsive
            });

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.element = el;
                    }, id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(_OrderListControls.OrderListControls, { value: this.props.value, selection: this.state.selection, onReorder: this.onReorder }),
                _react2.default.createElement(_OrderListSubList.OrderListSubList, { ref: function ref(el) {
                        return _this2.subList = el;
                    }, value: this.props.value, selection: this.state.selection, onItemClick: this.onItemClick,
                    itemTemplate: this.props.itemTemplate, header: this.props.header, listStyle: this.props.listStyle,
                    dragdrop: this.props.dragdrop, onDragStart: this.onDragStart, onDragEnter: this.onDragEnter, onDragEnd: this.onDragEnd, onDragLeave: this.onDragEnter, onDrop: this.onDrop,
                    onChange: this.props.onChange })
            );
        }
    }]);

    return OrderList;
}(_react.Component);

OrderList.defaultProps = {
    id: null,
    value: null,
    header: null,
    style: null,
    className: null,
    listStyle: null,
    responsive: false,
    dragdrop: false,
    onChange: null,
    itemTemplate: null
};
OrderList.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.array,
    header: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    listStyle: _propTypes2.default.object,
    responsive: _propTypes2.default.bool,
    dragdrop: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    itemTemplate: _propTypes2.default.func
};