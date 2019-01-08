'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderListSubList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderListSubList = exports.OrderListSubList = function (_Component) {
    _inherits(OrderListSubList, _Component);

    function OrderListSubList(props) {
        _classCallCheck(this, OrderListSubList);

        var _this = _possibleConstructorReturn(this, (OrderListSubList.__proto__ || Object.getPrototypeOf(OrderListSubList)).call(this, props));

        _this.onDragEnd = _this.onDragEnd.bind(_this);
        _this.onDragLeave = _this.onDragLeave.bind(_this);
        _this.onDrop = _this.onDrop.bind(_this);
        _this.onListMouseMove = _this.onListMouseMove.bind(_this);
        return _this;
    }

    _createClass(OrderListSubList, [{
        key: 'isSelected',
        value: function isSelected(item) {
            return _ObjectUtils2.default.findIndexInList(item, this.props.selection) !== -1;
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event, index) {
            this.dragging = true;
            this.draggedItemIndex = index;
            if (this.props.dragdropScope) {
                event.dataTransfer.setData('text', 'orderlist');
            }
        }
    }, {
        key: 'onDragOver',
        value: function onDragOver(event, index) {
            if (this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
                this.dragOverItemIndex = index;
                _DomHandler2.default.addClass(event.target, 'ui-state-highlight');
                event.preventDefault();
            }
        }
    }, {
        key: 'onDragLeave',
        value: function onDragLeave(event) {
            this.dragOverItemIndex = null;
            _DomHandler2.default.removeClass(event.target, 'ui-state-highlight');
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            var dropIndex = this.draggedItemIndex > this.dragOverItemIndex ? this.dragOverItemIndex : this.dragOverItemIndex === 0 ? 0 : this.dragOverItemIndex - 1;
            var value = [].concat(_toConsumableArray(this.props.value));
            _ObjectUtils2.default.reorderArray(value, this.draggedItemIndex, dropIndex);
            this.dragOverItemIndex = null;
            _DomHandler2.default.removeClass(event.target, 'ui-state-highlight');

            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(event) {
            this.dragging = false;
        }
    }, {
        key: 'onListMouseMove',
        value: function onListMouseMove(event) {
            if (this.dragging) {
                var offsetY = this.listElement.getBoundingClientRect().top + _DomHandler2.default.getWindowScrollTop();
                var bottomDiff = offsetY + this.listElement.clientHeight - event.pageY;
                var topDiff = event.pageY - offsetY;

                if (bottomDiff < 25 && bottomDiff > 0) this.listElement.scrollTop += 15;else if (topDiff < 25 && topDiff > 0) this.listElement.scrollTop -= 15;
            }
        }
    }, {
        key: 'renderDropPoint',
        value: function renderDropPoint(item, index, key) {
            var _this2 = this;

            return _react2.default.createElement('li', { key: key, className: 'ui-orderlist-droppoint',
                onDragOver: function onDragOver(e) {
                    return _this2.onDragOver(e, index + 1);
                }, onDragLeave: this.onDragLeave, onDrop: this.onDrop });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var header = null;
            var items = null;
            var listClassName = (0, _classnames2.default)('ui-widget-content ui-orderlist-list', { 'ui-corner-bottom': this.props.header, 'ui-corner-all': !this.props.header });

            if (this.props.header) {
                header = _react2.default.createElement(
                    'div',
                    { className: 'ui-orderlist-caption ui-widget-header ui-corner-top' },
                    this.props.header
                );
            }

            if (this.props.value) {
                items = this.props.value.map(function (item, i) {
                    var content = _this3.props.itemTemplate ? _this3.props.itemTemplate(item) : item;
                    var itemClassName = (0, _classnames2.default)('ui-orderlist-item', _this3.props.className, { 'ui-state-highlight': _this3.isSelected(item) });
                    var key = JSON.stringify(item);

                    if (_this3.props.dragdrop) {
                        var _items = [_this3.renderDropPoint(item, i, key + '_droppoint'), _react2.default.createElement(
                            'li',
                            { key: key, className: itemClassName, onClick: function onClick(e) {
                                    return _this3.props.onItemClick({ originalEvent: e, value: item, index: i });
                                },
                                draggable: 'true', onDragStart: function onDragStart(e) {
                                    return _this3.onDragStart(e, i);
                                }, onDragEnd: _this3.onDragEnd },
                            content
                        )];

                        if (i === _this3.props.value.length - 1) {
                            _items.push(_this3.renderDropPoint(item, i, key + '_droppoint_end'));
                        }

                        return _items;
                    } else {
                        return _react2.default.createElement(
                            'li',
                            { key: JSON.stringify(item), className: itemClassName, onClick: function onClick(e) {
                                    return _this3.props.onItemClick({ originalEvent: e, value: item, index: i });
                                } },
                            content
                        );
                    }
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'ui-orderlist-list-container' },
                header,
                _react2.default.createElement(
                    'ul',
                    { ref: function ref(el) {
                            return _this3.listElement = el;
                        }, className: listClassName, style: this.props.listStyle, onDragOver: this.onListMouseMove },
                    items
                )
            );
        }
    }]);

    return OrderListSubList;
}(_react.Component);

OrderListSubList.defaultProps = {
    value: null,
    selection: null,
    header: null,
    listStyle: null,
    itemTemplate: null,
    dragdrop: false,
    onItemClick: null,
    onChange: null
};
OrderListSubList.propsTypes = {
    value: _propTypes2.default.array,
    selection: _propTypes2.default.array,
    header: _propTypes2.default.string,
    listStyle: _propTypes2.default.object,
    itemTemplate: _propTypes2.default.func,
    dragdrop: _propTypes2.default.func,
    onItemClick: _propTypes2.default.func,
    onChange: _propTypes2.default.func
};