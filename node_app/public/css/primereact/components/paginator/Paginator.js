'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Paginator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FirstPageLink = require('./FirstPageLink');

var _NextPageLink = require('./NextPageLink');

var _PrevPageLink = require('./PrevPageLink');

var _LastPageLink = require('./LastPageLink');

var _PageLinks = require('./PageLinks');

var _RowsPerPageDropdown = require('./RowsPerPageDropdown');

var _CurrentPageReport = require('./CurrentPageReport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paginator = exports.Paginator = function (_Component) {
    _inherits(Paginator, _Component);

    function Paginator(props) {
        _classCallCheck(this, Paginator);

        var _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this, props));

        _this.changePageToFirst = _this.changePageToFirst.bind(_this);
        _this.changePageToPrev = _this.changePageToPrev.bind(_this);
        _this.changePageToNext = _this.changePageToNext.bind(_this);
        _this.changePageToLast = _this.changePageToLast.bind(_this);
        _this.onRowsChange = _this.onRowsChange.bind(_this);
        _this.onPageLinkClick = _this.onPageLinkClick.bind(_this);
        return _this;
    }

    _createClass(Paginator, [{
        key: 'isFirstPage',
        value: function isFirstPage() {
            return this.getPage() === 0;
        }
    }, {
        key: 'isLastPage',
        value: function isLastPage() {
            return this.getPage() === this.getPageCount() - 1;
        }
    }, {
        key: 'getPageCount',
        value: function getPageCount() {
            return Math.ceil(this.props.totalRecords / this.props.rows) || 1;
        }
    }, {
        key: 'calculatePageLinkBoundaries',
        value: function calculatePageLinkBoundaries() {
            var numberOfPages = this.getPageCount();
            var visiblePages = Math.min(this.props.pageLinkSize, numberOfPages);

            //calculate range, keep current in middle if necessary
            var start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2));
            var end = Math.min(numberOfPages - 1, start + visiblePages - 1);

            //check when approaching to last page
            var delta = this.props.pageLinkSize - (end - start + 1);
            start = Math.max(0, start - delta);

            return [start, end];
        }
    }, {
        key: 'updatePageLinks',
        value: function updatePageLinks() {
            var pageLinks = [];
            var boundaries = this.calculatePageLinkBoundaries();
            var start = boundaries[0];
            var end = boundaries[1];

            for (var i = start; i <= end; i++) {
                pageLinks.push(i + 1);
            }

            return pageLinks;
        }
    }, {
        key: 'changePage',
        value: function changePage(first, rows) {
            var pc = this.getPageCount();
            var p = Math.floor(first / rows);

            if (p >= 0 && p < pc) {
                var newPageState = {
                    first: first,
                    rows: rows,
                    page: p,
                    pageCount: pc
                };

                if (this.props.onPageChange) {
                    this.props.onPageChange(newPageState);
                }
            }
        }
    }, {
        key: 'getPage',
        value: function getPage() {
            return Math.floor(this.props.first / this.props.rows);
        }
    }, {
        key: 'changePageToFirst',
        value: function changePageToFirst(event) {
            this.changePage(0, this.props.rows);
            event.preventDefault();
        }
    }, {
        key: 'changePageToPrev',
        value: function changePageToPrev(event) {
            this.changePage(this.props.first - this.props.rows, this.props.rows);
            event.preventDefault();
        }
    }, {
        key: 'onPageLinkClick',
        value: function onPageLinkClick(event) {
            this.changePage((event.value - 1) * this.props.rows, this.props.rows);
        }
    }, {
        key: 'changePageToNext',
        value: function changePageToNext(event) {
            this.changePage(this.props.first + this.props.rows, this.props.rows);
            event.preventDefault();
        }
    }, {
        key: 'changePageToLast',
        value: function changePageToLast(event) {
            this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
            event.preventDefault();
        }
    }, {
        key: 'onRowsChange',
        value: function onRowsChange(event) {
            this.changePage(0, event.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-paginator ui-widget ui-widget-header ui-unselectable-text', this.props.className);

            var paginatorElements = this.props.template.split(' ').map(function (value) {
                var key = value.trim();
                var element = void 0;

                switch (key) {
                    case 'FirstPageLink':
                        element = _react2.default.createElement(_FirstPageLink.FirstPageLink, { key: key, onClick: _this2.changePageToFirst, disabled: _this2.isFirstPage() });
                        break;

                    case 'PrevPageLink':
                        element = _react2.default.createElement(_PrevPageLink.PrevPageLink, { key: key, onClick: _this2.changePageToPrev, disabled: _this2.isFirstPage() });
                        break;

                    case 'NextPageLink':
                        element = _react2.default.createElement(_NextPageLink.NextPageLink, { key: key, onClick: _this2.changePageToNext, disabled: _this2.isLastPage() });
                        break;

                    case 'LastPageLink':
                        element = _react2.default.createElement(_LastPageLink.LastPageLink, { key: key, onClick: _this2.changePageToLast, disabled: _this2.isLastPage() });
                        break;

                    case 'PageLinks':
                        element = _react2.default.createElement(_PageLinks.PageLinks, { key: key, value: _this2.updatePageLinks(), page: _this2.getPage(), onClick: _this2.onPageLinkClick });
                        break;

                    case 'RowsPerPageDropdown':
                        element = _react2.default.createElement(_RowsPerPageDropdown.RowsPerPageDropdown, { key: key, value: _this2.props.rows, options: _this2.props.rowsPerPageOptions, onChange: _this2.onRowsChange });
                        break;

                    case 'CurrentPageReport':
                        element = _react2.default.createElement(_CurrentPageReport.CurrentPageReport, { key: key, page: _this2.getPage(), pageCount: _this2.getPageCount() });
                        break;

                    default:
                        element = null;
                        break;
                }

                return element;
            });

            var leftContent = this.props.leftContent && _react2.default.createElement(
                'div',
                { className: 'ui-paginator-left-content' },
                this.props.leftContent
            );
            var rightContent = this.props.rightContent && _react2.default.createElement(
                'div',
                { className: 'ui-paginator-right-content' },
                this.props.rightContent
            );

            return _react2.default.createElement(
                'div',
                { className: className, style: this.props.style },
                leftContent,
                paginatorElements,
                rightContent
            );
        }
    }]);

    return Paginator;
}(_react.Component);

Paginator.defaultProps = {
    totalRecords: 0,
    rows: 0,
    first: 0,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    style: null,
    className: null,
    template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    onPageChange: null,
    leftContent: null,
    rightContent: null
};
Paginator.propsTypes = {
    totalRecords: _propTypes2.default.number,
    rows: _propTypes2.default.number,
    first: _propTypes2.default.number,
    pageLinkSize: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    template: _propTypes2.default.string,
    onPageChange: _propTypes2.default.func,
    leftContent: _propTypes2.default.any,
    rightContent: _propTypes2.default.any
};