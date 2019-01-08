'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UITreeRow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UITreeRow = exports.UITreeRow = function (_Component) {
    _inherits(UITreeRow, _Component);

    function UITreeRow(props) {
        _classCallCheck(this, UITreeRow);

        var _this = _possibleConstructorReturn(this, (UITreeRow.__proto__ || Object.getPrototypeOf(UITreeRow)).call(this, props));

        _this.node = _this.props.node;
        _this.node.parent = _this.props.parentNode;
        _this.treeTable = _this.props.treeTable;
        _this.state = { expanded: _this.node.expanded };
        return _this;
    }

    _createClass(UITreeRow, [{
        key: 'toggle',
        value: function toggle(event) {
            if (this.state.expanded && this.treeTable.props.onNodeCollapse) this.treeTable.props.onNodeCollapse({ originalEvent: event, node: this.node });else if (this.treeTable.props.onNodeExpand) this.treeTable.props.onNodeExpand({ originalEvent: event, node: this.node });

            this.node.expanded = !this.state.expanded;
            this.setState({ expanded: !this.state.expanded });

            event.preventDefault();
        }
    }, {
        key: 'isLeaf',
        value: function isLeaf() {
            return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
        }
    }, {
        key: 'isSelected',
        value: function isSelected() {
            return this.treeTable.isSelected(this.node);
        }
    }, {
        key: 'onRowClick',
        value: function onRowClick(event) {
            this.treeTable.onRowClick(event, this.node);
        }
    }, {
        key: 'onRowTouchEnd',
        value: function onRowTouchEnd() {
            this.treeTable.onRowTouchEnd();
        }
    }, {
        key: 'resolveFieldData',
        value: function resolveFieldData(data, field) {
            if (data && field) {
                if (field.indexOf('.') === -1) {
                    return data[field];
                } else {
                    var fields = field.split('.');
                    var value = data;
                    for (var i = 0, len = fields.length; i < len; ++i) {
                        value = value[fields[i]];
                    }
                    return value;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.node !== this.props.node) {
                this.node = this.props.node;
                this.node.parent = this.props.node.parentNode;
            }

            var tableRowClass = (0, _classnames2.default)('ui-treetable-row', {
                'ui-state-highlight': this.isSelected(),
                'ui-treetable-row-selectable': this.treeTable.props.selectionMode && this.node.selectable !== false
            });

            var childTbody = this.node.children && this.node.children.map(function (childNode, index) {
                return _react2.default.createElement(UITreeRow, { key: index, node: childNode, index: index, level: _this2.props.level + 1, labelExpand: _this2.props.labelExpand, labelCollapse: _this2.props.labelCollapse, treeTable: _this2.treeTable, parentNode: _this2.node });
            });

            return _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                    'tr',
                    { className: tableRowClass },
                    this.treeTable.columns && this.treeTable.columns.map(function (col, i) {
                        var toggler = null,
                            checkbox = null;

                        if (i === 0) {
                            var togglerClass = (0, _classnames2.default)('ui-treetable-toggler pi pi-fw ui-c', {
                                'pi-caret-down': _this2.state.expanded,
                                'pi-caret-right': !_this2.state.expanded
                            }),
                                togglerStyle = { 'marginLeft': _this2.props.level * 16 + 'px', 'visibility': _this2.isLeaf() ? 'hidden' : 'visible' };

                            toggler = _react2.default.createElement(
                                'a',
                                { className: togglerClass, style: togglerStyle, onClick: _this2.toggle.bind(_this2), title: _this2.state.expanded ? _this2.props.labelCollapse : _this2.props.labelExpand },
                                _react2.default.createElement('span', null)
                            );

                            if (_this2.treeTable.props.selectionMode === 'checkbox') {
                                var checkboxIconClass = (0, _classnames2.default)('ui-chkbox-icon ui-c pi', {
                                    'pi-check': _this2.isSelected(),
                                    'pi-minus': _this2.node.partialSelected
                                });

                                checkbox = _react2.default.createElement(
                                    'div',
                                    { className: 'ui-chkbox ui-treetable-checkbox' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'ui-chkbox-box ui-widget ui-corner-all ui-state-default' },
                                        _react2.default.createElement('span', { className: checkboxIconClass })
                                    )
                                );
                            }
                        }

                        var rowData = _react2.default.createElement(
                            'span',
                            null,
                            _ObjectUtils2.default.resolveFieldData(_this2.node.data, col.props.field)
                        );

                        return _react2.default.createElement(
                            'td',
                            { key: 'col_' + i, style: col.props.style, className: col.props.className, onClick: _this2.onRowClick.bind(_this2), onTouchEnd: _this2.onRowTouchEnd.bind(_this2) },
                            toggler,
                            checkbox,
                            rowData
                        );
                    })
                ),
                this.node.children && this.state.expanded && _react2.default.createElement(
                    'tr',
                    { className: 'ui-treetable-row', style: { 'display': 'table-row' } },
                    _react2.default.createElement(
                        'td',
                        { colSpan: this.treeTable.columns.length, className: 'ui-treetable-child-table-container' },
                        _react2.default.createElement(
                            'table',
                            null,
                            childTbody
                        )
                    )
                )
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            var expanded = nextProps.node.expanded;
            if (prevState.expanded !== expanded) {
                return {
                    expanded: expanded
                };
            }
            return null;
        }
    }]);

    return UITreeRow;
}(_react.Component);

UITreeRow.defaultProps = {
    node: null,
    level: null,
    treeTable: null,
    parentNode: null,
    labelExpand: "Expand",
    labelCollapse: "Collapse"
};
UITreeRow.propsTypes = {
    node: _propTypes2.default.any,
    level: _propTypes2.default.any,
    treeTable: _propTypes2.default.any,
    parentNode: _propTypes2.default.any,
    labelExpand: _propTypes2.default.string,
    labelCollapse: _propTypes2.default.string
};