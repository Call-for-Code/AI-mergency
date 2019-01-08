'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PickListControls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../button/Button');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickListControls = exports.PickListControls = function (_Component) {
    _inherits(PickListControls, _Component);

    function PickListControls() {
        _classCallCheck(this, PickListControls);

        var _this = _possibleConstructorReturn(this, (PickListControls.__proto__ || Object.getPrototypeOf(PickListControls)).call(this));

        _this.moveUp = _this.moveUp.bind(_this);
        _this.moveTop = _this.moveTop.bind(_this);
        _this.moveDown = _this.moveDown.bind(_this);
        _this.moveBottom = _this.moveBottom.bind(_this);
        return _this;
    }

    _createClass(PickListControls, [{
        key: 'moveUp',
        value: function moveUp(event) {
            var selectedItems = this.props.selection;

            if (selectedItems && selectedItems.length) {
                var list = [].concat(_toConsumableArray(this.props.list));

                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, list);

                    if (selectedItemIndex !== 0) {
                        var movedItem = list[selectedItemIndex];
                        var temp = list[selectedItemIndex - 1];
                        list[selectedItemIndex - 1] = movedItem;
                        list[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: list,
                        direction: 'up'
                    });
                }
            }
        }
    }, {
        key: 'moveTop',
        value: function moveTop(event) {
            var selectedItems = this.props.selection;

            if (selectedItems && selectedItems.length) {
                var list = [].concat(_toConsumableArray(this.props.list));

                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, list);

                    if (selectedItemIndex !== 0) {
                        var movedItem = list.splice(selectedItemIndex, 1)[0];
                        list.unshift(movedItem);
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: list,
                        direction: 'top'
                    });
                }
            }
        }
    }, {
        key: 'moveDown',
        value: function moveDown(event) {
            var selectedItems = this.props.selection;

            if (selectedItems && selectedItems.length) {
                var list = [].concat(_toConsumableArray(this.props.list));

                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, list);

                    if (selectedItemIndex !== list.length - 1) {
                        var movedItem = list[selectedItemIndex];
                        var temp = list[selectedItemIndex + 1];
                        list[selectedItemIndex + 1] = movedItem;
                        list[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: list,
                        direction: 'down'
                    });
                }

                this.movedDown = true;
            }
        }
    }, {
        key: 'moveBottom',
        value: function moveBottom(event) {
            var selectedItems = this.props.selection;

            if (selectedItems && selectedItems.length) {
                var list = [].concat(_toConsumableArray(this.props.list));

                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = _ObjectUtils2.default.findIndexInList(selectedItem, list);

                    if (selectedItemIndex !== list.length - 1) {
                        var movedItem = list.splice(selectedItemIndex, 1)[0];
                        list.push(movedItem);
                    } else {
                        break;
                    }
                }

                if (this.props.onReorder) {
                    this.props.onReorder({
                        originalEvent: event,
                        value: list,
                        direction: 'bottom'
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-picklist-buttons', this.props.className);

            return _react2.default.createElement(
                'div',
                { className: className },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-picklist-buttons-cell' },
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-up', onClick: this.moveUp }),
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-double-up', onClick: this.moveTop }),
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-down', onClick: this.moveDown }),
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-double-down', onClick: this.moveBottom })
                )
            );
        }
    }]);

    return PickListControls;
}(_react.Component);

PickListControls.defaultProps = {
    className: null,
    list: null,
    selection: null,
    onReorder: null
};
PickListControls.propsTypes = {
    className: _propTypes2.default.string,
    list: _propTypes2.default.array,
    selection: _propTypes2.default.array,
    onReorder: _propTypes2.default.func
};