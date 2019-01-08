'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TreeTableHeader = require('./TreeTableHeader');

var _TreeTableFooter = require('./TreeTableFooter');

var _UITreeRow = require('./UITreeRow');

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _Column = require('../column/Column');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTable = exports.TreeTable = function (_Component) {
    _inherits(TreeTable, _Component);

    function TreeTable(props) {
        _classCallCheck(this, TreeTable);

        var _this = _possibleConstructorReturn(this, (TreeTable.__proto__ || Object.getPrototypeOf(TreeTable)).call(this, props));

        _this.value = [].concat(_toConsumableArray(_this.props.value));

        _this.state = {
            sortField: props.sortField,
            sortOrder: props.sortOrder,
            multiSortMeta: props.multiSortMeta
        };

        _this.onSort = _this.onSort.bind(_this);
        return _this;
    }

    _createClass(TreeTable, [{
        key: 'onSort',
        value: function onSort(event) {
            var sortField = event.sortField;
            var sortOrder = this.state.sortField === event.sortField ? this.state.sortOrder * -1 : 1;
            var multiSortMeta = void 0;

            this.columnSortable = event.sortable;
            this.columnSortFunction = event.sortFunction;

            if (this.props.sortMode === 'multiple') {
                var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                multiSortMeta = this.state.multiSortMeta;
                if (!multiSortMeta || !metaKey) {
                    multiSortMeta = [];
                }

                this.addSortMeta({ field: sortField, order: sortOrder }, multiSortMeta);
            }

            this.setState({
                sortField: sortField,
                sortOrder: sortOrder,
                multiSortMeta: multiSortMeta
            });

            if (this.props.onSort) {
                this.props.onSort({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    multiSortMeta: multiSortMeta
                });
            }
        }
    }, {
        key: 'addSortMeta',
        value: function addSortMeta(meta, multiSortMeta) {
            var index = -1;
            for (var i = 0; i < multiSortMeta.length; i++) {
                if (multiSortMeta[i].field === meta.field) {
                    index = i;
                    break;
                }
            }

            if (index >= 0) multiSortMeta[index] = meta;else multiSortMeta.push(meta);
        }
    }, {
        key: 'sortSingle',
        value: function sortSingle(value) {
            var _this2 = this;

            if (this.columnSortable && this.columnSortable === 'custom' && this.columnSortFunction) {
                value = this.columnSortFunction({
                    field: this.state.sortField,
                    order: this.state.sortOrder
                });
            } else {
                value.sort(function (data1, data2) {
                    var value1 = _ObjectUtils2.default.resolveFieldData(data1.data, _this2.state.sortField);
                    var value2 = _ObjectUtils2.default.resolveFieldData(data2.data, _this2.state.sortField);
                    var result = null;

                    if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                    return _this2.state.sortOrder * result;
                });
            }

            for (var i = 0; i < value.length; i++) {
                var child = value[i].children;
                if (child) {
                    this.sortSingle(child);
                }
            }

            return value;
        }
    }, {
        key: 'sortMultiple',
        value: function sortMultiple(value) {
            var _this3 = this;

            value.sort(function (data1, data2) {
                return _this3.multisortField(data1, data2, _this3.state.multiSortMeta, 0);
            });

            for (var i = 0; i < value.length; i++) {
                var child = value[i].children;
                if (child) {
                    this.sortMultiple(child);
                }
            }

            return value;
        }
    }, {
        key: 'multisortField',
        value: function multisortField(data1, data2, multiSortMeta, index) {
            var value1 = _ObjectUtils2.default.resolveFieldData(data1.data, this.state.multiSortMeta[index].field);
            var value2 = _ObjectUtils2.default.resolveFieldData(data2.data, this.state.multiSortMeta[index].field);
            var result = null;

            if (typeof value1 === 'string' || value1 instanceof String) {
                if (value1.localeCompare && value1 !== value2) {
                    return this.state.multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true });
                }
            } else {
                result = value1 < value2 ? -1 : 1;
            }

            if (value1 === value2) {
                return this.state.multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, this.state.multiSortMeta, index + 1) : 0;
            }

            return this.state.multiSortMeta[index].order * result;
        }
    }, {
        key: 'onRowClick',
        value: function onRowClick(event, node) {
            var eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('ui-treetable-toggler') === 0) {
                return;
            } else if (this.props.selectionMode) {
                if (node.selectable === false) {
                    return;
                }

                var metaSelection = this.rowTouched ? false : this.props.metaKeySelection;
                var index = this.findIndexInSelection(node);
                var selected = index >= 0;

                if (this.isCheckboxSelectionMode()) {
                    if (selected) {
                        this.propagateSelectionDown(node, false);
                        if (node.parent) {
                            this.propagateSelectionUp(node.parent, false);
                        }

                        this.props.selectionChange({
                            originalEvent: event,
                            selection: this.selection
                        });

                        if (this.props.onNodeUnselect) {
                            this.props.onNodeUnselect({
                                originalEvent: event,
                                node: node
                            });
                        }
                    } else {
                        this.propagateSelectionDown(node, true);
                        if (node.parent) {
                            this.propagateSelectionUp(node.parent, true);
                        }

                        this.props.selectionChange({
                            originalEvent: event,
                            selection: this.selection
                        });

                        if (this.props.onNodeSelect) {
                            this.props.onNodeSelect({
                                originalEvent: event,
                                node: node
                            });
                        }
                    }
                } else {
                    if (metaSelection) {
                        var metaKey = event.metaKey || event.ctrlKey;

                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                this.selection = null;
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: null
                                });
                            } else {
                                this.selection = this.selection.filter(function (val, i) {
                                    return i !== index;
                                });
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: this.selection
                                });
                            }

                            if (this.props.onNodeUnselect) {
                                this.props.onNodeUnselect({
                                    originalEvent: event,
                                    node: node
                                });
                            }
                        } else {
                            if (this.isSingleSelectionMode()) {
                                this.selection = node;
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: node
                                });
                            } else if (this.isMultipleSelectionMode()) {
                                this.selection = !metaKey ? [] : this.selection || [];
                                this.selection = [].concat(_toConsumableArray(this.selection), [node]);
                                this.props.selectionChange({
                                    originalEvent: event,
                                    selection: this.selection
                                });
                            }

                            if (this.props.onNodeSelect) {
                                this.props.onNodeSelect({
                                    originalEvent: event,
                                    node: node
                                });
                            }
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            if (selected) {
                                this.selection = null;
                                if (this.props.onNodeUnselect) {
                                    this.props.onNodeUnselect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            } else {
                                this.selection = node;
                                if (this.props.onNodeSelect) {
                                    this.props.onNodeSelect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            }
                        } else {
                            if (selected) {
                                this.selection = this.selection.filter(function (val, i) {
                                    return i !== index;
                                });
                                if (this.props.onNodeUnselect) {
                                    this.props.onNodeUnselect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            } else {
                                this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
                                if (this.props.onNodeSelect) {
                                    this.props.onNodeSelect({
                                        originalEvent: event,
                                        node: node
                                    });
                                }
                            }
                        }

                        this.props.selectionChange({
                            originalEvent: event,
                            selection: this.selection
                        });
                    }
                }
            }

            this.rowTouched = false;
        }
    }, {
        key: 'onRowTouchEnd',
        value: function onRowTouchEnd() {
            this.rowTouched = true;
        }
    }, {
        key: 'findIndexInSelection',
        value: function findIndexInSelection(node) {
            var index = -1;

            if (this.props.selectionMode && this.selection) {
                if (this.isSingleSelectionMode()) {
                    index = _ObjectUtils2.default.equals(this.selection, node) ? 0 : -1;
                } else {
                    for (var i = 0; i < this.selection.length; i++) {
                        if (_ObjectUtils2.default.equals(this.selection[i], node)) {
                            index = i;
                            break;
                        }
                    }
                }
            }

            return index;
        }
    }, {
        key: 'propagateSelectionUp',
        value: function propagateSelectionUp(node, select) {
            if (node.children && node.children.length) {
                var selectedCount = 0;
                var childPartialSelected = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var child = _step.value;

                        if (this.isSelected(child)) {
                            selectedCount++;
                        } else if (child.partialSelected) {
                            childPartialSelected = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (select && selectedCount === node.children.length) {
                    this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
                    node.partialSelected = false;
                } else {
                    if (!select) {
                        var index = this.findIndexInSelection(node);
                        if (index >= 0) {
                            this.selection = this.selection.filter(function (val, i) {
                                return i !== index;
                            });
                        }
                    }

                    if ((childPartialSelected || selectedCount > 0) && selectedCount !== node.children.length) node.partialSelected = true;else node.partialSelected = false;
                }
            }

            var parent = node.parent;
            if (parent) {
                this.propagateSelectionUp(parent, select);
            }
        }
    }, {
        key: 'propagateSelectionDown',
        value: function propagateSelectionDown(node, select) {
            var index = this.findIndexInSelection(node);

            if (select && index === -1) {
                this.selection = [].concat(_toConsumableArray(this.selection || []), [node]);
            } else if (!select && index > -1) {
                this.selection = this.selection.filter(function (val, i) {
                    return i !== index;
                });
            }

            node.partialSelected = false;

            if (node.children && node.children.length) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var child = _step2.value;

                        this.propagateSelectionDown(child, select);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(node) {
            return this.findIndexInSelection(node) !== -1;
        }
    }, {
        key: 'isSingleSelectionMode',
        value: function isSingleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'single';
        }
    }, {
        key: 'isMultipleSelectionMode',
        value: function isMultipleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isCheckboxSelectionMode',
        value: function isCheckboxSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'checkbox';
        }
    }, {
        key: 'hasFooter',
        value: function hasFooter() {
            if (this.columns) {
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'processData',
        value: function processData() {
            var data = this.value;
            if (data && data.length) {
                if (this.state.sortField || this.state.multiSortMeta) {
                    if (this.props.sortMode === 'single') data = this.sortSingle(data);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data);
                }
            }

            return data;
        }
    }, {
        key: 'createTreeTableHeader',
        value: function createTreeTableHeader() {
            return _react2.default.createElement(_TreeTableHeader.TreeTableHeader, { columns: this.columns, onSort: this.onSort, sortField: this.state.sortField, sortOrder: this.state.sortOrder, multiSortMeta: this.state.multiSortMeta });
        }
    }, {
        key: 'createTreeTableFooter',
        value: function createTreeTableFooter() {
            if (this.hasFooter()) {
                return _react2.default.createElement(_TreeTableFooter.TreeTableFooter, { columns: this.columns });
            } else {
                return null;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            var state = {};

            if (this.props.sortOrder !== prevProps.sortOrder && this.props.sortOrder !== prevState.sortOrder) {
                state = { sortOrder: this.props.sortOrder };
            }
            if (this.props.sortField !== prevProps.sortField && this.props.sortField !== prevState.sortField) {
                state = _extends({}, state, { sortField: this.props.sortField });
            }
            if (this.props.multiSortMeta !== prevProps.multiSortMeta && this.props.multiSortMeta !== prevState.multiSortMeta) {
                state = _extends({}, state, { multiSortMeta: this.props.multiSortMeta });
            }

            if (Object.keys(state).length > 0) this.setState(state);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            if (this.props.value && !_ObjectUtils2.default.equalsByValue(this.props.value, this.value)) {
                this.value = [].concat(_toConsumableArray(this.props.value));
            }

            var value = this.processData();
            this.columns = _react2.default.Children.map(this.props.children, function (element, i) {
                if (element && element.type === _Column.Column) return element;
            });

            var treeTableClass = (0, _classnames2.default)('ui-treetable ui-widget', this.props.className);

            var headerFacet = this.props.header && _react2.default.createElement(
                'div',
                { className: 'ui-treetable-header ui-widget-header' },
                this.props.header
            ),
                footerFacet = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'ui-treetable-footer ui-widget-header' },
                this.props.footer
            );

            var thead = this.createTreeTableHeader(),
                tfoot = this.createTreeTableFooter(),
                tbody = value && value.map(function (node, index) {
                return _react2.default.createElement(_UITreeRow.UITreeRow, { key: 'row_' + index, node: node, index: index, level: 0, labelExpand: _this4.props.labelExpand, labelCollapse: _this4.props.labelCollapse, treeTable: _this4, parentNode: value });
            });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: treeTableClass, style: this.props.style },
                headerFacet,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-treetable-tablewrapper' },
                    _react2.default.createElement(
                        'table',
                        { className: 'ui-widget-content' },
                        thead,
                        tfoot,
                        tbody
                    )
                ),
                footerFacet
            );
        }
    }]);

    return TreeTable;
}(_react.Component);

TreeTable.defaultProps = {
    id: null,
    value: null,
    labelExpand: "Expand",
    labelCollapse: "Collapse",
    selectionMode: null,
    selection: null,
    selectionChange: null,
    style: null,
    className: null,
    metaKeySelection: true,
    header: '',
    footer: '',
    sortField: null,
    sortOrder: 1,
    multiSortMeta: null,
    sortMode: 'single',
    onSort: null,
    onNodeSelect: null,
    onNodeUnselect: null,
    onNodeExpand: null,
    onNodeCollapse: null
};
TreeTable.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    labelExpand: _propTypes2.default.string,
    labelCollapse: _propTypes2.default.string,
    selectionMode: _propTypes2.default.string,
    selection: _propTypes2.default.any,
    selectionChange: _propTypes2.default.func.isRequired,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    metaKeySelection: _propTypes2.default.bool,
    header: _propTypes2.default.string,
    footer: _propTypes2.default.string,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    multiSortMeta: _propTypes2.default.array,
    sortMode: _propTypes2.default.string,
    onSort: _propTypes2.default.func,
    onNodeSelect: _propTypes2.default.func,
    onNodeUnselect: _propTypes2.default.func,
    onNodeExpand: _propTypes2.default.func,
    onNodeCollapse: _propTypes2.default.func
};