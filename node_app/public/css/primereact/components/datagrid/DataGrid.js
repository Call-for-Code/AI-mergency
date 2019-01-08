'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Paginator = require('../paginator/Paginator');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataGrid = exports.DataGrid = function (_Component) {
    _inherits(DataGrid, _Component);

    function DataGrid(props) {
        _classCallCheck(this, DataGrid);

        var _this = _possibleConstructorReturn(this, (DataGrid.__proto__ || Object.getPrototypeOf(DataGrid)).call(this, props));

        _this.state = { first: props.first, rows: props.rows };
        _this.onPageChange = _this.onPageChange.bind(_this);
        return _this;
    }

    _createClass(DataGrid, [{
        key: 'getTotalRecords',
        value: function getTotalRecords() {

            return this.props.value ? this.props.lazy ? this.props.totalRecords : this.props.value.length : 0;
        }
    }, {
        key: 'createPaginator',
        value: function createPaginator(position) {
            var className = 'ui-paginator-' + position;

            return _react2.default.createElement(_Paginator.Paginator, { first: this.state.first, rows: this.state.rows, className: className,
                totalRecords: this.getTotalRecords(), onPageChange: this.onPageChange, template: this.props.paginatorTemplate });
        }
    }, {
        key: 'onPageChange',
        value: function onPageChange(event) {
            this.setState({ first: event.first, rows: event.rows });

            if (this.props.lazy) {
                if (this.props.onLazyLoad) {
                    this.props.onLazyLoad({
                        first: event.first,
                        rows: event.rows
                    });
                }
            }
        }
    }, {
        key: 'processData',
        value: function processData() {
            var dataToRender = [];
            if (this.props.paginator && this.props.value) {
                var startIndex = this.props.lazy ? 0 : this.state.first;
                for (var i = startIndex; i < startIndex + this.props.rows; i++) {
                    if (i >= this.props.value.length) {
                        break;
                    }
                    dataToRender.push(this.props.value[i]);
                }
            } else {
                dataToRender = this.props.value;
            }
            return dataToRender;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.props.lazy && nextProps.value === this.props.value) return false;else return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var value = this.processData();
            var className = (0, _classnames2.default)('ui-datagrid ui-widget', this.props.className);

            var topPaginator = this.props.paginator && (this.props.paginatorPosition !== 'bottom' || this.props.paginatorPosition === 'both') && this.createPaginator('top'),
                bottomPaginator = this.props.paginator && (this.props.paginatorPosition !== 'top' || this.props.paginatorPosition === 'both') && this.createPaginator('bottom');

            var header = this.props.header && _react2.default.createElement(
                'div',
                { className: 'ui-datagrid-header ui-widget-header ui-corner-top' },
                ' ',
                this.props.header
            ),
                footer = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'ui-datagrid-footer ui-widget-header ui-corner-top' },
                ' ',
                this.props.footer
            ),
                content = _react2.default.createElement(
                'div',
                { className: 'ui-datagrid-content ui-widget-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-g' },
                    value && value.map(function (val, i) {
                        return _this2.props.itemTemplate ? _react2.default.cloneElement(_this2.props.itemTemplate(val), { key: i + '_datagriditem' }) : _react2.default.createElement(
                            'div',
                            { className: 'ui-g-12', key: i + '_datagriditem' },
                            'val'
                        );
                    })
                )
            );

            return _react2.default.createElement(
                'div',
                { id: this.props.id, ref: function ref(el) {
                        return _this2.dataGridEl = _reactDom2.default.findDOMNode(el);
                    }, style: this.props.style, className: className },
                header,
                topPaginator,
                content,
                bottomPaginator,
                footer
            );
        }
    }]);

    return DataGrid;
}(_react.Component);

DataGrid.defaultProps = {
    id: null,
    value: null,
    rows: null,
    first: 0,
    paginator: false,
    totalRecords: null,
    pageLinks: 5,
    rowsPerPageOptions: null,
    lazy: false,
    style: null,
    className: null,
    paginatorPosition: "bottom",
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    onLazyLoad: null,
    itemTemplate: null,
    header: null,
    footer: null
};
DataGrid.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.array,
    rows: _propTypes2.default.number,
    first: _propTypes2.default.number,
    paginator: _propTypes2.default.bool,
    totalRecords: _propTypes2.default.number,
    pageLinks: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array,
    lazy: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    paginatorPosition: _propTypes2.default.string,
    paginatorTemplate: _propTypes2.default.string,
    onLazyLoad: _propTypes2.default.func,
    itemTemplate: _propTypes2.default.func,
    header: _propTypes2.default.string,
    footer: _propTypes2.default.string
};