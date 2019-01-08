'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Password = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InputText = require('../inputtext/InputText');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Password = exports.Password = function (_Component) {
    _inherits(Password, _Component);

    function Password(props) {
        _classCallCheck(this, Password);

        var _this = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this, props));

        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyup = _this.onKeyup.bind(_this);
        return _this;
    }

    _createClass(Password, [{
        key: 'onFocus',
        value: function onFocus(e) {
            var _this2 = this;

            if (this.props.feedback) {
                if (!this.panel) {
                    this.createPanel();
                }

                this.panel.style.zIndex = String(_DomHandler2.default.generateZIndex());
                this.panel.style.display = 'block';
                setTimeout(function () {
                    _DomHandler2.default.addClass(_this2.panel, 'ui-input-overlay-visible');
                    _DomHandler2.default.removeClass(_this2.panel, 'ui-input-overlay-hidden');
                }, 1);
                _DomHandler2.default.absolutePosition(this.panel, this.inputEl);
            }

            if (this.props.onFocus) {
                this.props.onFocus(e);
            }
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            var _this3 = this;

            if (this.props.feedback) {
                _DomHandler2.default.addClass(this.panel, 'ui-input-overlay-hidden');
                _DomHandler2.default.removeClass(this.panel, 'ui-input-overlay-visible');

                setTimeout(function () {
                    _this3.panel.style.display = 'none';
                    _DomHandler2.default.removeClass(_this3.panel, 'ui-input-overlay-hidden');
                }, 150);
            }

            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        }
    }, {
        key: 'onKeyup',
        value: function onKeyup(e) {
            if (this.props.feedback) {
                var value = e.target.value,
                    label = null,
                    meterPos = null;

                if (value.length === 0) {
                    label = this.props.promptLabel;
                    meterPos = '0px 0px';
                } else {
                    var score = this.testStrength(value);

                    if (score < 30) {
                        label = this.props.weakLabel;
                        meterPos = '0px -10px';
                    } else if (score >= 30 && score < 80) {
                        label = this.props.mediumLabel;
                        meterPos = '0px -20px';
                    } else if (score >= 80) {
                        label = this.props.strongLabel;
                        meterPos = '0px -30px';
                    }
                }

                this.meter.style.backgroundPosition = meterPos;
                this.info.textContent = label;
            }

            if (this.props.onKeyUp) {
                this.props.onKeyUp(e);
            }
        }
    }, {
        key: 'testStrength',
        value: function testStrength(str) {
            var grade = 0;
            var val = void 0;

            val = str.match('[0-9]');
            grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;

            val = str.match('[a-zA-Z]');
            grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;

            val = str.match('[!@#$%^&*?_~.,;=]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;

            val = str.match('[A-Z]');
            grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;

            grade *= str.length / 8;

            return grade > 100 ? 100 : grade;
        }
    }, {
        key: 'normalize',
        value: function normalize(x, y) {
            var diff = x - y;

            if (diff <= 0) return x / y;else return 1 + 0.5 * (x / (x + y / 4));
        }
    }, {
        key: 'createPanel',
        value: function createPanel() {
            this.panel = document.createElement('div');
            this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ui-password-panel-overlay ui-input-overlay';
            this.meter = document.createElement('div');
            this.meter.className = 'ui-password-meter';
            this.info = document.createElement('div');
            this.info.className = 'ui-password-info';
            this.info.textContent = this.props.promptLabel;

            this.panel.appendChild(this.meter);
            this.panel.appendChild(this.info);
            document.body.appendChild(this.panel);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.feedback && this.panel) {
                this.panel.removeChild(this.meter);
                this.panel.removeChild(this.info);
                document.body.removeChild(this.panel);
                this.panel = null;
                this.meter = null;
                this.info = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var inputProps = Object.assign({}, this.props);
            delete inputProps.onFocus;
            delete inputProps.onBlur;
            delete inputProps.onKeyUp;
            delete inputProps.promptLabel;
            delete inputProps.weakLabel;
            delete inputProps.mediumLabel;
            delete inputProps.strongLabel;
            delete inputProps.feedback;

            return _react2.default.createElement(_InputText.InputText, _extends({ ref: function ref(el) {
                    return _this4.inputEl = _reactDom2.default.findDOMNode(el);
                } }, inputProps, { type: 'password', onFocus: this.onFocus, onBlur: this.onBlur, onKeyUp: this.onKeyup }));
        }
    }]);

    return Password;
}(_react.Component);

Password.defaultProps = {
    promptLabel: 'Please enter a password',
    weakLabel: 'Weak',
    mediumLabel: 'Medium',
    strongLabel: 'Strong',
    feedback: true
};
Password.propTypes = {
    promptLabel: _propTypes2.default.string,
    weakLabel: _propTypes2.default.string,
    mediumLabel: _propTypes2.default.string,
    strongLabel: _propTypes2.default.string,
    feedback: _propTypes2.default.bool
};