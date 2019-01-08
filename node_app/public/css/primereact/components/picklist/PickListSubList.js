'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PickListSubList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _PickListItem = require('./PickListItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickListSubList = exports.PickListSubList = function (_Component) {
    _inherits(PickListSubList, _Component);

    function PickListSubList() {
        _classCallCheck(this, PickListSubList);

        var _this = _possibleConstructorReturn(this, (PickListSubList.__proto__ || Object.getPrototypeOf(PickListSubList)).call(this));

        _this.onItemClick = _this.onItemClick.bind(_this);
        return _this;
    }

    _createClass(PickListSubList, [{
        key: 'onItemClick',
        value: function onItemClick(event) {
            var originalEvent = event.originalEvent;
            var item = event.value;
            var selection = [].concat(_toConsumableArray(this.props.selection));
            var index = _ObjectUtils2.default.findIndexInList(item, selection);
            var selected = index !== -1;
            var metaSelection = this.props.metaKeySelection;

            if (metaSelection) {
                var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;

                if (selected && metaKey) {
                    selection.splice(index, 1);
                } else {
                    if (!metaKey) {
                        selection.length = 0;
                    }
                    selection.push(item);
                }
            } else {
                if (selected) selection.splice(index, 1);else selection.push(item);
            }

            if (this.props.onSelectionChange) {
                this.props.onSelectionChange({
                    event: originalEvent,
                    value: selection
                });
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(item) {
            return _ObjectUtils2.default.findIndexInList(item, this.props.selection) !== -1;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var header = null;
            var items = null;
            var wrapperClassName = (0, _classnames2.default)('ui-picklist-listwrapper', this.props.className, {
                'ui-picklist-listwrapper-nocontrols': !this.props.showControls
            });
            var listClassName = (0, _classnames2.default)('ui-widget-content ui-picklist-list ui-corner-bottom', this.props.listClassName);

            if (this.props.header) {
                header = _react2.default.createElement(
                    'div',
                    { className: 'ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr' },
                    this.props.header
                );
            }

            if (this.props.list) {
                items = this.props.list.map(function (item, i) {
                    return _react2.default.createElement(_PickListItem.PickListItem, { key: JSON.stringify(item), value: item, template: _this2.props.itemTemplate, selected: _this2.isSelected(item), onClick: _this2.onItemClick });
                });
            }

            return _react2.default.createElement(
                'div',
                { className: wrapperClassName },
                header,
                _react2.default.createElement(
                    'ul',
                    { className: listClassName, style: this.props.style },
                    items
                )
            );
        }
    }]);

    return PickListSubList;
}(_react.Component);

PickListSubList.defaultProps = {
    list: null,
    selection: null,
    header: null,
    className: null,
    listClassName: null,
    style: null,
    showControls: true,
    metaKeySelection: true,
    itemTemplate: null,
    onItemClick: null,
    onSelectionChange: null
};
PickListSubList.propsTypes = {
    list: _propTypes2.default.array,
    selection: _propTypes2.default.array,
    header: _propTypes2.default.string,
    className: _propTypes2.default.string,
    listClassName: _propTypes2.default.string,
    style: _propTypes2.default.object,
    showControls: _propTypes2.default.bool,
    metaKeySelection: _propTypes2.default.bool,
    itemTemplate: _propTypes2.default.func,
    onItemClick: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func
};