'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Captcha = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Captcha = exports.Captcha = function (_Component) {
    _inherits(Captcha, _Component);

    function Captcha() {
        _classCallCheck(this, Captcha);

        return _possibleConstructorReturn(this, (Captcha.__proto__ || Object.getPrototypeOf(Captcha)).apply(this, arguments));
    }

    _createClass(Captcha, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this._instance = window.grecaptcha.render(this.targetEL, {
                'sitekey': this.props.siteKey,
                'theme': this.props.theme,
                'type': this.props.type,
                'size': this.props.size,
                'tabindex': this.props.tabIndex,
                'hl': this.props.language,
                'callback': function callback(response) {
                    _this2.recaptchaCallback(response);
                },
                'expired-callback': function expiredCallback() {
                    _this2.recaptchaExpiredCallback();
                }
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (this._instance === null) return;

            window.grecaptcha.reset(this._instance);
        }
    }, {
        key: 'getResponse',
        value: function getResponse() {
            if (this._instance === null) return null;

            return window.grecaptcha.getResponse(this._instance);
        }
    }, {
        key: 'recaptchaCallback',
        value: function recaptchaCallback(response) {
            if (this.props.onResponse) {
                this.props.onResponse({
                    response: response
                });
            }
        }
    }, {
        key: 'recaptchaExpiredCallback',
        value: function recaptchaExpiredCallback() {
            if (this.props.onExpire) {
                this.props.onExpire();
            }
        }
    }, {
        key: 'addRecaptchaScript',
        value: function addRecaptchaScript() {
            this.recaptchaScript = null;
            if (!window.grecaptcha) {
                var head = document.head || document.getElementsByTagName('head')[0];
                this.recaptchaScript = document.createElement('script');
                this.recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=explicit";
                this.recaptchaScript.async = true;
                this.recaptchaScript.defer = true;
                head.appendChild(this.recaptchaScript);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            this.addRecaptchaScript();

            if (window.grecaptcha) {
                this.init();
            } else {
                setTimeout(function () {
                    if (!window.grecaptcha) {
                        console.warn("Recaptcha is not loaded");
                        return;
                    }
                    _this3.init();
                }, 500);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.recaptchaScript) {
                this.recaptchaScript.parentNode.removeChild(this.recaptchaScript);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement('div', { id: this.props.id, ref: function ref(el) {
                    return _this4.targetEL = _reactDom2.default.findDOMNode(el);
                } });
        }
    }]);

    return Captcha;
}(_react.Component);

Captcha.defaultProps = {
    id: null,
    siteKey: null,
    theme: "light",
    type: "image",
    size: "normal",
    tabIndex: 0,
    language: "en",
    onResponse: null,
    onExpire: null
};
Captcha.propTypes = {
    id: _propTypes2.default.string,
    sitekey: _propTypes2.default.string,
    theme: _propTypes2.default.string,
    type: _propTypes2.default.string,
    size: _propTypes2.default.string,
    tabindex: _propTypes2.default.number,
    language: _propTypes2.default.string,
    onResponse: _propTypes2.default.func,
    onExpire: _propTypes2.default.func
};