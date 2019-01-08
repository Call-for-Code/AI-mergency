'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Editor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _quill = require('quill');

var _quill2 = _interopRequireDefault(_quill);

require('quill/dist/quill.snow.css');

require('quill/dist/quill.bubble.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = exports.Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor() {
        _classCallCheck(this, Editor);

        return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
    }

    _createClass(Editor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.quill = new _quill2.default(this.editorElement, {
                modules: {
                    toolbar: this.toolbarElement
                },
                placeholder: this.props.placeholder,
                readOnly: this.props.readOnly,
                theme: 'snow',
                formats: this.props.formats
            });

            if (this.props.value) {
                this.value = [].concat(_toConsumableArray(this.props.value));
                this.quill.pasteHTML(this.props.value);
            }

            this.handleTextChange = function (delta, source) {
                var html = _this2.editorElement.children[0].innerHTML;
                var text = _this2.quill.getText();
                if (html === '<p><br></p>') {
                    html = null;
                }
                if (_this2.props.onTextChange) {
                    _this2.props.onTextChange({
                        htmlValue: html,
                        textValue: text,
                        delta: delta,
                        source: source
                    });
                }
                _this2.value = html;
            };

            this.handleSelectionChange = function (range, oldRange, source) {
                if (_this2.props.onSelectionChange) {
                    _this2.props.onSelectionChange({
                        range: range,
                        oldRange: oldRange,
                        source: source
                    });
                }
            };

            this.quill.on('text-change', this.handleTextChange);
            this.quill.on('selection-change', this.handleSelectionChange);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.value !== this.value) {
                this.value = this.props.value;
                var sel = this.quill.getSelection();
                if (sel) {
                    var length = this.quill.getLength();
                    sel.index = Math.max(0, Math.min(sel.index, length - 1));
                    sel.length = Math.max(0, Math.min(sel.length, length - 1 - sel.index));
                }
                this.quill.setSelection(sel);

                if (this.value === '' || this.value === null) {
                    this.editorElement.children[0].innerHTML = '';
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var containerClass = (0, _classnames2.default)('ui-widget ui-editor-container ui-corner-all', this.props.className);

            var toolbarHeader = null;
            if (this.props.headerTemplate) {
                toolbarHeader = _react2.default.createElement(
                    'div',
                    { ref: function ref(el) {
                            return _this3.toolbarElement = el;
                        }, className: 'ui-editor-toolbar ui-widget-header ui-corner-top' },
                    this.props.headerTemplate
                );
            } else {
                toolbarHeader = _react2.default.createElement(
                    'div',
                    { ref: function ref(el) {
                            return _this3.toolbarElement = el;
                        }, className: 'ui-editor-toolbar ui-widget-header ui-corner-top' },
                    _react2.default.createElement(
                        'span',
                        { className: 'ql-formats' },
                        _react2.default.createElement(
                            'select',
                            { className: 'ql-header', defaultValue: '0' },
                            _react2.default.createElement(
                                'option',
                                { value: '1' },
                                'Heading'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '2' },
                                'Subheading'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '0' },
                                'Normal'
                            )
                        ),
                        _react2.default.createElement(
                            'select',
                            { className: 'ql-font' },
                            _react2.default.createElement('option', null),
                            _react2.default.createElement('option', { value: 'serif' }),
                            _react2.default.createElement('option', { value: 'monospace' })
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ql-formats' },
                        _react2.default.createElement('button', { className: 'ql-bold', 'aria-label': 'Bold' }),
                        _react2.default.createElement('button', { className: 'ql-italic', 'aria-label': 'Italic' }),
                        _react2.default.createElement('button', { className: 'ql-underline', 'aria-label': 'Underline' })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ql-formats' },
                        _react2.default.createElement('select', { className: 'ql-color' }),
                        _react2.default.createElement('select', { className: 'ql-background' })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ql-formats' },
                        _react2.default.createElement('button', { className: 'ql-list', value: 'ordered', 'aria-label': 'Ordered List' }),
                        _react2.default.createElement('button', { className: 'ql-list', value: 'bullet', 'aria-label': 'Unordered List' }),
                        _react2.default.createElement(
                            'select',
                            { className: 'ql-align' },
                            _react2.default.createElement('option', { defaultValue: true }),
                            _react2.default.createElement('option', { value: 'center' }),
                            _react2.default.createElement('option', { value: 'right' }),
                            _react2.default.createElement('option', { value: 'justify' })
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ql-formats' },
                        _react2.default.createElement('button', { className: 'ql-link', 'aria-label': 'Insert Link' }),
                        _react2.default.createElement('button', { className: 'ql-image', 'aria-label': 'Insert Image' }),
                        _react2.default.createElement('button', { className: 'ql-code-block', 'aria-label': 'Insert Code Block' })
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ql-formats' },
                        _react2.default.createElement('button', { className: 'ql-clean', 'aria-label': 'Remove Styles' })
                    )
                );
            }

            var content = _react2.default.createElement('div', { ref: function ref(el) {
                    return _this3.editorElement = el;
                }, className: 'ui-editor-content', style: this.props.style });

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: containerClass },
                toolbarHeader,
                content
            );
        }
    }]);

    return Editor;
}(_react.Component);

Editor.defaultProps = {
    id: null,
    value: null,
    style: null,
    className: null,
    placeholder: null,
    readonly: false,
    formats: null,
    headerTemplate: null,
    onTextChange: null,
    onSelectionChange: null
};
Editor.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    readonly: _propTypes2.default.bool,
    formats: _propTypes2.default.array,
    headerTemplate: _propTypes2.default.any,
    onTextChange: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func
};