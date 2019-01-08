'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUpload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../button/Button');

var _Messages = require('../messages/Messages');

var _ProgressBar = require('../progressbar/ProgressBar');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUpload = exports.FileUpload = function (_Component) {
    _inherits(FileUpload, _Component);

    function FileUpload(props) {
        _classCallCheck(this, FileUpload);

        var _this = _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call(this, props));

        _this.state = {
            files: [],
            msgs: []
        };

        _this.upload = _this.upload.bind(_this);
        _this.clear = _this.clear.bind(_this);
        _this.onFileSelect = _this.onFileSelect.bind(_this);
        _this.onDragEnter = _this.onDragEnter.bind(_this);
        _this.onDragOver = _this.onDragOver.bind(_this);
        _this.onDragLeave = _this.onDragLeave.bind(_this);
        _this.onDrop = _this.onDrop.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onSimpleUploaderClick = _this.onSimpleUploaderClick.bind(_this);
        return _this;
    }

    _createClass(FileUpload, [{
        key: 'hasFiles',
        value: function hasFiles() {
            return this.state.files && this.state.files.length > 0;
        }
    }, {
        key: 'isImage',
        value: function isImage(file) {
            return (/^image\//.test(file.type)
            );
        }
    }, {
        key: 'remove',
        value: function remove(index) {
            this.clearInputElement();
            var currentFiles = [].concat(_toConsumableArray(this.state.files));
            currentFiles.splice(index, 1);
            this.setState({ files: currentFiles });
        }
    }, {
        key: 'clearInputElement',
        value: function clearInputElement() {
            this.fileInput.value = '';
            if (this.props.mode === 'basic') {
                this.fileInput.style.display = 'inline';
            }
        }
    }, {
        key: 'formatSize',
        value: function formatSize(bytes) {
            if (bytes === 0) {
                return '0 B';
            }
            var k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
    }, {
        key: 'onFileSelect',
        value: function onFileSelect(event) {
            var _this2 = this;

            this.setState({ msgs: [] });
            this.files = this.state.files || [];
            var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var file = _step.value;

                    if (!this.isFileSelected(file)) {
                        if (this.validate(file)) {
                            if (this.isImage(file)) {
                                file.objectURL = window.URL.createObjectURL(file);
                            }
                            this.files.push(file);
                        }
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

            this.setState({ files: this.files }, function () {
                if (_this2.hasFiles() && _this2.props.auto) {
                    _this2.upload();
                }
            });

            if (this.props.onSelect) {
                this.props.onSelect({ originalEvent: event, files: files });
            }

            this.clearInputElement();

            if (this.props.mode === 'basic') {
                this.fileInput.style.display = 'none';
            }
        }
    }, {
        key: 'isFileSelected',
        value: function isFileSelected(file) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.state.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var sFile = _step2.value;

                    if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) return true;
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

            return false;
        }
    }, {
        key: 'validate',
        value: function validate(file) {
            if (this.props.maxFileSize && file.size > this.props.maxFileSize) {
                this.messagesUI.show({
                    severity: 'error',
                    summary: this.props.invalidFileSizeMessageSummary.replace('{0}', file.name),
                    detail: this.props.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.props.maxFileSize))
                });

                return false;
            }

            return true;
        }
    }, {
        key: 'upload',
        value: function upload() {
            var _this3 = this;

            this.setState({ msgs: [] });
            var xhr = new XMLHttpRequest();
            var formData = new FormData();

            if (this.props.onBeforeUpload) {
                this.props.onBeforeUpload({
                    'xhr': xhr,
                    'formData': formData
                });
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.state.files[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var file = _step3.value;

                    formData.append(this.props.name, file, file.name);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            xhr.upload.addEventListener('progress', function (event) {
                if (event.lengthComputable) {
                    _this3.setState({ progress: Math.round(event.loaded * 100 / event.total) });
                }

                if (_this3.props.onProgress) {
                    _this3.props.onProgress({
                        originalEvent: event,
                        progress: _this3.progress
                    });
                };
            });

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    _this3.setState({ progress: 0 });

                    if (xhr.status >= 200 && xhr.status < 300) {
                        if (_this3.props.onUpload) {
                            _this3.props.onUpload({ xhr: xhr, files: _this3.files });
                        }
                    } else {
                        if (_this3.props.onError) {
                            _this3.props.onError({ xhr: xhr, files: _this3.files });
                        }
                    }

                    _this3.clear();
                }
            };

            xhr.open('POST', this.props.url, true);

            if (this.props.onBeforeSend) {
                this.props.onBeforeSend({
                    'xhr': xhr,
                    'formData': formData
                });
            }

            xhr.withCredentials = this.props.withCredentials;

            xhr.send(formData);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({ files: [] });
            if (this.props.onClear) {
                this.props.onClear();
            }
            this.clearInputElement();
        }
    }, {
        key: 'onFocus',
        value: function onFocus(event) {
            _DomHandler2.default.addClass(event.currentTarget.parentElement, 'ui-state-focus');
        }
    }, {
        key: 'onBlur',
        value: function onBlur(event) {
            _DomHandler2.default.removeClass(event.currentTarget.parentElement, 'ui-state-focus');
        }
    }, {
        key: 'onDragEnter',
        value: function onDragEnter(event) {
            if (!this.props.disabled) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }, {
        key: 'onDragOver',
        value: function onDragOver(event) {
            if (!this.props.disabled) {
                _DomHandler2.default.addClass(this.content, 'ui-fileupload-highlight');
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }, {
        key: 'onDragLeave',
        value: function onDragLeave(event) {
            if (!this.props.disabled) {
                _DomHandler2.default.removeClass(this.content, 'ui-fileupload-highlight');
            }
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event) {
            if (!this.props.disabled) {
                _DomHandler2.default.removeClass(this.content, 'ui-fileupload-highlight');
                event.stopPropagation();
                event.preventDefault();

                var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
                var allowDrop = this.props.multiple || files && files.length === 1;

                if (allowDrop) {
                    this.onFileSelect(event);
                }
            }
        }
    }, {
        key: 'onSimpleUploaderClick',
        value: function onSimpleUploaderClick() {
            if (this.hasFiles()) {
                this.upload();
            }
        }
    }, {
        key: 'renderChooseButton',
        value: function renderChooseButton() {
            var _this4 = this;

            var className = (0, _classnames2.default)('ui-button ui-fileupload-choose ui-widget ui-state-default ui-corner-all ui-button-text-icon-left');

            return _react2.default.createElement(
                'span',
                { icon: 'pi pi-plus', className: className },
                _react2.default.createElement('input', { ref: function ref(el) {
                        return _this4.fileInput = el;
                    }, type: 'file', onChange: this.onFileSelect, onFocus: this.onFocus, onBlur: this.onBlur,
                    multiple: this.props.multiple, accept: this.props.accept, disabled: this.props.disabled }),
                _react2.default.createElement('span', { className: 'ui-button-icon ui-button-icon-left ui-clickable pi pi-fw pi-plus' }),
                _react2.default.createElement(
                    'span',
                    { className: 'ui-button-text ui-clickable' },
                    this.props.chooseLabel
                )
            );
        }
    }, {
        key: 'renderFiles',
        value: function renderFiles() {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                { className: 'ui-fileupload-files' },
                this.state.files.map(function (file, index) {
                    var preview = _this5.isImage(file) ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('img', { alt: file.name, role: 'presentation', src: file.objectURL, width: _this5.props.previewWidth })
                    ) : null;
                    var fileName = _react2.default.createElement(
                        'div',
                        null,
                        file.name
                    );
                    var size = _react2.default.createElement(
                        'div',
                        null,
                        _this5.formatSize(file.size)
                    );
                    var removeButton = _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_Button.Button, { type: 'button', icon: 'pi pi-times', onClick: function onClick() {
                                return _this5.remove(index);
                            } })
                    );

                    return _react2.default.createElement(
                        'div',
                        { className: 'ui-fileupload-row', key: file.name + file.type + file.size },
                        preview,
                        fileName,
                        size,
                        removeButton
                    );
                })
            );
        }
    }, {
        key: 'renderAdvanced',
        value: function renderAdvanced() {
            var _this6 = this;

            var className = (0, _classnames2.default)('ui-fileupload ui-widget', this.props.className);
            var uploadButton = void 0,
                cancelButton = void 0,
                filesList = void 0,
                progressBar = void 0;
            var chooseButton = this.renderChooseButton();

            if (!this.props.auto) {
                uploadButton = _react2.default.createElement(_Button.Button, { label: this.props.uploadLabel, icon: 'pi pi-upload', onClick: this.upload, disabled: this.props.disabled || !this.hasFiles() });
                cancelButton = _react2.default.createElement(_Button.Button, { label: this.props.cancelLabel, icon: 'pi pi-times', onClick: this.clear, disabled: this.props.disabled || !this.hasFiles() });
            }

            if (this.hasFiles()) {
                filesList = this.renderFiles();
                progressBar = _react2.default.createElement(_ProgressBar.ProgressBar, { value: this.state.progress, showValue: false });
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-fileupload-buttonbar ui-widget-header ui-corner-top' },
                    chooseButton,
                    uploadButton,
                    cancelButton
                ),
                _react2.default.createElement(
                    'div',
                    { ref: function ref(el) {
                            _this6.content = el;
                        }, className: 'ui-fileupload-content ui-widget-content ui-corner-bottom',
                        onDragEnter: this.onDragEnter, onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop },
                    progressBar,
                    _react2.default.createElement(_Messages.Messages, { ref: function ref(el) {
                            return _this6.messagesUI = el;
                        } }),
                    filesList
                )
            );
        }
    }, {
        key: 'renderBasic',
        value: function renderBasic() {
            var _this7 = this;

            var buttonClassName = (0, _classnames2.default)('ui-button ui-fileupload-choose ui-widget ui-state-default ui-corner-all ui-button-text-icon-left', { 'ui-fileupload-choose-selected': this.hasFiles() });
            var iconClassName = (0, _classnames2.default)('ui-button-icon-left pi', { 'pi-plus': !this.hasFiles() || this.props.auto, 'pi-upload': this.hasFiles() && !this.props.auto });

            return _react2.default.createElement(
                'span',
                { className: buttonClassName, onMouseUp: this.onSimpleUploaderClick },
                _react2.default.createElement('span', { className: iconClassName }),
                _react2.default.createElement(
                    'span',
                    { className: 'ui-button-text ui-clickable' },
                    this.props.auto ? this.props.chooseLabel : this.hasFiles() ? this.state.files[0].name : this.props.chooseLabel
                ),
                _react2.default.createElement('input', { ref: function ref(el) {
                        return _this7.fileInput = el;
                    }, type: 'file', multiple: this.props.multiple, accept: this.props.accept, disabled: this.props.disabled,
                    onChange: this.onFileSelect, onFocus: this.onFocus, onBlur: this.onBlur })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.mode === 'advanced') return this.renderAdvanced();else if (this.props.mode === 'basic') return this.renderBasic();
        }
    }]);

    return FileUpload;
}(_react.Component);

FileUpload.defaultProps = {
    id: null,
    name: null,
    url: null,
    mode: 'advanced',
    multiple: false,
    accept: null,
    disabled: false,
    auto: false,
    maxFileSize: null,
    invalidFileSizeMessageSummary: '{0}: Invalid file size, ',
    invalidFileSizeMessageDetail: 'maximum upload size is {0}.',
    style: null,
    className: null,
    widthCredentials: false,
    previewWidth: 50,
    chooseLabel: 'Choose',
    uploadLabel: 'Upload',
    cancelLabel: 'Cancel',
    onBeforeUpload: null,
    onBeforeSend: null,
    onUpload: null,
    onError: null,
    onClear: null,
    onSelect: null,
    onProgress: null
};
FileUpload.propTypes = {
    id: _propTypes2.default.string,
    name: _propTypes2.default.string,
    url: _propTypes2.default.string,
    mode: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    accept: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    auto: _propTypes2.default.bool,
    maxFileSize: _propTypes2.default.number,
    invalidFileSizeMessageSummary: _propTypes2.default.string,
    invalidFileSizeMessageDetail: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    widthCredentials: _propTypes2.default.bool,
    previewWidth: _propTypes2.default.number,
    chooseLabel: _propTypes2.default.string,
    uploadLabel: _propTypes2.default.string,
    cancelLabel: _propTypes2.default.string,
    onBeforeUpload: _propTypes2.default.func,
    onBeforeSend: _propTypes2.default.func,
    onUpload: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onClear: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onProgress: _propTypes2.default.func
};