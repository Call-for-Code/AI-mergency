'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PickList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PickListSubList = require('./PickListSubList');

var _PickListControls = require('./PickListControls');

var _PickListTransferControls = require('./PickListTransferControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickList = exports.PickList = function (_Component) {
    _inherits(PickList, _Component);

    function PickList(props) {
        _classCallCheck(this, PickList);

        var _this = _possibleConstructorReturn(this, (PickList.__proto__ || Object.getPrototypeOf(PickList)).call(this, props));

        _this.state = {
            selectedItemsSource: [],
            selectedItemsTarget: []
        };

        _this.onSourceReorder = _this.onSourceReorder.bind(_this);
        _this.onTargetReorder = _this.onTargetReorder.bind(_this);
        _this.onTransfer = _this.onTransfer.bind(_this);
        return _this;
    }

    _createClass(PickList, [{
        key: 'onSourceReorder',
        value: function onSourceReorder(event) {
            this.handleChange(event, event.value, this.props.target);
            this.reorderedListElement = this.sourceListElement;
            this.reorderDirection = event.direction;
        }
    }, {
        key: 'onTargetReorder',
        value: function onTargetReorder(event) {
            this.handleChange(event, this.props.source, event.value);
            this.reorderedListElement = this.targetListElement;
            this.reorderDirection = event.direction;
        }
    }, {
        key: 'handleScrollPosition',
        value: function handleScrollPosition(listElement, direction) {
            switch (direction) {
                case 'up':
                    this.scrollInView(listElement, -1);
                    break;

                case 'top':
                    listElement.scrollTop = 0;
                    break;

                case 'down':
                    this.scrollInView(listElement, 1);
                    break;

                case 'bottom':
                    listElement.scrollTop = listElement.scrollHeight;
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event, source, target) {
            if (this.props.onChange) {
                this.props.onChange({
                    event: event.originalEvent,
                    source: source,
                    target: target
                });
            }
        }
    }, {
        key: 'onTransfer',
        value: function onTransfer(event) {
            switch (event.direction) {
                case 'toTarget':
                    if (this.props.onMoveToTarget) {
                        this.props.onMoveToTarget({
                            originalEvent: event.originalEvent,
                            value: this.props.selectedItemsSource
                        });
                    }
                    break;

                case 'allToTarget':
                    if (this.props.onMoveAllToTarget) {
                        this.props.onMoveAllToTarget({
                            originalEvent: event.originalEvent,
                            value: this.props.source
                        });
                    }
                    break;

                case 'toSource':
                    if (this.props.onMoveToSource) {
                        this.props.onMoveToSource({
                            originalEvent: event.originalEvent,
                            value: this.props.selectedItemsTarget
                        });
                    }
                    break;

                case 'allToSource':
                    if (this.props.onMoveAllToSource) {
                        this.props.onMoveAllToSource({
                            originalEvent: event.originalEvent,
                            value: this.props.target
                        });
                    }
                    break;

                default:
                    break;
            }

            this.setState({
                selectedItemsSource: [],
                selectedItemsTarget: []
            });
            this.handleChange(event, event.source, event.target);
        }
    }, {
        key: 'scrollInView',
        value: function scrollInView(listElement, direction) {
            var listContainer = _DomHandler2.default.findSingle(listElement, '.ui-picklist-list');
            var listItems = listContainer.getElementsByClassName('ui-state-highlight');
            var listItem = void 0;

            if (direction === -1) listItem = listItems[0];else if (direction === 1) listItem = listItems[listItems.length - 1];

            _DomHandler2.default.scrollInView(listContainer, listItem);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.reorderedListElement) {
                this.handleScrollPosition(this.reorderedListElement, this.reorderDirection);
                this.reorderedListElement = null;
                this.reorderDirection = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-picklist ui-widget ui-helper-clearfix', this.props.className, {
                'ui-picklist-responsive': this.props.responsive
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                this.props.showSourceControls && _react2.default.createElement(_PickListControls.PickListControls, { list: this.props.source, selection: this.state.selectedItemsSource,
                    onReorder: this.onSourceReorder, className: 'ui-picklist-source-controls' }),
                _react2.default.createElement(_PickListSubList.PickListSubList, { ref: function ref(el) {
                        return _this2.sourceListElement = _reactDom2.default.findDOMNode(el);
                    }, list: this.props.source, selection: this.state.selectedItemsSource, onSelectionChange: function onSelectionChange(e) {
                        return _this2.setState({ selectedItemsSource: e.value });
                    }, itemTemplate: this.props.itemTemplate,
                    header: this.props.sourceHeader, style: this.props.sourceStyle, className: 'ui-picklist-source-wrapper', listClassName: 'ui-picklist-source', metaKeySelection: this.props.metaKeySelection }),
                _react2.default.createElement(_PickListTransferControls.PickListTransferControls, { onTransfer: this.onTransfer, source: this.props.source, target: this.props.target,
                    sourceSelection: this.state.selectedItemsSource, targetSelection: this.state.selectedItemsTarget }),
                _react2.default.createElement(_PickListSubList.PickListSubList, { ref: function ref(el) {
                        return _this2.targetListElement = _reactDom2.default.findDOMNode(el);
                    }, list: this.props.target, selection: this.state.selectedItemsTarget, onSelectionChange: function onSelectionChange(e) {
                        return _this2.setState({ selectedItemsTarget: e.value });
                    }, itemTemplate: this.props.itemTemplate,
                    header: this.props.targetHeader, style: this.props.targetStyle, className: 'ui-picklist-target-wrapper', listClassName: 'ui-picklist-targe', metaKeySelection: this.props.metaKeySelection }),
                this.props.showTargetControls && _react2.default.createElement(_PickListControls.PickListControls, { list: this.props.target, selection: this.state.selectedItemsTarget,
                    onReorder: this.onTargetReorder, className: 'ui-picklist-target-controls' })
            );
        }
    }]);

    return PickList;
}(_react.Component);

PickList.defaultProps = {
    id: null,
    source: null,
    target: null,
    sourceHeader: null,
    targetHeader: null,
    style: null,
    className: null,
    sourceStyle: null,
    targetStyle: null,
    responsive: false,
    showSourceControls: true,
    showTargetControls: true,
    metaKeySelection: true,
    itemTemplate: null,
    onChange: null,
    onMoveToSource: null,
    onMoveAllToSource: null,
    onMoveToTarget: null,
    onMoveAllToTarget: null
};
PickList.propsTypes = {
    id: _propTypes2.default.string,
    source: _propTypes2.default.array,
    target: _propTypes2.default.array,
    sourceHeader: _propTypes2.default.string,
    targetHeader: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    sourcestyle: _propTypes2.default.object,
    targetstyle: _propTypes2.default.object,
    responsive: _propTypes2.default.bool,
    showSourceControls: _propTypes2.default.bool,
    showTargetControls: _propTypes2.default.bool,
    metaKeySelection: _propTypes2.default.bool,
    itemTemplate: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onMoveToSource: _propTypes2.default.func,
    onMoveAllToSource: _propTypes2.default.func,
    onMoveToTarget: _propTypes2.default.func,
    onMoveAllToTarget: _propTypes2.default.func
};