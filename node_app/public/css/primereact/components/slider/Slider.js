'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Slider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = exports.Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onBarClick = _this.onBarClick.bind(_this);
        _this.endDrag = _this.endDrag.bind(_this);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.handleValues = [];
        _this.isFloatValue = _this.isFloat(_this.props.value) || _this.isFloat(_this.props.step);

        if (_this.props.range) _this.values = _this.props.value || [0, 0];else _this.value = _this.props.value || 0;

        _this.updateHandleValue();
        return _this;
    }

    _createClass(Slider, [{
        key: 'isFloat',
        value: function isFloat(val) {
            return val != null && Number(val) === val && val % 1 !== 0;
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event, index) {
            if (this.props.disabled) {
                return;
            }

            this.dragging = true;
            this.updateDomData();
            this.sliderHandleClick = true;
            this.handleIndex = index;
            event.target.style.transition = "none";
        }
    }, {
        key: 'onBarClick',
        value: function onBarClick(event) {
            if (this.props.disabled) {
                return;
            }

            if (!this.sliderHandleClick) {
                this.updateDomData();
                this.handleChange(event);
            }

            this.sliderHandleClick = false;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            var handleValue = this.calculateHandleValue(event);
            this.setValueFromHandle(event, handleValue);
        }
    }, {
        key: 'setValueFromHandle',
        value: function setValueFromHandle(event, handleValue) {
            var newValue = this.getValueFromHandle(handleValue);

            if (this.props.range) {
                if (this.props.step) {
                    this.handleStepChange(newValue, this.values[this.handleIndex], event);
                } else {
                    this.handleValues[this.handleIndex] = handleValue;
                    this.updateValue(newValue, event);
                }
            } else {
                if (this.props.step) {
                    this.handleStepChange(newValue, this.value, event);
                } else {
                    this.handleValue = handleValue;
                    this.updateValue(newValue, event);
                }
            }
        }
    }, {
        key: 'handleStepChange',
        value: function handleStepChange(newValue, oldValue, event) {
            var diff = newValue - oldValue,
                originalEvent = event.originalEvent;

            if (diff < 0 && -1 * diff >= this.props.step / 2) {
                newValue = oldValue - this.props.step;
                this.updateValue(newValue, event);

                if (originalEvent && !originalEvent.defaultPrevented) {
                    this.updateHandleValue();
                }
            } else if (diff > 0 && diff >= this.props.step / 2) {
                newValue = oldValue + this.props.step;
                this.updateValue(newValue, event);

                if (originalEvent && !originalEvent.defaultPrevented) {
                    this.updateHandleValue();
                }
            }
        }
    }, {
        key: 'updateDomData',
        value: function updateDomData() {
            var rect = this.container.getBoundingClientRect();
            this.initX = rect.left + _DomHandler2.default.getWindowScrollLeft();
            this.initY = rect.top + _DomHandler2.default.getWindowScrollTop();
            this.barWidth = this.container.offsetWidth;
            this.barHeight = this.container.offsetHeight;
        }
    }, {
        key: 'calculateHandleValue',
        value: function calculateHandleValue(event) {
            if (this.props.orientation === 'horizontal') return Math.floor((event.pageX - this.initX) * 100 / this.barWidth);else return Math.floor((this.initY + this.barHeight - event.pageY) * 100 / this.barHeight);
        }
    }, {
        key: 'updateHandleValue',
        value: function updateHandleValue() {
            if (this.props.range) {
                this.handleValues[0] = (this.values[0] < this.props.min ? 0 : this.values[0] - this.props.min) * 100 / (this.props.max - this.props.min);
                this.handleValues[1] = (this.values[1] > this.props.max ? 100 : this.values[1] - this.props.min) * 100 / (this.props.max - this.props.min);
            } else {
                if (this.value < this.props.min) this.handleValue = 0;else if (this.value > this.props.max) this.handleValue = 100;else this.handleValue = (this.value - this.props.min) * 100 / (this.props.max - this.props.min);
            }
        }
    }, {
        key: 'updateValue',
        value: function updateValue(val, event) {
            if (this.props.range) {
                var value = val;

                if (this.handleIndex === 0) {
                    if (value < this.props.min) {
                        value = this.props.min;
                        this.handleValues[0] = 0;
                    } else if (value > this.values[1]) {
                        value = this.values[1];
                        this.handleValues[0] = this.handleValues[1];
                    }
                } else {
                    if (value > this.props.max) {
                        value = this.props.max;
                        this.handleValues[1] = 100;
                    } else if (value < this.values[0]) {
                        value = this.values[0];
                        this.handleValues[1] = this.handleValues[0];
                    }
                }

                if (this.isFloatValue) {
                    this.values[this.handleIndex] = value;
                } else {
                    this.values[this.handleIndex] = Math.floor(value);
                }

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: this.values
                    });
                }
            } else {
                if (val < this.props.min) {
                    val = this.props.min;
                    this.handleValue = 0;
                } else if (val > this.props.max) {
                    val = this.props.max;
                    this.handleValue = 100;
                }

                if (this.isFloatValue) {
                    this.value = val;
                } else {
                    this.value = Math.floor(val);
                }

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: this.value
                    });
                }
            }
        }
    }, {
        key: 'getValueFromHandle',
        value: function getValueFromHandle(handleValue) {
            return (this.props.max - this.props.min) * (handleValue / 100) + this.props.min;
        }
    }, {
        key: 'onDrag',
        value: function onDrag(event) {
            if (this.dragging) {
                this.handleChange(event);
            }
        }
    }, {
        key: 'endDrag',
        value: function endDrag(event) {
            if (this.dragging) {
                this.dragging = false;
                event.target.style.transition = null;
            }
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(event, index) {
            var touchobj = event.changedTouches[0];
            this.startHandleValue = this.props.range ? this.handleValues[index] : this.handleValue;
            this.dragging = true;
            this.handleIndex = index;

            if (this.props.orientation === 'horizontal') {
                this.startx = parseInt(touchobj.clientX, 10);
                this.barWidth = this.container.offsetWidth;
            } else {
                this.starty = parseInt(touchobj.clientY, 10);
                this.barHeight = this.container.offsetHeight;
            }

            event.preventDefault();
        }
    }, {
        key: 'onTouchMove',
        value: function onTouchMove(event, index) {
            var touchobj = event.changedTouches[0],
                handleValue = 0;

            if (this.props.orientation === 'horizontal') {
                handleValue = Math.floor((parseInt(touchobj.clientX, 10) - this.startx) * 100 / this.barWidth) + this.startHandleValue;
            } else {
                handleValue = Math.floor((this.starty - parseInt(touchobj.clientY, 10)) * 100 / this.barHeight) + this.startHandleValue;
            }

            event.target.style.transition = "none";
            this.setValueFromHandle(event, handleValue);

            event.preventDefault();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.documentDragListener = this.onDrag.bind(this);
            document.addEventListener('mousemove', this.documentDragListener);

            this.documentEndDragListener = this.endDrag.bind(this);
            document.addEventListener('mouseup', this.documentEndDragListener);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var newValue = nextProps.value;
            if (newValue) {
                if (this.props.range) {
                    this.values = newValue;
                } else {
                    this.value = newValue;
                }
            }
            this.updateHandleValue();

            return true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.documentDragListener) {
                document.removeEventListener('mousemove', this.documentDragListener);
            }
            if (this.documentEndDragListener) {
                document.removeEventListener('mouseup', this.documentEndDragListener);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-slider ui-widget ui-widget-content ui-corner-all', this.props.className, {
                'ui-state-disabled': this.props.disabled,
                'ui-slider-horizontal': this.props.orientation === 'horizontal',
                'ui-slider-vertical': this.props.orientation === 'vertical',
                'ui-slider-animate': this.props.animate
            });

            var verticalRange = this.props.orientation === 'vertical' && _react2.default.createElement('span', { className: 'ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all', style: { 'height': this.handleValue + '%' } });
            if (this.props.range) {
                var leftHandleClass = (0, _classnames2.default)('ui-slider-handle ui-state-default ui-corner-all', {
                    'ui-slider-handle-active': this.props.handleIndex === 0
                }),
                    rightHandleClass = (0, _classnames2.default)('ui-slider-handle ui-state-default ui-corner-all', {
                    'ui-slider-handle-active': this.props.handleIndex === 1
                });

                var middleRange = _react2.default.createElement('span', { className: 'ui-slider-range ui-widget-header ui-corner-all', style: { 'left': this.handleValues[0] + '%', width: this.handleValues[1] - this.handleValues[0] + '%' } });
                var leftHandle = _react2.default.createElement('span', { onMouseDown: function onMouseDown(e) {
                        return _this2.onMouseDown(e, 0);
                    }, onTouchStart: function onTouchStart(e) {
                        return _this2.onTouchStart(e, 0);
                    }, onTouchMove: function onTouchMove(e) {
                        return _this2.onTouchMove(e, 0);
                    }, className: leftHandleClass, style: { 'left': this.handleValues[0] + '%' } });
                var rightHandle = _react2.default.createElement('span', { onMouseDown: function onMouseDown(e) {
                        return _this2.onMouseDown(e, 1);
                    }, onTouchStart: function onTouchStart(e) {
                        return _this2.onTouchStart(e, 1);
                    }, onTouchMove: function onTouchMove(e) {
                        return _this2.onTouchMove(e, 1);
                    }, className: rightHandleClass, style: { 'left': this.handleValues[1] + '%' } });
            } else {
                var handle = _react2.default.createElement('span', { className: 'ui-slider-handle ui-state-default ui-corner-all', onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart, onTouchMove: this.onTouchMove,
                    style: { 'left': this.props.orientation === 'horizontal' ? this.handleValue + '%' : null, 'bottom': this.props.orientation === 'vertical' ? this.handleValue + '%' : null } });
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, ref: function ref(el) {
                        _this2.container = el;
                    }, style: this.props.style, className: className, onClick: this.onBarClick },
                handle,
                middleRange,
                verticalRange,
                leftHandle,
                rightHandle
            );
        }
    }]);

    return Slider;
}(_react.Component);

Slider.defaultProps = {
    id: null,
    value: null,
    animate: false,
    min: 0,
    max: 100,
    orientation: "horizontal",
    step: null,
    range: false,
    style: null,
    className: null,
    onChange: null
};
Slider.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.number,
    animate: _propTypes2.default.bool,
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    orientation: _propTypes2.default.string,
    step: _propTypes2.default.number,
    range: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};