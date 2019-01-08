'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataView = exports.DataViewLayoutOptions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Paginator = require('../paginator/Paginator');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataViewLayoutOptions = exports.DataViewLayoutOptions = function (_Component) {
    _inherits(DataViewLayoutOptions, _Component);

    function DataViewLayoutOptions(props) {
        _classCallCheck(this, DataViewLayoutOptions);

        var _this = _possibleConstructorReturn(this, (DataViewLayoutOptions.__proto__ || Object.getPrototypeOf(DataViewLayoutOptions)).call(this, props));

        _this.changeLayout = _this.changeLayout.bind(_this);
        return _this;
    }

    _createClass(DataViewLayoutOptions, [{
        key: 'changeLayout',
        value: function changeLayout(event, layoutMode) {
            this.props.onChange({
                originalEvent: event,
                value: layoutMode
            });
            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-dataview-layout-options ui-selectbutton ui-buttonset', this.props.className);
            var buttonListClass = (0, _classnames2.default)("ui-button ui-button-icon-only ui-state-default", { 'ui-state-active': this.props.layout === 'list' });
            var buttonGridClass = (0, _classnames2.default)("ui-button ui-button-icon-only ui-state-default", { 'ui-state-active': this.props.layout === 'grid' });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, style: this.props.style, className: className },
                _react2.default.createElement(
                    'a',
                    { role: "button", className: buttonListClass, onClick: function onClick(event) {
                            return _this2.changeLayout(event, 'list');
                        } },
                    _react2.default.createElement('i', { className: 'pi pi-bars ui-button-icon-left' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-button-text ui-clickable' },
                        'ui-btn'
                    )
                ),
                _react2.default.createElement(
                    'a',
                    { role: "button", className: buttonGridClass, onClick: function onClick(event) {
                            return _this2.changeLayout(event, 'grid');
                        } },
                    _react2.default.createElement('i', { className: 'pi pi-th-large ui-button-icon-left' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'ui-button-text ui-clickable' },
                        'ui-btn'
                    )
                )
            );
        }
    }]);

    return DataViewLayoutOptions;
}(_react.Component);

DataViewLayoutOptions.defaultProps = {
    id: null,
    style: null,
    className: null,
    layout: null,
    onChange: null
};
DataViewLayoutOptions.propsTypes = {
    id: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    layout: null,
    onChange: _propTypes2.default.func.isRequired
};

var DataViewItem = function (_Component2) {
    _inherits(DataViewItem, _Component2);

    function DataViewItem() {
        _classCallCheck(this, DataViewItem);

        return _possibleConstructorReturn(this, (DataViewItem.__proto__ || Object.getPrototypeOf(DataViewItem)).apply(this, arguments));
    }

    _createClass(DataViewItem, [{
        key: 'render',
        value: function render() {
            return this.props.template(this.props.item, this.props.layout);
        }
    }]);

    return DataViewItem;
}(_react.Component);

DataViewItem.defaultProps = {
    template: null,
    item: null,
    layout: null
};
DataViewItem.propsTypes = {
    template: _propTypes2.default.func,
    item: _propTypes2.default.number,
    layout: _propTypes2.default.string
};

var DataView = exports.DataView = function (_Component3) {
    _inherits(DataView, _Component3);

    function DataView(props) {
        _classCallCheck(this, DataView);

        var _this4 = _possibleConstructorReturn(this, (DataView.__proto__ || Object.getPrototypeOf(DataView)).call(this, props));

        if (!_this4.props.onPage) {
            _this4.state = {
                first: _this4.props.first,
                rows: _this4.props.rows
            };
        }
        _this4.sortChange = false;
        _this4.onPageChange = _this4.onPageChange.bind(_this4);
        return _this4;
    }

    _createClass(DataView, [{
        key: 'getTotalRecords',
        value: function getTotalRecords() {
            if (this.props.totalRecords) return this.props.totalRecords;else return this.props.value ? this.props.value.length : 0;
        }
    }, {
        key: 'createPaginator',
        value: function createPaginator(position) {
            var className = 'ui-paginator-' + position;
            var first = this.props.onPage ? this.props.first : this.state.first;
            var rows = this.props.onPage ? this.props.rows : this.state.rows;
            var totalRecords = this.getTotalRecords();

            return _react2.default.createElement(_Paginator.Paginator, { first: first, rows: rows, className: className, onPageChange: this.onPageChange, totalRecords: totalRecords });
        }
    }, {
        key: 'onPageChange',
        value: function onPageChange(event) {
            if (this.props.onPage) {
                this.props.onPage({
                    originalEvent: event,
                    first: event.first,
                    rows: event.rows
                });
            } else {
                this.setState({
                    first: event.first,
                    rows: event.rows
                });
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return !this.props.value || this.props.value.length === 0;
        }
    }, {
        key: 'sort',
        value: function sort() {
            var _this5 = this;

            if (this.props.value) {
                var value = [].concat(_toConsumableArray(this.props.value));

                value.sort(function (data1, data2) {
                    var value1 = _ObjectUtils2.default.resolveFieldData(data1, _this5.props.sortField);
                    var value2 = _ObjectUtils2.default.resolveFieldData(data2, _this5.props.sortField);
                    var result = null;

                    if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                    return _this5.props.sortOrder * result;
                });

                return value;
            } else {
                return null;
            }
        }
    }, {
        key: 'renderTopPaginator',
        value: function renderTopPaginator() {
            if (this.props.paginator && (this.props.paginatorPosition !== 'bottom' || this.props.paginatorPosition === 'both')) {
                return this.createPaginator('top');
            } else {
                return null;
            }
        }
    }, {
        key: 'renderBottomPaginator',
        value: function renderBottomPaginator() {
            if (this.props.paginator && (this.props.paginatorPosition !== 'top' || this.props.paginatorPosition === 'both')) {
                return this.createPaginator('bottom');
            } else {
                return null;
            }
        }
    }, {
        key: 'renderEmptyMessage',
        value: function renderEmptyMessage() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-widget-content ui-g-12' },
                this.props.emptyMessage
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            if (this.props.header) {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-dataview-header ui-widget-header ui-corner-top' },
                    this.props.header
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            if (this.props.footer) return _react2.default.createElement(
                'div',
                { className: 'ui-dataview-footer ui-widget-header ui-corner-bottom' },
                ' ',
                this.props.footer
            );else return null;
        }
    }, {
        key: 'renderItems',
        value: function renderItems(value) {
            var _this6 = this;

            if (value && value.length) {
                if (this.props.paginator) {
                    var rows = this.props.onPage ? this.props.rows : this.state.rows;
                    var first = this.props.onPage ? this.props.first : this.state.first;
                    var last = rows + first;
                    var items = [];

                    for (var i = first; i < last; i++) {
                        items.push(_react2.default.createElement(DataViewItem, { key: i, template: this.props.itemTemplate, layout: this.props.layout, item: value[i] }));
                    }

                    return items;
                } else {
                    return value.map(function (item, index) {
                        return _react2.default.createElement(DataViewItem, { key: index, template: _this6.props.itemTemplate, layout: _this6.props.layout, item: item });
                    });
                }
            } else {
                return this.renderEmptyMessage();
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent(value) {
            var items = this.renderItems(value);

            return _react2.default.createElement(
                'div',
                { className: 'ui-dataview-content ui-widget-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-g' },
                    items
                )
            );
        }
    }, {
        key: 'processData',
        value: function processData() {
            var data = this.props.value;

            if (data && data.length) {
                if (this.props.sortField) {
                    data = this.sort();
                }
            }

            return data;
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.processData();
            var className = (0, _classnames2.default)('ui-dataview ui-widget', { 'ui-dataview-list': this.props.layout === 'list', 'ui-dataview-grid': this.props.layout === 'grid' }, this.props.className);
            var topPaginator = this.renderTopPaginator();
            var bottomPaginator = this.renderBottomPaginator();
            var header = this.renderHeader();
            var footer = this.renderFooter();
            var content = this.renderContent(value);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, style: this.props.style, className: className },
                header,
                topPaginator,
                content,
                bottomPaginator,
                footer
            );
        }
    }]);

    return DataView;
}(_react.Component);

DataView.defaultProps = {
    id: null,
    header: null,
    footer: null,
    value: null,
    layout: 'list',
    paginator: false,
    rows: null,
    first: 0,
    totalRecords: null,
    pageLinks: 5,
    rowsPerPageOptions: null,
    paginatorPosition: "bottom",
    emptyMessage: 'No records found',
    sortField: null,
    sortOrder: null,
    style: null,
    className: null,
    itemTemplate: null,
    onPage: null
};
DataView.propsTypes = {
    id: _propTypes2.default.string,
    header: _propTypes2.default.string,
    footer: _propTypes2.default.string,
    value: _propTypes2.default.array,
    layout: _propTypes2.default.string,
    paginator: _propTypes2.default.bool,
    rows: _propTypes2.default.number,
    first: _propTypes2.default.number,
    totalRecords: _propTypes2.default.number,
    pageLinks: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array,
    paginatorPosition: _propTypes2.default.string,
    emptyMessage: _propTypes2.default.string,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    itemTemplate: _propTypes2.default.func.isRequired,
    onPage: _propTypes2.default.func
};