'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrganizationChart = exports.OrganizationChartNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrganizationChartNode = exports.OrganizationChartNode = function (_Component) {
    _inherits(OrganizationChartNode, _Component);

    function OrganizationChartNode(props) {
        _classCallCheck(this, OrganizationChartNode);

        var _this = _possibleConstructorReturn(this, (OrganizationChartNode.__proto__ || Object.getPrototypeOf(OrganizationChartNode)).call(this, props));

        _this.node = _this.props.node;
        _this.state = { expanded: _this.node.expanded };
        return _this;
    }

    _createClass(OrganizationChartNode, [{
        key: 'getLeaf',
        value: function getLeaf() {
            return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
        }
    }, {
        key: 'getColspan',
        value: function getColspan() {
            return this.node.children && this.node.children.length ? this.node.children.length * 2 : null;
        }
    }, {
        key: 'onNodeClick',
        value: function onNodeClick(event, node) {
            this.props.onNodeClick(event, node);
        }
    }, {
        key: 'toggleNode',
        value: function toggleNode(event, node) {
            var _expanded = !this.state.expanded;
            this.setState({ expanded: _expanded });
            event.preventDefault();
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            return this.props.isSelected(this.node);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.node = this.props.node;

            var colspan = this.getColspan();
            var nodeStyleClass = (0, _classnames2.default)('ui-organizationchart-node-content ui-widget-content ui-corner-all', this.node.className, {
                'ui-organizationchart-selectable-node': this.props.selectionMode && this.node.selectable !== false,
                'ui-state-highlight': this.isSelected()
            }),
                nodeLabel = this.props.nodeTemplate && this.props.nodeTemplate(this.node) ? _react2.default.createElement(
                'div',
                null,
                this.props.nodeTemplate(this.node)
            ) : _react2.default.createElement(
                'div',
                null,
                this.node.label
            ),
                toggleIcon = (0, _classnames2.default)('ui-node-toggler-icon', { 'pi pi-chevron-down': this.state.expanded, 'pi pi-chevron-up': !this.state.expanded }),
                nodeContent = _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    { colSpan: colspan },
                    _react2.default.createElement(
                        'div',
                        { className: nodeStyleClass, onClick: function onClick(e) {
                                return _this2.onNodeClick(e, _this2.node);
                            } },
                        nodeLabel,
                        !this.getLeaf() && _react2.default.createElement(
                            'a',
                            { className: 'ui-node-toggler', onClick: function onClick(e) {
                                    return _this2.toggleNode(e, _this2.node);
                                } },
                            _react2.default.createElement('i', { className: toggleIcon })
                        )
                    )
                )
            );

            var _visibility = !this.getLeaf() && this.state.expanded ? 'inherit' : 'hidden',
                linesDown = _react2.default.createElement(
                'tr',
                { style: { visibility: _visibility }, className: 'ui-organizationchart-lines' },
                _react2.default.createElement(
                    'td',
                    { colSpan: colspan },
                    _react2.default.createElement('div', { className: 'ui-organizationchart-line-down' })
                )
            ),
                nodeChildLength = this.node.children && this.node.children.length,
                linesMiddle = _react2.default.createElement(
                'tr',
                { style: { visibility: _visibility }, className: 'ui-organizationchart-lines' },
                this.node.children && this.node.children.map(function (item, index) {
                    var leftClass = (0, _classnames2.default)('ui-organizationchart-line-left', { 'ui-organizationchart-line-top': index !== 0 }),
                        rightClass = (0, _classnames2.default)('ui-organizationchart-line-right', { 'ui-organizationchart-line-top': index !== nodeChildLength - 1 });

                    return [_react2.default.createElement(
                        'td',
                        { key: index + '_lineleft', className: leftClass },
                        '\xA0'
                    ), _react2.default.createElement(
                        'td',
                        { key: index + '_lineright', className: rightClass },
                        '\xA0'
                    )];
                })
            ),
                childNodes = _react2.default.createElement(
                'tr',
                { style: { visibility: _visibility }, className: 'ui-organizationchart-nodes' },
                this.node.children && this.node.children.map(function (child, index) {
                    return _react2.default.createElement(
                        'td',
                        { key: index, colSpan: '2' },
                        _react2.default.createElement(OrganizationChartNode, { node: child, nodeTemplate: _this2.props.nodeTemplate, selectionMode: _this2.props.selectionMode,
                            onNodeClick: _this2.props.onNodeClick, isSelected: _this2.props.isSelected })
                    );
                })
            );

            return _react2.default.createElement(
                'table',
                { className: 'ui-organizationchart-table' },
                _react2.default.createElement(
                    'tbody',
                    null,
                    nodeContent,
                    linesDown,
                    linesMiddle,
                    childNodes
                )
            );
        }
    }]);

    return OrganizationChartNode;
}(_react.Component);

OrganizationChartNode.defaultProps = {
    node: null,
    nodeTemplate: null,
    root: false,
    first: false,
    last: false,
    selectionMode: null,
    onNodeClick: null,
    isSelected: null
};
OrganizationChartNode.propsTypes = {
    node: _propTypes2.default.any,
    nodeTemplate: _propTypes2.default.any,
    root: _propTypes2.default.bool,
    first: _propTypes2.default.bool,
    last: _propTypes2.default.bool,
    selectionMode: _propTypes2.default.string,
    onNodeClick: _propTypes2.default.func,
    isSelected: _propTypes2.default.func
};

var OrganizationChart = exports.OrganizationChart = function (_Component2) {
    _inherits(OrganizationChart, _Component2);

    function OrganizationChart(props) {
        _classCallCheck(this, OrganizationChart);

        var _this3 = _possibleConstructorReturn(this, (OrganizationChart.__proto__ || Object.getPrototypeOf(OrganizationChart)).call(this, props));

        _this3.root = _this3.props.value && _this3.props.value.length ? _this3.props.value[0] : null;
        _this3.onNodeClick = _this3.onNodeClick.bind(_this3);
        _this3.isSelected = _this3.isSelected.bind(_this3);
        return _this3;
    }

    _createClass(OrganizationChart, [{
        key: 'onNodeClick',
        value: function onNodeClick(event, node) {
            var eventTarget = event.target;

            if (eventTarget.className && (eventTarget.className.indexOf('ui-node-toggler') !== -1 || eventTarget.className.indexOf('ui-node-toggler-icon') !== -1)) {
                return;
            } else if (this.props.selectionMode) {
                if (node.selectable === false) {
                    return;
                }

                var index = this.findIndexInSelection(node);
                var selected = index >= 0;

                if (this.props.selectionMode === 'single') {
                    if (selected) {
                        this.selection = null;
                        if (this.props.onNodeUnselect) {
                            this.props.onNodeUnselect({ originalEvent: event, node: node });
                        }
                    } else {
                        this.selection = node;
                        if (this.props.onNodeSelect) {
                            this.props.onNodeSelect({ originalEvent: event, node: node });
                        }
                    }
                } else if (this.props.selectionMode === 'multiple') {
                    if (selected) {
                        this.selection = this.selection.filter(function (val, i) {
                            return i !== index;
                        });
                        if (this.props.onNodeUnselect) {
                            this.props.onNodeUnselect({ originalEvent: event, node: node });
                        }
                    } else {
                        this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
                        if (this.props.onNodeSelect) {
                            this.props.onNodeSelect({ originalEvent: event, node: node });
                        }
                    }
                }

                if (this.props.selectionChange) {
                    this.props.selectionChange(this.selection);
                }
            }
        }
    }, {
        key: 'findIndexInSelection',
        value: function findIndexInSelection(node) {
            var index = -1;

            if (this.props.selectionMode && this.selection) {
                if (this.props.selectionMode === 'single') {
                    index = this.selection === node ? 0 : -1;
                } else if (this.props.selectionMode === 'multiple') {
                    for (var i = 0; i < this.selection.length; i++) {
                        if (this.selection[i] === node) {
                            index = i;
                            break;
                        }
                    }
                }
            }

            return index;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(node) {
            return this.findIndexInSelection(node) !== -1;
        }
    }, {
        key: 'render',
        value: function render() {
            this.root = this.props.value && this.props.value.length ? this.props.value[0] : null;

            var className = (0, _classnames2.default)('ui-organizationchart ui-widget', this.props.className);
            return _react2.default.createElement(
                'div',
                { id: this.props.id, style: this.props.style, className: className },
                _react2.default.createElement(OrganizationChartNode, { node: this.root, nodeTemplate: this.props.nodeTemplate, selectionMode: this.props.selectionMode,
                    onNodeClick: this.onNodeClick, isSelected: this.isSelected })
            );
        }
    }]);

    return OrganizationChart;
}(_react.Component);

OrganizationChart.defaultProps = {
    id: null,
    value: null,
    style: null,
    className: null,
    selectionMode: null,
    selection: null,
    nodeTemplate: null,
    selectionChange: null,
    onNodeSelect: null,
    onNodeUnselect: null
};
OrganizationChart.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    selectionMode: _propTypes2.default.string,
    selection: _propTypes2.default.any,
    nodeTemplate: _propTypes2.default.any,
    selectionChange: _propTypes2.default.func,
    onNodeSelect: _propTypes2.default.func,
    onNodeUnselect: _propTypes2.default.func
};