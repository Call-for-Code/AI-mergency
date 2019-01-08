'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rating = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rating = exports.Rating = function (_Component) {
    _inherits(Rating, _Component);

    function Rating(props) {
        _classCallCheck(this, Rating);

        var _this = _possibleConstructorReturn(this, (Rating.__proto__ || Object.getPrototypeOf(Rating)).call(this, props));

        _this.clear = _this.clear.bind(_this);
        return _this;
    }

    _createClass(Rating, [{
        key: 'rate',
        value: function rate(event, i) {
            if (!this.props.readonly && !this.props.disabled && this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: i
                });
            }

            event.preventDefault();
        }
    }, {
        key: 'clear',
        value: function clear(event) {
            if (!this.props.readonly && !this.props.disabled && this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: null
                });
            }

            event.preventDefault();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.value === this.props.value && nextProps.disabled === this.props.disabled) {
                return false;
            }

            return true;
        }
    }, {
        key: 'renderStars',
        value: function renderStars() {
            var _this2 = this;

            var starsArray = [];
            for (var i = 0; i < this.props.stars; i++) {
                starsArray[i] = i + 1;
            }

            var stars = starsArray.map(function (value) {
                var iconClass = (0, _classnames2.default)('ui-rating-icon pi', {
                    'pi-star-o': !_this2.props.value || value > _this2.props.value,
                    'pi-star': value <= _this2.props.value
                });

                return _react2.default.createElement(
                    'a',
                    { onClick: function onClick(e) {
                            return _this2.rate(e, value);
                        }, key: value },
                    _react2.default.createElement('span', { className: iconClass })
                );
            });

            return stars;
        }
    }, {
        key: 'renderCancelIcon',
        value: function renderCancelIcon() {
            if (this.props.cancel) {
                return _react2.default.createElement(
                    'a',
                    { onClick: this.clear },
                    _react2.default.createElement('span', { className: 'ui-rating-icon pi pi-ban' })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-rating', this.props.className, { 'ui-state-disabled': this.props.disabled, 'ui-rating-readonly': this.props.readonly });
            var cancelIcon = this.renderCancelIcon();
            var stars = this.renderStars();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                cancelIcon,
                stars
            );
        }
    }]);

    return Rating;
}(_react.Component);

Rating.defaultProps = {
    id: null,
    value: null,
    disabled: false,
    readonly: false,
    stars: 5,
    cancel: true,
    style: null,
    className: null,
    onChange: null
};
Rating.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    stars: _propTypes2.default.number,
    cancel: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};