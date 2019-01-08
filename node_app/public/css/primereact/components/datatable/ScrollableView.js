'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScrollableView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollableView = exports.ScrollableView = function (_Component) {
    _inherits(ScrollableView, _Component);

    function ScrollableView(props) {
        _classCallCheck(this, ScrollableView);

        var _this = _possibleConstructorReturn(this, (ScrollableView.__proto__ || Object.getPrototypeOf(ScrollableView)).call(this, props));

        _this.onHeaderScroll = _this.onHeaderScroll.bind(_this);
        _this.onBodyScroll = _this.onBodyScroll.bind(_this);
        return _this;
    }

    _createClass(ScrollableView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setScrollHeight();

            if (!this.props.frozen) {
                this.alignScrollBar();
            } else {
                this.scrollBody.style.paddingBottom = _DomHandler2.default.calculateScrollbarWidth() + 'px';
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this.props.frozen) {
                this.alignScrollBar();

                if (this.props.virtualScroll) {
                    this.calculateRowHeight();
                    this.scrollTableWrapper.style.height = this.props.totalRecords * this.rowHeight + 'px';
                }
            }

            if (this.virtualScrollCallback) {
                this.virtualScrollCallback();
                this.virtualScrollCallback = null;
            }
        }
    }, {
        key: 'setScrollHeight',
        value: function setScrollHeight() {
            if (this.props.scrollHeight) {
                if (this.props.scrollHeight.indexOf('%') !== -1) {
                    var datatableContainer = this.findDataTableContainer(this.container);
                    this.scrollBody.style.visibility = 'hidden';
                    this.scrollBody.style.height = '100px'; //temporary height to calculate static height
                    var containerHeight = _DomHandler2.default.getOuterHeight(datatableContainer);
                    var relativeHeight = _DomHandler2.default.getOuterHeight(datatableContainer.parentElement) * parseInt(this.props.scrollHeight, 10) / 100;
                    var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                    var scrollBodyHeight = relativeHeight - staticHeight;

                    this.scrollBody.style.height = 'auto';
                    this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
                    this.scrollBody.style.visibility = 'visible';
                } else {
                    this.scrollBody.style.maxHeight = this.props.scrollHeight;
                }
            }
        }
    }, {
        key: 'findDataTableContainer',
        value: function findDataTableContainer(element) {
            if (element) {
                var el = element;
                while (el && !_DomHandler2.default.hasClass(el, 'ui-datatable')) {
                    el = el.parentElement;
                }

                return el;
            } else {
                return null;
            }
        }
    }, {
        key: 'onHeaderScroll',
        value: function onHeaderScroll() {
            this.scrollHeader.scrollLeft = 0;
        }
    }, {
        key: 'onBodyScroll',
        value: function onBodyScroll() {
            var _this2 = this;

            var frozenView = this.container.previousElementSibling;
            var frozenScrollBody = void 0;
            if (frozenView) {
                frozenScrollBody = _DomHandler2.default.findSingle(frozenView, '.ui-datatable-scrollable-body');
            }

            this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
            if (this.scrollFooterBox) {
                this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
            }

            if (frozenScrollBody) {
                frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
            }

            if (this.props.virtualScroll) {
                var viewport = _DomHandler2.default.getOuterHeight(this.scrollBody);
                var tableHeight = _DomHandler2.default.getOuterHeight(this.scrollTable);
                var pageHeight = this.rowHeight * this.props.rows;
                var virtualTableHeight = _DomHandler2.default.getOuterHeight(this.scrollTableWrapper);
                var pageCount = virtualTableHeight / pageHeight || 1;

                if (this.scrollBody.scrollTop + viewport > parseFloat(this.scrollTable.style.top) + tableHeight || this.scrollBody.scrollTop < parseFloat(this.scrollTable.style.top)) {
                    var page = Math.floor(this.scrollBody.scrollTop * pageCount / this.scrollBody.scrollHeight) + 1;
                    if (this.props.onVirtualScroll) {
                        this.props.onVirtualScroll({
                            page: page
                        });

                        this.virtualScrollCallback = function () {
                            _this2.scrollTable.style.top = (page - 1) * pageHeight + 'px';
                        };
                    }
                }
            }
        }
    }, {
        key: 'hasVerticalOverflow',
        value: function hasVerticalOverflow() {
            return _DomHandler2.default.getOuterHeight(this.scrollTable) > _DomHandler2.default.getOuterHeight(this.scrollBody);
        }
    }, {
        key: 'alignScrollBar',
        value: function alignScrollBar() {
            var scrollBarWidth = this.hasVerticalOverflow() ? _DomHandler2.default.calculateScrollbarWidth() : 0;

            this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBox) {
                this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
            }
        }
    }, {
        key: 'calculateRowHeight',
        value: function calculateRowHeight() {
            var row = _DomHandler2.default.findSingle(this.scrollTable, 'tr.ui-widget-content:not(.ui-datatable-emptymessage-row)');
            if (row) {
                this.rowHeight = _DomHandler2.default.getOuterHeight(row);
            }
        }
    }, {
        key: 'renderColGroup',
        value: function renderColGroup() {
            if (this.props.columns && this.props.columns.length) {
                return _react2.default.createElement(
                    'colgroup',
                    { className: 'ui-datatable-scrollable-colgroup' },
                    this.props.columns.map(function (col, i) {
                        return _react2.default.createElement('col', { key: col.field + '_' + i });
                    })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-datatable-scrollable-view', { 'ui-datatable-frozen-view': this.props.frozen });
            var width = this.props.frozen ? this.props.frozenWidth : this.props.unfrozenWidth;
            var left = this.props.frozen ? null : this.props.frozenWidth;
            var colGroup = this.renderColGroup();

            return _react2.default.createElement(
                'div',
                { className: className, style: { width: width, left: left }, ref: function ref(el) {
                        _this3.container = el;
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-widget-header ui-datatable-scrollable-header', ref: function ref(el) {
                            _this3.scrollHeader = el;
                        }, onScroll: this.onHeaderScroll },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-datatable-scrollable-header-box', ref: function ref(el) {
                                _this3.scrollHeaderBox = el;
                            } },
                        _react2.default.createElement(
                            'table',
                            null,
                            this.props.header,
                            this.props.frozenBody
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-datatable-scrollable-body', ref: function ref(el) {
                            _this3.scrollBody = el;
                        }, onScroll: this.onBodyScroll },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-datatable-scrollable-table-wrapper', ref: function ref(el) {
                                _this3.scrollTableWrapper = el;
                            } },
                        _react2.default.createElement(
                            'table',
                            { ref: function ref(el) {
                                    _this3.scrollTable = el;
                                }, style: { top: '0' } },
                            colGroup,
                            this.props.body
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-widget-header ui-datatable-scrollable-footer', ref: function ref(el) {
                            _this3.scrollFooter = el;
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-datatable-scrollable-footer-box', ref: function ref(el) {
                                _this3.scrollFooterBox = el;
                            } },
                        _react2.default.createElement(
                            'table',
                            null,
                            this.props.footer
                        )
                    )
                )
            );
        }
    }]);

    return ScrollableView;
}(_react.Component);

ScrollableView.defaultProps = {
    header: null,
    body: null,
    footer: null,
    columns: null,
    frozen: null,
    frozenWidth: null,
    unfrozenWidth: null,
    frozenBody: null,
    virtualScroll: false,
    rows: null,
    totalRecords: null,
    onVirtualScroll: null
};
ScrollableView.propTypes = {
    header: _propTypes2.default.element,
    body: _propTypes2.default.element,
    footer: _propTypes2.default.element,
    columns: _propTypes2.default.array,
    frozen: _propTypes2.default.bool,
    frozenWidth: _propTypes2.default.string,
    unfrozenWidth: _propTypes2.default.string,
    frozenBody: _propTypes2.default.element,
    virtualScroll: _propTypes2.default.bool,
    rows: _propTypes2.default.number,
    totalRcords: _propTypes2.default.number,
    onVirtualScroll: _propTypes2.default.func
};