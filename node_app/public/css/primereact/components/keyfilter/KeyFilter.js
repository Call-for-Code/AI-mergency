'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyFilter = function () {
    function KeyFilter() {
        _classCallCheck(this, KeyFilter);
    }

    _createClass(KeyFilter, null, [{
        key: 'isNavKeyPress',

        /* eslint-enable */

        value: function isNavKeyPress(e) {
            var k = e.keyCode;
            k = _DomHandler2.default.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;

            return k >= 33 && k <= 40 || k === KeyFilter.KEYS.RETURN || k === KeyFilter.KEYS.TAB || k === KeyFilter.KEYS.ESC;
        }

        /* eslint-disable */

    }, {
        key: 'isSpecialKey',
        value: function isSpecialKey(e) {
            var k = e.keyCode;

            return k === 9 || k === 13 || k === 27 || k === 16 || k === 17 || k >= 18 && k <= 20 || _DomHandler2.default.getBrowser().opera && !e.shiftKey && (k === 8 || k >= 33 && k <= 35 || k >= 36 && k <= 39 || k >= 44 && k <= 45);
        }
    }, {
        key: 'getKey',
        value: function getKey(e) {
            var k = e.keyCode || e.charCode;
            return _DomHandler2.default.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
        }
    }, {
        key: 'getCharCode',
        value: function getCharCode(e) {
            return e.charCode || e.keyCode || e.which;
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress(e, keyfilter, validateOnly) {
            if (validateOnly) {
                return;
            }

            this.regex = KeyFilter.DEFAULT_MASKS[keyfilter] ? KeyFilter.DEFAULT_MASKS[keyfilter] : keyfilter;
            var browser = _DomHandler2.default.getBrowser();

            if (e.ctrlKey || e.altKey) {
                return;
            }

            var k = this.getKey(e);
            if (browser.mozilla && (this.isNavKeyPress(e) || k === KeyFilter.KEYS.BACKSPACE || k === KeyFilter.KEYS.DELETE && e.charCode === 0)) {
                return;
            }

            var c = this.getCharCode(e);
            var cc = String.fromCharCode(c);
            var ok = true;

            if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
                return;
            }

            ok = this.regex.test(cc);

            if (!ok) {
                e.preventDefault();
            }
        }
    }, {
        key: 'validate',
        value: function validate(e, keyfilter) {
            var value = e.target.value,
                validatePattern = true;

            if (value && !keyfilter.test(value)) {
                validatePattern = false;
            }

            return validatePattern;
        }
    }]);

    return KeyFilter;
}();

KeyFilter.DEFAULT_MASKS = {
    pint: /[\d]/,
    int: /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
};
KeyFilter.KEYS = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};
KeyFilter.SAFARI_KEYS = {
    63234: 37, // left
    63235: 39, // right
    63232: 38, // up
    63233: 40, // down
    63276: 33, // page up
    63277: 34, // page down
    63272: 46, // delete
    63273: 36, // home
    63275: 35 // end
};
exports.default = KeyFilter;