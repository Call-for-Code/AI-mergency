'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableHeaderCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableHeaderCell = exports.TreeTableHeaderCell = function (_Component) {
    _inherits(TreeTableHeaderCell, _Component);

    function TreeTableHeaderCell(props) {
        _classCallCheck(this, TreeTableHeaderCell);

        var _this = _possibleConstructorReturn(this, (TreeTableHeaderCell.__proto__ || Object.getPrototypeOf(TreeTableHeaderCell)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(TreeTableHeaderCell, [{
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.sortable) {
                var targetNode = e.target;
                if (_DomHandler2.default.hasClass(targetNode, 'ui-sortable-column') || _DomHandler2.default.hasClass(targetNode, 'ui-column-title') || _DomHandler2.default.hasClass(targetNode, 'ui-sortable-column-icon')) {
                    this.props.onSort({
                        originalEvent: e,
                        sortField: this.props.field,
                        sortFunction: this.props.sortFunction,
                        sortable: this.props.sortable
                    });
                }
            }
        }
    }, {
        key: 'getMultiSortMetaData',
        value: function getMultiSortMetaData() {
            if (this.props.multiSortMeta) {
                for (var i = 0; i < this.props.multiSortMeta.length; i++) {
                    if (this.props.multiSortMeta[i].field === this.props.field) {
                        return this.props.multiSortMeta[i];
                    }
                }
            }

            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var multiSortMetaData = this.getMultiSortMetaData();
            var singleSorted = this.props.field === this.props.sortField;
            var multipleSorted = multiSortMetaData !== null;
            var sortOrder = 0;
            var sortIconElement = void 0;

            if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;

            var sorted = this.props.sortable && (singleSorted || multipleSorted);
            var className = (0, _classnames2.default)('ui-state-default ui-unselectable-text', { 'ui-sortable-column': this.props.sortable, 'ui-state-active': sorted }, this.props.className);

            if (this.props.sortable) {
                var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up' : 'pi-sort';
                sortIconElement = _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-sortable-column-icon pi pi-fw', sortIcon) });
            }

            return _react2.default.createElement(
                'th',
                { className: className, style: this.props.style, onClick: this.onClick },
                _react2.default.createElement(
                    'span',
                    { className: 'ui-column-title' },
                    this.props.header
                ),
                sortIconElement
            );
        }
    }]);

    return TreeTableHeaderCell;
}(_react.Component);