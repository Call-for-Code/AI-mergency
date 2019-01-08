'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderListControls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../button/Button');

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderListControls = exports.OrderListControls = function (_Component) {
    _inherits(OrderListControls, _Component);

    function OrderListControls() {
        _classCallCheck(this, OrderListControls);

        var _this = _possibleConstructorReturn(this, (OrderListControls.__proto__ || Object.getPrototypeOf(OrderListControls)).call(this));

        _this.moveUp = _this.moveUp.bind(_this);
        _this.moveTop = _this.moveTop.bind(_this);
        _this.moveDown = _this.moveDown.bind(_this);
        _this.moveBottom = _this.moveBottom.bind(_this);
        return _this;
    }

    _createClass(OrderListControls, [{
        key: 'moveUp',
        value: function moveUp(event) {
            if (this.props.selection) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = 0; i < this.props.selection.length; i++) {
                    var selectedItem = this.props.selection[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== 0) {
                        var movedItem = value[selectedItemIndex];
                        var temp = value[selectedItemIndex - 1];
                        value[selectedItemIndex - 1] = movedItem;
                        value[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: value,
                        direction: 'up'
                    });
                }
            }
        }
    }, {
        key: 'moveTop',
        value: function moveTop(event) {
            if (this.props.selection) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = 0; i < this.props.selection.length; i++) {
                    var selectedItem = this.props.selection[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== 0) {
                        var movedItem = value.splice(selectedItemIndex, 1)[0];
                        value.unshift(movedItem);
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: value,
                        direction: 'top'
                    });
                }
            }
        }
    }, {
        key: 'moveDown',
        value: function moveDown(event) {
            if (this.props.selection) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = this.props.selection.length - 1; i >= 0; i--) {
                    var selectedItem = this.props.selection[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== value.length - 1) {
                        var movedItem = value[selectedItemIndex];
                        var temp = value[selectedItemIndex + 1];
                        value[selectedItemIndex + 1] = movedItem;
                        value[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: value,
                        direction: 'down'
                    });
                }
            }
        }
    }, {
        key: 'moveBottom',
        value: function moveBottom(event) {
            if (this.props.selection) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = this.props.selection.length - 1; i >= 0; i--) {
                    var selectedItem = this.props.selection[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== value.length - 1) {
                        var movedItem = value.splice(selectedItemIndex, 1)[0];
                        value.push(movedItem);
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: value,
                        direction: 'bottom'
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-orderlist-controls' },
                _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-up', onClick: this.moveUp }),
                _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-double-up', onClick: this.moveTop }),
                _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-down', onClick: this.moveDown }),
                _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-double-down', onClick: this.moveBottom })
            );
        }
    }]);

    return OrderListControls;
}(_react.Component);

OrderListControls.defaultProps = {
    value: null,
    selection: null,
    onReorder: null
};
OrderListControls.propsTypes = {
    value: _propTypes2.default.array,
    selection: _propTypes2.default.array,
    onReorder: _propTypes2.default.func
};