'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PickListTransferControls = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../button/Button');

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickListTransferControls = exports.PickListTransferControls = function (_Component) {
    _inherits(PickListTransferControls, _Component);

    function PickListTransferControls() {
        _classCallCheck(this, PickListTransferControls);

        var _this = _possibleConstructorReturn(this, (PickListTransferControls.__proto__ || Object.getPrototypeOf(PickListTransferControls)).call(this));

        _this.moveRight = _this.moveRight.bind(_this);
        _this.moveAllRight = _this.moveAllRight.bind(_this);
        _this.moveLeft = _this.moveLeft.bind(_this);
        _this.moveAllLeft = _this.moveAllLeft.bind(_this);
        return _this;
    }

    _createClass(PickListTransferControls, [{
        key: 'moveRight',
        value: function moveRight(event) {
            var selection = this.props.sourceSelection;

            if (selection && selection.length) {
                var targetList = [].concat(_toConsumableArray(this.props.target));
                var sourceList = [].concat(_toConsumableArray(this.props.source));

                for (var i = 0; i < selection.length; i++) {
                    var selectedItem = selection[i];

                    if (_ObjectUtils2.default.findIndexInList(selectedItem, targetList) === -1) {
                        targetList.push(sourceList.splice(_ObjectUtils2.default.findIndexInList(selectedItem, sourceList), 1)[0]);
                    }
                }

                if (this.props.onTransfer) {
                    this.props.onTransfer({
                        originalEvent: event,
                        source: sourceList,
                        target: targetList,
                        direction: 'toTarget'
                    });
                }
            }
        }
    }, {
        key: 'moveAllRight',
        value: function moveAllRight(event) {
            if (this.props.source) {
                var targetList = [].concat(_toConsumableArray(this.props.target), _toConsumableArray(this.props.source));
                var sourceList = [];

                if (this.props.onTransfer) {
                    this.props.onTransfer({
                        originalEvent: event,
                        source: sourceList,
                        target: targetList,
                        direction: 'allToTarget'
                    });
                }
            }
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft(event) {
            var selection = this.props.targetSelection;

            if (selection && selection.length) {
                var targetList = [].concat(_toConsumableArray(this.props.target));
                var sourceList = [].concat(_toConsumableArray(this.props.source));

                for (var i = 0; i < selection.length; i++) {
                    var selectedItem = selection[i];

                    if (_ObjectUtils2.default.findIndexInList(selectedItem, sourceList) === -1) {
                        sourceList.push(targetList.splice(_ObjectUtils2.default.findIndexInList(selectedItem, targetList), 1)[0]);
                    }
                }

                if (this.props.onTransfer) {
                    this.props.onTransfer({
                        originalEvent: event,
                        source: sourceList,
                        target: targetList,
                        direction: 'toSource'
                    });
                }
            }
        }
    }, {
        key: 'moveAllLeft',
        value: function moveAllLeft(event) {
            if (this.props.source) {
                var sourceList = [].concat(_toConsumableArray(this.props.source), _toConsumableArray(this.props.target));
                var targetList = [];

                if (this.props.onTransfer) {
                    this.props.onTransfer({
                        originalEvent: event,
                        source: sourceList,
                        target: targetList,
                        direction: 'allToSource'
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
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-right', onClick: this.moveRight }),
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-double-right', onClick: this.moveAllRight }),
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-left', onClick: this.moveLeft }),
                    _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-angle-double-left', onClick: this.moveAllLeft })
                )
            );
        }
    }]);

    return PickListTransferControls;
}(_react.Component);

PickListTransferControls.defaultProps = {
    source: null,
    target: null,
    sourceSelection: null,
    targetSelection: null,
    onTransfer: null
};
PickListTransferControls.propsTypes = {
    source: _propTypes2.default.array,
    target: _propTypes2.default.array,
    sourceSelection: _propTypes2.default.array,
    targetSelection: _propTypes2.default.array,
    onTransfer: _propTypes2.default.array
};