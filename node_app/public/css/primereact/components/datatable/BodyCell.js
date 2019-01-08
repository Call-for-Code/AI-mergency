'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BodyCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _RowRadioButton = require('./RowRadioButton');

var _RowCheckbox = require('./RowCheckbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyCell = exports.BodyCell = function (_Component) {
    _inherits(BodyCell, _Component);

    function BodyCell(props) {
        _classCallCheck(this, BodyCell);

        var _this = _possibleConstructorReturn(this, (BodyCell.__proto__ || Object.getPrototypeOf(BodyCell)).call(this, props));

        _this.state = {};
        _this.onExpanderClick = _this.onExpanderClick.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onEditorFocus = _this.onEditorFocus.bind(_this);
        return _this;
    }

    _createClass(BodyCell, [{
        key: 'onExpanderClick',
        value: function onExpanderClick(event) {
            if (this.props.onRowToggle) {
                this.props.onRowToggle({
                    originalEvent: event,
                    data: this.props.rowData
                });
            }

            event.preventDefault();
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            if (event.which === 13 || event.which === 9) {
                this.switchCellToViewMode();
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            if (this.props.editor) {
                this.setState({
                    editing: true
                });

                if (this.documentEditListener) this.cellClick = true;else this.bindDocumentEditListener();
            }
        }
    }, {
        key: 'onEditorFocus',
        value: function onEditorFocus(event) {
            this.onClick(event);
        }
    }, {
        key: 'bindDocumentEditListener',
        value: function bindDocumentEditListener() {
            var _this2 = this;

            if (!this.documentEditListener) {
                this.documentEditListener = function (event) {
                    if (!_this2.cellClick) {
                        _this2.switchCellToViewMode();
                    }

                    _this2.cellClick = false;
                };

                document.addEventListener('click', this.documentEditListener);
            }
        }
    }, {
        key: 'closeCell',
        value: function closeCell() {
            this.setState({
                editing: false
            });
            this.unbindDocumentEditListener();
        }
    }, {
        key: 'switchCellToViewMode',
        value: function switchCellToViewMode() {
            if (this.props.editorValidator) {
                var valid = this.props.editorValidator(this.props);
                if (valid) {
                    this.closeCell();
                }
            } else {
                this.closeCell();
            }
        }
    }, {
        key: 'unbindDocumentEditListener',
        value: function unbindDocumentEditListener() {
            if (this.documentEditListener) {
                document.removeEventListener('click', this.documentEditListener);
                this.documentEditListener = null;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this3 = this;

            if (this.container && this.props.editor) {
                if (this.state.editing) {
                    var focusable = _DomHandler2.default.findSingle(this.container, 'input');
                    if (focusable) {
                        focusable.setAttribute('data-isCellEditing', true);
                        focusable.focus();
                    }

                    this.keyHelper.tabIndex = -1;
                } else {
                    setTimeout(function () {
                        _this3.keyHelper.removeAttribute('tabindex');
                    }, 50);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var content = void 0,
                header = void 0;
            var cellClassName = (0, _classnames2.default)(this.props.bodyClassName || this.props.className, {
                'ui-selection-column': this.props.selectionMode,
                'ui-editable-column': this.props.editor,
                'ui-cell-editing': this.state.editing
            });

            if (this.props.expander) {
                var iconClassName = (0, _classnames2.default)('ui-row-toggler pi pi-fw ui-clickable', { 'pi-chevron-circle-down': this.props.expanded, 'pi-chevron-circle-right': !this.props.expanded });
                content = _react2.default.createElement(
                    'a',
                    { onClick: this.onExpanderClick },
                    _react2.default.createElement('span', { className: iconClassName })
                );
            } else if (this.props.selectionMode) {
                if (this.props.selectionMode === 'single') content = _react2.default.createElement(_RowRadioButton.RowRadioButton, { onClick: this.props.onRadioClick, rowData: this.props.rowData, selected: this.props.selected });else content = _react2.default.createElement(_RowCheckbox.RowCheckbox, { onClick: this.props.onCheckboxClick, rowData: this.props.rowData, selected: this.props.selected });
            } else if (this.props.rowReorder) {
                var reorderIcon = (0, _classnames2.default)('ui-table-reorderablerow-handle', this.props.rowReorderIcon);

                content = _react2.default.createElement('i', { className: reorderIcon });
            } else {
                if (this.state.editing) {
                    if (this.props.editor) content = this.props.editor(this.props);else throw new Error("Editor is not found on column.");
                } else {
                    if (this.props.body) content = this.props.body(this.props.rowData, this.props);else content = _ObjectUtils2.default.resolveFieldData(this.props.rowData, this.props.field);
                }
            }

            if (this.props.responsive) {
                header = _react2.default.createElement(
                    'span',
                    { className: 'ui-column-title' },
                    this.props.header
                );
            }

            /* eslint-disable */
            var editorKeyHelper = this.props.editor && _react2.default.createElement(
                'a',
                { href: '#', ref: function ref(el) {
                        _this4.keyHelper = el;
                    }, className: 'ui-cell-editor-key-helper ui-helper-hidden-accessible', onFocus: this.onEditorFocus },
                _react2.default.createElement('span', null)
            );
            /* eslint-enable */

            return _react2.default.createElement(
                'td',
                { ref: function ref(el) {
                        _this4.container = el;
                    }, className: cellClassName, style: this.props.bodyStyle || this.props.style, onClick: this.onClick, onKeyDown: this.onKeyDown,
                    rowSpan: this.props.rowSpan },
                header,
                editorKeyHelper,
                _react2.default.createElement(
                    'span',
                    { className: 'ui-cell-data' },
                    content
                )
            );
        }
    }]);

    return BodyCell;
}(_react.Component);