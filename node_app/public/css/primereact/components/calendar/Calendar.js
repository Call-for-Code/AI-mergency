'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Calendar = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputText = require('../inputtext/InputText');

var _Button = require('../button/Button');

var _CalendarPanel = require('./CalendarPanel');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = exports.Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        if (!_this.props.onViewDateChange) {
            _this.state = {
                viewDate: _this.props.viewDate || _this.props.value || new Date()
            };
        }

        _this.onInputClick = _this.onInputClick.bind(_this);
        _this.onInput = _this.onInput.bind(_this);
        _this.onInputFocus = _this.onInputFocus.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.onButtonClick = _this.onButtonClick.bind(_this);
        _this.onPanelClick = _this.onPanelClick.bind(_this);
        _this.navBackward = _this.navBackward.bind(_this);
        _this.navForward = _this.navForward.bind(_this);
        _this.onMonthDropdownChange = _this.onMonthDropdownChange.bind(_this);
        _this.onYearDropdownChange = _this.onYearDropdownChange.bind(_this);
        _this.onTodayButtonClick = _this.onTodayButtonClick.bind(_this);
        _this.onClearButtonClick = _this.onClearButtonClick.bind(_this);
        _this.incrementHour = _this.incrementHour.bind(_this);
        _this.decrementHour = _this.decrementHour.bind(_this);
        _this.incrementMinute = _this.incrementMinute.bind(_this);
        _this.decrementMinute = _this.decrementMinute.bind(_this);
        _this.incrementSecond = _this.incrementSecond.bind(_this);
        _this.decrementSecond = _this.decrementSecond.bind(_this);
        _this.toggleAmPm = _this.toggleAmPm.bind(_this);
        return _this;
    }

    _createClass(Calendar, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.mask) {
                this.disableModality();
                this.mask = null;
            }
        }
    }, {
        key: 'onInputClick',
        value: function onInputClick(event) {
            if (this.documentClickListener) {
                this.datepickerClick = true;
            }
        }
    }, {
        key: 'onInputFocus',
        value: function onInputFocus(event) {
            if (this.props.showOnFocus && !this.panel.offsetParent) {
                this.showOverlay();
            }

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }

            _DomHandler2.default.addClass(this.container, 'ui-inputwrapper-focus');
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(event) {
            if (this.props.onBlur) {
                this.props.onBlur(event);
            }

            _DomHandler2.default.removeClass(this.container, 'ui-inputwrapper-focus');
        }
    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            this.isKeydown = true;
            if (event.keyCode === 9) {
                this.hideOverlay();
            }
        }
    }, {
        key: 'onInput',
        value: function onInput(event) {
            // IE 11 Workaround for input placeholder
            if (!this.isKeydown) {
                return;
            }
            this.isKeydown = false;

            var rawValue = event.target.value;

            try {
                var value = this.parseValueFromString(rawValue);
                this.updateModel(event, value);
                this.updateViewDate(event, value.length ? value[0] : value);
            } catch (err) {
                this.updateModel(event, rawValue);
            }

            if (this.props.onInput) {
                this.props.onInput(event);
            }
        }
    }, {
        key: 'onButtonClick',
        value: function onButtonClick(event) {
            if (this.documentClickListener) {
                this.datepickerClick = true;
            }

            if (!this.panel.offsetParent) {
                this.showOverlay();
            }
        }
    }, {
        key: 'onPanelClick',
        value: function onPanelClick(event) {
            if (this.documentClickListener) {
                this.datepickerClick = true;
            }
        }
    }, {
        key: 'navBackward',
        value: function navBackward(event) {
            if (this.props.disabled) {
                event.preventDefault();
                return;
            }

            var newViewDate = new Date(this.getViewDate().getTime());

            if (this.props.view === 'date') {
                if (newViewDate.getMonth() === 0) {
                    newViewDate.setMonth(11);
                    newViewDate.setFullYear(newViewDate.getFullYear() - 1);
                } else {
                    newViewDate.setMonth(newViewDate.getMonth() - 1);
                }
            } else if (this.props.view === 'month') {
                var currentYear = newViewDate.getFullYear();
                var newYear = currentYear - 1;

                if (this.props.yearNavigator) {
                    var minYear = parseInt(this.props.yearRange.split(':')[0], 10);

                    if (newYear < minYear) {
                        newYear = minYear;
                    }
                }

                newViewDate.setFullYear(newYear);
            }

            this.updateViewDate(event, newViewDate);

            event.preventDefault();
        }
    }, {
        key: 'navForward',
        value: function navForward(event) {
            if (this.props.disabled) {
                event.preventDefault();
                return;
            }

            var newViewDate = new Date(this.getViewDate().getTime());

            if (this.props.view === 'date') {
                if (newViewDate.getMonth() === 11) {
                    newViewDate.setMonth(0);
                    newViewDate.setFullYear(newViewDate.getFullYear() + 1);
                } else {
                    newViewDate.setMonth(newViewDate.getMonth() + 1);
                }
            } else if (this.props.view === 'month') {
                var currentYear = newViewDate.getFullYear();
                var newYear = currentYear + 1;

                if (this.props.yearNavigator) {
                    var maxYear = parseInt(this.props.yearRange.split(':')[1], 10);

                    if (newYear > maxYear) {
                        newYear = maxYear;
                    }
                }

                newViewDate.setFullYear(newYear);
            }

            this.updateViewDate(event, newViewDate);

            event.preventDefault();
        }
    }, {
        key: 'onMonthDropdownChange',
        value: function onMonthDropdownChange(event) {
            var currentViewDate = this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
            var newViewDate = new Date(currentViewDate.getTime());
            newViewDate.setMonth(parseInt(event.target.value, 10));

            this.updateViewDate(event, newViewDate);
        }
    }, {
        key: 'onYearDropdownChange',
        value: function onYearDropdownChange(event) {
            var currentViewDate = this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
            var newViewDate = new Date(currentViewDate.getTime());
            newViewDate.setFullYear(parseInt(event.target.value, 10));

            this.updateViewDate(event, newViewDate);
        }
    }, {
        key: 'onTodayButtonClick',
        value: function onTodayButtonClick(event) {
            var today = new Date();
            var dateMeta = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear(), today: true, selectable: true };

            this.updateViewDate(event, today);
            this.onDateSelect(event, dateMeta);

            if (this.props.onTodayButtonClick) {
                this.props.onTodayButtonClick(event);
            }
        }
    }, {
        key: 'onClearButtonClick',
        value: function onClearButtonClick(event) {
            this.updateModel(event, null);

            if (this.props.onClearButtonClick) {
                this.props.onClearButtonClick(event);
            }
        }
    }, {
        key: 'incrementHour',
        value: function incrementHour(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentHour = currentTime.getHours();
            var newHour = currentHour + this.props.stepHour;
            newHour = newHour >= 24 ? newHour - 24 : newHour;

            if (this.validateHour(newHour)) {
                this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds());
            }

            event.preventDefault();
        }
    }, {
        key: 'decrementHour',
        value: function decrementHour(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentHour = currentTime.getHours();
            var newHour = currentHour - this.props.stepHour;
            newHour = newHour < 0 ? newHour + 24 : newHour;

            if (this.validateHour(newHour)) {
                this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds());
            }

            event.preventDefault();
        }
    }, {
        key: 'incrementMinute',
        value: function incrementMinute(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentMinute = currentTime.getMinutes();
            var newMinute = currentMinute + this.props.stepMinute;
            newMinute = newMinute > 59 ? newMinute - 60 : newMinute;

            if (this.validateMinute(newMinute)) {
                this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds());
            }

            event.preventDefault();
        }
    }, {
        key: 'decrementMinute',
        value: function decrementMinute(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentMinute = currentTime.getMinutes();
            var newMinute = currentMinute - this.props.stepMinute;
            newMinute = newMinute < 0 ? newMinute + 60 : newMinute;

            if (this.validateMinute(newMinute)) {
                this.updateTime(event, currentTime.getHours(), newMinute, currentTime.getSeconds());
            }

            event.preventDefault();
        }
    }, {
        key: 'incrementSecond',
        value: function incrementSecond(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentSecond = currentTime.getSeconds();
            var newSecond = currentSecond + this.props.stepSecond;
            newSecond = newSecond > 59 ? newSecond - 60 : newSecond;

            if (this.validateSecond(newSecond)) {
                this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond);
            }

            event.preventDefault();
        }
    }, {
        key: 'decrementSecond',
        value: function decrementSecond(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentSecond = currentTime.getSeconds();
            var newSecond = currentSecond - this.props.stepSecond;
            newSecond = newSecond < 0 ? newSecond + 60 : newSecond;

            if (this.validateSecond(newSecond)) {
                this.updateTime(event, currentTime.getHours(), currentTime.getMinutes(), newSecond);
            }

            event.preventDefault();
        }
    }, {
        key: 'toggleAmPm',
        value: function toggleAmPm(event) {
            var currentTime = this.props.value || this.getViewDate();
            var currentHour = currentTime.getHours();
            var newHour = currentHour >= 12 ? currentHour - 12 : currentHour + 12;

            this.updateTime(event, newHour, currentTime.getMinutes(), currentTime.getSeconds());
            event.preventDefault();
        }
    }, {
        key: 'getViewDate',
        value: function getViewDate() {
            return this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
        }
    }, {
        key: 'validateHour',
        value: function validateHour(hour) {
            var valid = true;
            var value = this.props.value;
            var valueDateString = value ? value.toDateString() : null;

            if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
                if (this.props.minDate.getHours() > hour) {
                    valid = false;
                }
            }

            if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
                if (this.props.maxDate.getHours() < hour) {
                    valid = false;
                }
            }

            return valid;
        }
    }, {
        key: 'validateMinute',
        value: function validateMinute(minute) {
            var valid = true;
            var value = this.props.value;
            var valueDateString = value ? value.toDateString() : null;

            if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
                if (value.getHours() === this.props.minDate.getHours()) {
                    if (this.props.minDate.getMinutes() > minute) {
                        valid = false;
                    }
                }
            }

            if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
                if (value.getHours() === this.props.maxDate.getHours()) {
                    if (this.props.maxDate.getMinutes() < minute) {
                        valid = false;
                    }
                }
            }

            return valid;
        }
    }, {
        key: 'validateSecond',
        value: function validateSecond(second) {
            var valid = true;
            var value = this.props.value;
            var valueDateString = value ? value.toDateString() : null;

            if (this.props.minDate && valueDateString && this.props.minDate.toDateString() === valueDateString) {
                if (value.getHours() === this.props.minDate.getHours() && value.getMinutes() === this.props.minDate.getMinutes()) {
                    if (this.props.minDate.getMinutes() > second) {
                        valid = false;
                    }
                }
            }

            if (this.props.maxDate && valueDateString && this.props.maxDate.toDateString() === valueDateString) {
                if (value.getHours() === this.props.maxDate.getHours() && value.getMinutes() === this.props.maxDate.getMinutes()) {
                    if (this.props.maxDate.getMinutes() < second) {
                        valid = false;
                    }
                }
            }

            return valid;
        }
    }, {
        key: 'updateTime',
        value: function updateTime(event, hour, minute, second) {
            var newDateTime = this.props.value ? new Date(this.props.value) : new Date();

            newDateTime.setHours(hour);
            newDateTime.setMinutes(minute);
            newDateTime.setSeconds(second);

            this.updateModel(event, newDateTime);

            if (this.props.onSelect) {
                this.props.onSelect({
                    originalEvent: event,
                    value: newDateTime
                });
            }
        }
    }, {
        key: 'updateViewDate',
        value: function updateViewDate(event, value) {
            if (this.props.onViewDateChange) {
                this.props.onViewDateChange({
                    originalEvent: event,
                    value: value
                });
            } else {
                this.setState({
                    viewDate: value
                });
            }
        }
    }, {
        key: 'onDateSelect',
        value: function onDateSelect(event, dateMeta) {
            var _this2 = this;

            if (this.props.disabled || !dateMeta.selectable) {
                event.preventDefault();
                return;
            }

            if (this.isMultipleSelection()) {
                if (this.isSelected(dateMeta)) {
                    var value = this.props.value.filter(function (date, i) {
                        return !_this2.isDateEquals(date, dateMeta);
                    });
                    this.updateModel(event, value);
                } else if (!this.props.maxDateCount || !this.props.value || this.props.maxDateCount > this.props.value.length) {
                    this.selectDate(event, dateMeta);
                }
            } else {
                this.selectDate(event, dateMeta);
            }

            if (!this.props.inline && this.isSingleSelection() && (!this.props.showTime || this.props.hideOnDateTimeSelect)) {
                setTimeout(function () {
                    _this2.hideOverlay();
                }, 100);

                if (this.mask) {
                    this.disableModality();
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'selectDate',
        value: function selectDate(event, dateMeta) {
            var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);

            if (this.props.showTime) {
                var time = this.props.value || new Date();
                date.setHours(time.getHours());
                date.setMinutes(time.getMinutes());
                date.setSeconds(time.getSeconds());
            }

            if (this.props.minDate && this.props.minDate > date) {
                date = this.minDate;
            }

            if (this.maxDate && this.maxDate < date) {
                date = this.maxDate;
            }

            if (this.isSingleSelection()) {
                this.updateModel(event, date);
            } else if (this.isMultipleSelection()) {
                this.updateModel(event, this.props.value ? [].concat(_toConsumableArray(this.props.value), [date]) : [date]);
            } else if (this.isRangeSelection()) {
                if (this.props.value && this.props.value.length) {
                    var startDate = this.props.value[0];
                    var endDate = this.props.value[1];

                    if (!endDate && date.getTime() >= startDate.getTime()) {
                        endDate = date;
                    } else {
                        startDate = date;
                        endDate = null;
                    }

                    this.updateModel(event, [startDate, endDate]);
                } else {
                    this.updateModel(event, [date, null]);
                }
            }

            if (this.props.onSelect) {
                this.props.onSelect({
                    originalEvent: event,
                    value: date
                });
            }
        }
    }, {
        key: 'onMonthSelect',
        value: function onMonthSelect(event, month) {
            this.onDateSelect(event, { year: this.getViewDate().getFullYear(), month: month, day: 1, selectable: true });
            event.preventDefault();
        }
    }, {
        key: 'updateModel',
        value: function updateModel(event, value) {
            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'showOverlay',
        value: function showOverlay() {
            var _this3 = this;

            if (this.props.autoZIndex) {
                this.panel.style.zIndex = String(this.props.baseZIndex + _DomHandler2.default.generateZIndex());
            }
            this.panel.style.display = 'block';

            setTimeout(function () {
                _DomHandler2.default.addClass(_this3.panel, 'ui-input-overlay-visible');
                _DomHandler2.default.removeClass(_this3.panel, 'ui-input-overlay-hidden');
            }, 1);

            this.alignPanel();
            this.bindDocumentClickListener();
        }
    }, {
        key: 'hideOverlay',
        value: function hideOverlay() {
            var _this4 = this;

            _DomHandler2.default.addClass(this.panel, 'ui-input-overlay-hidden');
            _DomHandler2.default.removeClass(this.panel, 'ui-input-overlay-visible');
            this.unbindDocumentClickListener();
            this.datepickerClick = false;

            setTimeout(function () {
                _this4.panel.style.display = 'none';
                _DomHandler2.default.removeClass(_this4.panel, 'ui-input-overlay-hidden');
            }, 150);
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            var _this5 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (!_this5.datepickerClick) {
                        _this5.hideOverlay();
                    }

                    _this5.datepickerClick = false;
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentClickListener',
        value: function unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.props.touchUI) {
                this.enableModality();
            } else {
                if (this.props.appendTo) {
                    _DomHandler2.default.absolutePosition(this.panel, this.container);
                    this.panel.style.minWidth = _DomHandler2.default.getWidth(this.container) + 'px';
                } else {
                    _DomHandler2.default.relativePosition(this.panel, this.container);
                }
            }
        }
    }, {
        key: 'enableModality',
        value: function enableModality() {
            var _this6 = this;

            if (!this.mask) {
                this.mask = document.createElement('div');
                this.mask.style.zIndex = String(parseInt(this.panel.style.zIndex, 10) - 1);
                _DomHandler2.default.addMultipleClasses(this.mask, 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker');

                this.maskClickListener = function () {
                    _this6.disableModality();
                };
                this.mask.addEventListener('click', this.maskClickListener);

                document.body.appendChild(this.mask);
                _DomHandler2.default.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    }, {
        key: 'disableModality',
        value: function disableModality() {
            if (this.mask) {
                this.mask.removeEventListener('click', this.maskClickListener);
                this.maskClickListener = null;
                document.body.removeChild(this.mask);
                this.mask = null;

                var bodyChildren = document.body.children;
                var hasBlockerMasks = void 0;
                for (var i = 0; i < bodyChildren.length; i++) {
                    var bodyChild = bodyChildren[i];
                    if (_DomHandler2.default.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }

                if (!hasBlockerMasks) {
                    _DomHandler2.default.removeClass(document.body, 'ui-overflow-hidden');
                }

                this.hideOverlay();
            }
        }
    }, {
        key: 'getFirstDayOfMonthIndex',
        value: function getFirstDayOfMonthIndex(month, year) {
            var day = new Date();
            day.setDate(1);
            day.setMonth(month);
            day.setFullYear(year);

            var dayIndex = day.getDay() + this.getSundayIndex();
            return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
        }
    }, {
        key: 'getDaysCountInMonth',
        value: function getDaysCountInMonth(month, year) {
            return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
        }
    }, {
        key: 'getDaysCountInPrevMonth',
        value: function getDaysCountInPrevMonth(month, year) {
            var prev = this.getPreviousMonthAndYear(month, year);
            return this.getDaysCountInMonth(prev.month, prev.year);
        }
    }, {
        key: 'daylightSavingAdjust',
        value: function daylightSavingAdjust(date) {
            if (!date) {
                return null;
            }

            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);

            return date;
        }
    }, {
        key: 'getPreviousMonthAndYear',
        value: function getPreviousMonthAndYear(month, year) {
            var m = void 0,
                y = void 0;

            if (month === 0) {
                m = 11;
                y = year - 1;
            } else {
                m = month - 1;
                y = year;
            }

            return { 'month': m, 'year': y };
        }
    }, {
        key: 'getNextMonthAndYear',
        value: function getNextMonthAndYear(month, year) {
            var m = void 0,
                y = void 0;

            if (month === 11) {
                m = 0;
                y = year + 1;
            } else {
                m = month + 1;
                y = year;
            }

            return { 'month': m, 'year': y };
        }
    }, {
        key: 'getSundayIndex',
        value: function getSundayIndex() {
            return this.props.locale.firstDayOfWeek > 0 ? 7 - this.props.locale.firstDayOfWeek : 0;
        }
    }, {
        key: 'createWeekDays',
        value: function createWeekDays() {
            var weekDays = [];
            var dayIndex = this.props.locale.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                weekDays.push(this.props.locale.dayNamesMin[dayIndex]);
                dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
            }

            return weekDays;
        }
    }, {
        key: 'createMonths',
        value: function createMonths(month, year) {
            var months = [];
            for (var i = 0; i < this.props.numberOfMonths; i++) {
                var m = month + i;
                var y = year;
                if (m > 11) {
                    m = m % 11 - 1;
                    y = year + 1;
                }

                months.push(this.createMonth(m, y));
            }

            return months;
        }
    }, {
        key: 'createMonth',
        value: function createMonth(month, year) {
            var dates = [];
            var firstDay = this.getFirstDayOfMonthIndex(month, year);
            var daysLength = this.getDaysCountInMonth(month, year);
            var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
            var dayNo = 1;
            var today = new Date();

            for (var i = 0; i < 6; i++) {
                var week = [];

                if (i === 0) {
                    for (var j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
                        var prev = this.getPreviousMonthAndYear(month, year);
                        week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                            today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                    }

                    var remainingDaysLength = 7 - week.length;
                    for (var _j = 0; _j < remainingDaysLength; _j++) {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false) });
                        dayNo++;
                    }
                } else {
                    for (var _j2 = 0; _j2 < 7; _j2++) {
                        if (dayNo > daysLength) {
                            var next = this.getNextMonthAndYear(month, year);
                            week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                                today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                                selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true) });
                        } else {
                            week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                                selectable: this.isSelectable(dayNo, month, year, false) });
                        }

                        dayNo++;
                    }
                }

                dates.push(week);
            }

            return {
                month: month,
                year: year,
                dates: dates
            };
        }
    }, {
        key: 'isSelectable',
        value: function isSelectable(day, month, year, otherMonth) {
            var validMin = true;
            var validMax = true;
            var validDate = true;
            var validDay = true;
            var validMonth = true;

            if (this.props.minDate) {
                if (this.props.minDate.getFullYear() > year) {
                    validMin = false;
                } else if (this.props.minDate.getFullYear() === year) {
                    if (this.props.minDate.getMonth() > month) {
                        validMin = false;
                    } else if (this.props.minDate.getMonth() === month) {
                        if (this.props.minDate.getDate() > day) {
                            validMin = false;
                        }
                    }
                }
            }

            if (this.props.maxDate) {
                if (this.props.maxDate.getFullYear() < year) {
                    validMax = false;
                } else if (this.props.maxDate.getFullYear() === year) {
                    if (this.props.maxDate.getMonth() < month) {
                        validMax = false;
                    } else if (this.props.maxDate.getMonth() === month) {
                        if (this.props.maxDate.getDate() < day) {
                            validMax = false;
                        }
                    }
                }
            }

            if (this.props.disabledDates) {
                validDate = !this.isDateDisabled(day, month, year);
            }

            if (this.props.disabledDays) {
                validDay = !this.isDayDisabled(day, month, year);
            }

            if (this.props.selectOtherMonths === false && otherMonth) {
                validMonth = false;
            }

            return validMin && validMax && validDate && validDay && validMonth;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(dateMeta) {
            if (this.props.value) {
                if (this.isSingleSelection()) {
                    return this.isDateEquals(this.props.value, dateMeta);
                } else if (this.isMultipleSelection()) {
                    var selected = false;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.props.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var date = _step.value;

                            selected = this.isDateEquals(date, dateMeta);
                            if (selected) {
                                break;
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

                    return selected;
                } else if (this.isRangeSelection()) {
                    if (this.props.value[1]) return this.isDateEquals(this.props.value[0], dateMeta) || this.isDateEquals(this.props.value[1], dateMeta) || this.isDateBetween(this.props.value[0], this.props.value[1], dateMeta);else return this.isDateEquals(this.props.value[0], dateMeta);
                }
            } else {
                return false;
            }
        }
    }, {
        key: 'isMonthSelected',
        value: function isMonthSelected(month) {
            var viewDate = this.getViewDate();

            if (this.props.value) return this.props.value.getDate() === 1 && this.props.value.getMonth() === month && this.props.value.getFullYear() === viewDate.getFullYear();else return false;
        }
    }, {
        key: 'isDateEquals',
        value: function isDateEquals(value, dateMeta) {
            if (value && value instanceof Date) return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;else return false;
        }
    }, {
        key: 'isDateBetween',
        value: function isDateBetween(start, end, dateMeta) {
            var between = false;
            if (start && end) {
                var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
                return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
            }

            return between;
        }
    }, {
        key: 'isSingleSelection',
        value: function isSingleSelection() {
            return this.props.selectionMode === 'single';
        }
    }, {
        key: 'isRangeSelection',
        value: function isRangeSelection() {
            return this.props.selectionMode === 'range';
        }
    }, {
        key: 'isMultipleSelection',
        value: function isMultipleSelection() {
            return this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isToday',
        value: function isToday(today, day, month, year) {
            return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        }
    }, {
        key: 'isDateDisabled',
        value: function isDateDisabled(day, month, year) {
            if (this.props.disabledDates) {
                for (var i = 0; i < this.props.disabledDates.length; i++) {
                    var disabledDate = this.props.disabledDates[i];

                    if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'isDayDisabled',
        value: function isDayDisabled(day, month, year) {
            if (this.props.disabledDays) {
                var weekday = new Date(year, month, day);
                var weekdayNumber = weekday.getDay();

                return this.props.disabledDays.indexOf(weekdayNumber) !== -1;
            }

            return false;
        }
    }, {
        key: 'getValueToRender',
        value: function getValueToRender() {
            var formattedValue = '';

            if (this.props.value) {
                try {
                    if (this.isSingleSelection()) {
                        formattedValue = this.formatDateTime(this.props.value);
                    } else if (this.isMultipleSelection()) {
                        for (var i = 0; i < this.props.value.length; i++) {
                            var dateAsString = this.formatDateTime(this.props.value[i]);
                            formattedValue += dateAsString;
                            if (i !== this.props.value.length - 1) {
                                formattedValue += ', ';
                            }
                        }
                    } else if (this.isRangeSelection()) {
                        if (this.props.value && this.props.value.length) {
                            var startDate = this.props.value[0];
                            var endDate = this.props.value[1];

                            formattedValue = this.formatDateTime(startDate);
                            if (endDate) {
                                formattedValue += ' - ' + this.formatDateTime(endDate);
                            }
                        }
                    }
                } catch (err) {
                    formattedValue = this.props.value;
                }
            }

            return formattedValue;
        }
    }, {
        key: 'formatDateTime',
        value: function formatDateTime(date) {
            var formattedValue = null;
            if (date) {
                if (this.props.timeOnly) {
                    formattedValue = this.formatTime(date);
                } else {
                    formattedValue = this.formatDate(date, this.props.dateFormat);
                    if (this.props.showTime) {
                        formattedValue += ' ' + this.formatTime(date);
                    }
                }
            }

            return formattedValue;
        }
    }, {
        key: 'formatDate',
        value: function formatDate(date, format) {
            if (!date) {
                return '';
            }

            var iFormat = void 0;
            var lookAhead = function lookAhead(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
                formatNumber = function formatNumber(match, value, len) {
                var num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            },
                formatName = function formatName(match, value, shortNames, longNames) {
                return lookAhead(match) ? longNames[value] : shortNames[value];
            };
            var output = '';
            var literal = false;

            if (date) {
                for (iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                            literal = false;
                        } else {
                            output += format.charAt(iFormat);
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case 'd':
                                output += formatNumber('d', date.getDate(), 2);
                                break;
                            case 'D':
                                output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                                break;
                            case 'o':
                                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case 'm':
                                output += formatNumber('m', date.getMonth() + 1, 2);
                                break;
                            case 'M':
                                output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                                break;
                            case 'y':
                                output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100;
                                break;
                            case '@':
                                output += date.getTime();
                                break;
                            case '!':
                                output += date.getTime() * 10000 + this.ticksTo1970;
                                break;
                            case '\'':
                                if (lookAhead('\'')) {
                                    output += '\'';
                                } else {
                                    literal = true;
                                }
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                    }
                }
            }
            return output;
        }
    }, {
        key: 'formatTime',
        value: function formatTime(date) {
            if (!date) {
                return '';
            }

            var output = '';
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            if (this.props.hourFormat === '12' && hours > 11 && hours !== 12) {
                hours -= 12;
            }

            if (this.props.hourFormat === '12') {
                output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
            } else {
                output += hours < 10 ? '0' + hours : hours;
            }
            output += ':';
            output += minutes < 10 ? '0' + minutes : minutes;

            if (this.props.showSeconds) {
                output += ':';
                output += seconds < 10 ? '0' + seconds : seconds;
            }

            if (this.props.hourFormat === '12') {
                output += date.getHours() > 11 ? ' PM' : ' AM';
            }

            return output;
        }
    }, {
        key: 'parseValueFromString',
        value: function parseValueFromString(text) {
            if (!text || text.trim().length === 0) {
                return null;
            }

            var value = void 0;

            if (this.isSingleSelection()) {
                value = this.parseDateTime(text);
            } else if (this.isMultipleSelection()) {
                var tokens = text.split(',');
                value = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = tokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var token = _step2.value;

                        value.push(this.parseDateTime(token.trim()));
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
            } else if (this.isRangeSelection()) {
                var _tokens = text.split(' - ');
                value = [];
                for (var i = 0; i < _tokens.length; i++) {
                    value[i] = this.parseDateTime(_tokens[i].trim());
                }
            }

            return value;
        }
    }, {
        key: 'parseDateTime',
        value: function parseDateTime(text) {
            var date = void 0;
            var parts = text.split(' ');

            if (this.props.timeOnly) {
                date = new Date();
                this.populateTime(date, parts[0], parts[1]);
            } else {
                if (this.props.showTime) {
                    date = this.parseDate(parts[0], this.props.dateFormat);
                    this.populateTime(date, parts[1], parts[2]);
                } else {
                    date = this.parseDate(text, this.props.dateFormat);
                }
            }

            return date;
        }
    }, {
        key: 'parseTime',
        value: function parseTime(value) {
            var tokens = value.split(':');
            var validTokenLength = this.props.showSeconds ? 3 : 2;

            if (tokens.length !== validTokenLength) {
                throw new Error('Invalid time');
            }

            var h = parseInt(tokens[0], 10);
            var m = parseInt(tokens[1], 10);
            var s = this.props.showSeconds ? parseInt(tokens[2], 10) : null;

            if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || this.props.hourFormat === '12' && h > 12 || this.props.showSeconds && (isNaN(s) || s > 59)) {
                throw new Error('Invalid time');
            } else {
                if (this.props.hourFormat === '12' && h !== 12 && this.pm) {
                    h += 12;
                }

                return { hour: h, minute: m, second: s };
            }
        }

        // Ported from jquery-ui datepicker parseDate

    }, {
        key: 'parseDate',
        value: function parseDate(value, format) {
            if (format == null || value == null) {
                throw new Error('Invalid arguments');
            }

            value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" ? value.toString() : value + "";
            if (value === "") {
                return null;
            }

            var iFormat = void 0,
                dim = void 0,
                extra = void 0,
                iValue = 0,
                shortYearCutoff = typeof this.props.shortYearCutoff !== "string" ? this.props.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.props.shortYearCutoff, 10),
                year = -1,
                month = -1,
                day = -1,
                doy = -1,
                literal = false,
                date = void 0,
                lookAhead = function lookAhead(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
                getNumber = function getNumber(match) {
                var isDoubled = lookAhead(match),
                    size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2,
                    minSize = match === "y" ? size : 1,
                    digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
                    num = value.substring(iValue).match(digits);
                if (!num) {
                    throw new Error('Missing number at position ' + iValue);
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
                getName = function getName(match, shortNames, longNames) {
                var index = -1;
                var arr = lookAhead(match) ? longNames : shortNames;
                var names = [];

                for (var i = 0; i < arr.length; i++) {
                    names.push([i, arr[i]]);
                }
                names.sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });

                for (var _i = 0; _i < names.length; _i++) {
                    var name = names[_i][1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                        index = names[_i][0];
                        iValue += name.length;
                        break;
                    }
                }

                if (index !== -1) {
                    return index + 1;
                } else {
                    throw new Error('Unknown name at position ' + iValue);
                }
            },
                checkLiteral = function checkLiteral() {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw new Error('Unexpected literal at position ' + iValue);
                }
                iValue++;
            };

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", this.props.locale.dayNamesShort, this.props.locale.dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", this.props.locale.monthNamesShort, this.props.locale.monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "!":
                            date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }

            if (iValue < value.length) {
                extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw new Error('Extra/unparsed characters found in date: ' + extra);
                }
            }

            if (year === -1) {
                year = new Date().getFullYear();
            } else if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
            }

            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    dim = this.getDaysCountInMonth(year, month - 1);
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }

            date = this.daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw new Error('Invalid date'); // E.g. 31/02/00
            }

            return date;
        }
    }, {
        key: 'renderBackwardNavigator',
        value: function renderBackwardNavigator() {
            return _react2.default.createElement(
                'a',
                { className: 'ui-datepicker-prev ui-corner-all', onClick: this.navBackward },
                _react2.default.createElement('span', { className: 'pi pi-chevron-left' })
            );
        }
    }, {
        key: 'renderForwardNavigator',
        value: function renderForwardNavigator() {
            return _react2.default.createElement(
                'a',
                { className: 'ui-datepicker-next ui-corner-all', onClick: this.navForward },
                _react2.default.createElement('span', { className: 'pi pi-chevron-right' })
            );
        }
    }, {
        key: 'renderTitleMonthElement',
        value: function renderTitleMonthElement(month) {
            if (this.props.monthNavigator && this.props.view !== 'month') {
                var viewDate = this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
                var viewMonth = viewDate.getMonth();

                return _react2.default.createElement(
                    'select',
                    { className: 'ui-datepicker-month', onChange: this.onMonthDropdownChange, value: viewMonth },
                    this.props.locale.monthNames.map(function (month, index) {
                        return _react2.default.createElement(
                            'option',
                            { key: month, value: index },
                            month
                        );
                    })
                );
            } else {
                return _react2.default.createElement(
                    'span',
                    { className: 'ui-datepicker-month' },
                    this.props.locale.monthNames[month]
                );
            }
        }
    }, {
        key: 'renderTitleYearElement',
        value: function renderTitleYearElement(year) {
            if (this.props.yearNavigator) {
                var yearOptions = [];
                var years = this.props.yearRange.split(':');
                var yearStart = parseInt(years[0], 10);
                var yearEnd = parseInt(years[1], 10);

                for (var i = yearStart; i <= yearEnd; i++) {
                    yearOptions.push(i);
                }

                var viewDate = this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
                var viewYear = viewDate.getFullYear();

                return _react2.default.createElement(
                    'select',
                    { className: 'ui-datepicker-year', onChange: this.onYearDropdownChange, value: viewYear },
                    yearOptions.map(function (year) {
                        return _react2.default.createElement(
                            'option',
                            { key: year, value: year },
                            year
                        );
                    })
                );
            } else {
                return _react2.default.createElement(
                    'span',
                    { className: 'ui-datepicker-year' },
                    year
                );
            }
        }
    }, {
        key: 'renderTitle',
        value: function renderTitle(monthMetaData) {
            var month = this.renderTitleMonthElement(monthMetaData.month);
            var year = this.renderTitleYearElement(monthMetaData.year);

            return _react2.default.createElement(
                'div',
                { className: 'ui-datepicker-title' },
                month,
                year
            );
        }
    }, {
        key: 'renderDayNames',
        value: function renderDayNames(weekDays) {
            return weekDays.map(function (weekDay) {
                return _react2.default.createElement(
                    'th',
                    { key: weekDay, scope: 'col' },
                    _react2.default.createElement(
                        'span',
                        null,
                        weekDay
                    )
                );
            });
        }
    }, {
        key: 'renderDateCellContent',
        value: function renderDateCellContent(date, className) {
            var _this7 = this;

            var content = this.props.dateTemplate ? this.props.dateTemplate(date) : date.day;
            if (date.selectable) {
                return _react2.default.createElement(
                    'a',
                    { className: className, onClick: function onClick(e) {
                            return _this7.onDateSelect(e, date);
                        } },
                    content
                );
            } else {
                return _react2.default.createElement(
                    'span',
                    { className: className },
                    content
                );
            }
        }
    }, {
        key: 'renderWeek',
        value: function renderWeek(weekDates) {
            var _this8 = this;

            return weekDates.map(function (date) {
                var selected = _this8.isSelected(date);
                var cellClassName = (0, _classnames2.default)({ 'ui-datepicker-other-month': date.otherMonth, 'ui-datepicker-current-day': selected, 'ui-datepicker-today': date.today });
                var dateClassName = (0, _classnames2.default)('ui-state-default', { 'ui-state-active': selected, 'ui-state-highlight': date.today, 'ui-state-disabled': !date.selectable });
                var content = _this8.renderDateCellContent(date, dateClassName);

                return _react2.default.createElement(
                    'td',
                    { key: date.day, className: cellClassName },
                    content
                );
            });
        }
    }, {
        key: 'renderDates',
        value: function renderDates(monthMetaData) {
            var _this9 = this;

            return monthMetaData.dates.map(function (weekDates, index) {
                return _react2.default.createElement(
                    'tr',
                    { key: index },
                    _this9.renderWeek(weekDates)
                );
            });
        }
    }, {
        key: 'renderDateViewGrid',
        value: function renderDateViewGrid(monthMetaData, weekDays) {
            var dayNames = this.renderDayNames(weekDays);
            var dates = this.renderDates(monthMetaData);

            return _react2.default.createElement(
                'div',
                { className: 'ui-datepicker-calendar-container' },
                _react2.default.createElement(
                    'table',
                    { className: 'ui-datepicker-calendar' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            dayNames
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        dates
                    )
                )
            );
        }
    }, {
        key: 'renderMonth',
        value: function renderMonth(monthMetaData, index) {
            var weekDays = this.createWeekDays();
            var backwardNavigator = index === 0 ? this.renderBackwardNavigator() : null;
            var forwardNavigator = this.props.numberOfMonths === 1 || index === this.props.numberOfMonths - 1 ? this.renderForwardNavigator() : null;
            var title = this.renderTitle(monthMetaData);
            var dateViewGrid = this.renderDateViewGrid(monthMetaData, weekDays);

            return _react2.default.createElement(
                'div',
                { key: monthMetaData.month, className: 'ui-datepicker-group ui-widget-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all' },
                    backwardNavigator,
                    forwardNavigator,
                    title
                ),
                dateViewGrid
            );
        }
    }, {
        key: 'renderMonths',
        value: function renderMonths(monthsMetaData) {
            var _this10 = this;

            return monthsMetaData.map(function (monthMetaData, index) {
                return _this10.renderMonth(monthMetaData, index);
            });
        }
    }, {
        key: 'renderDateView',
        value: function renderDateView() {
            var viewDate = this.props.onViewDateChange ? this.props.viewDate : this.state.viewDate;
            var monthsMetaData = this.createMonths(viewDate.getMonth(), viewDate.getFullYear());
            var months = this.renderMonths(monthsMetaData);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                months
            );
        }
    }, {
        key: 'renderMonthViewMonth',
        value: function renderMonthViewMonth(index) {
            var _this11 = this;

            var className = (0, _classnames2.default)('ui-monthpicker-month', { 'ui-state-active': this.isMonthSelected(index) });
            var monthName = this.props.locale.monthNamesShort[index];

            return _react2.default.createElement(
                'a',
                { key: monthName, className: className, onClick: function onClick(event) {
                        return _this11.onMonthSelect(event, index);
                    } },
                monthName
            );
        }
    }, {
        key: 'renderMonthViewMonths',
        value: function renderMonthViewMonths() {
            var months = [];
            for (var i = 0; i <= 11; i++) {
                months.push(this.renderMonthViewMonth(i));
            }

            return months;
        }
    }, {
        key: 'renderMonthView',
        value: function renderMonthView() {
            var backwardNavigator = this.renderBackwardNavigator();
            var forwardNavigator = this.renderForwardNavigator();
            var yearElement = this.renderTitleYearElement(this.getViewDate().getFullYear());
            var months = this.renderMonthViewMonths();

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all' },
                    backwardNavigator,
                    forwardNavigator,
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-datepicker-title' },
                        yearElement
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-monthpicker' },
                    months
                )
            );
        }
    }, {
        key: 'renderDatePicker',
        value: function renderDatePicker() {
            if (!this.props.timeOnly) {
                if (this.props.view === 'date') {
                    return this.renderDateView();
                } else if (this.props.view === 'month') {
                    return this.renderMonthView();
                } else {
                    return null;
                }
            }
        }
    }, {
        key: 'renderHourPicker',
        value: function renderHourPicker() {
            var currentTime = this.props.value || this.getViewDate();
            var hour = currentTime.getHours();

            if (this.props.hourFormat === '12') {
                if (hour === 0) hour = 12;else if (hour > 11 && hour !== 12) hour = hour - 12;
            }

            var hourDisplay = hour < 10 ? '0' + hour : hour;

            return _react2.default.createElement(
                'div',
                { className: 'ui-hour-picker' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.incrementHour },
                    _react2.default.createElement('span', { className: 'pi pi-chevron-up' })
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    hourDisplay
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.decrementHour },
                    _react2.default.createElement('span', { className: 'pi pi-chevron-down' })
                )
            );
        }
    }, {
        key: 'renderMinutePicker',
        value: function renderMinutePicker() {
            var currentTime = this.props.value || this.getViewDate();
            var minute = currentTime.getMinutes();
            var minuteDisplay = minute < 10 ? '0' + minute : minute;

            return _react2.default.createElement(
                'div',
                { className: 'ui-minute-picker' },
                _react2.default.createElement(
                    'a',
                    { onClick: this.incrementMinute },
                    _react2.default.createElement('span', { className: 'pi pi-chevron-up' })
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    minuteDisplay
                ),
                _react2.default.createElement(
                    'a',
                    { onClick: this.decrementMinute },
                    _react2.default.createElement('span', { className: 'pi pi-chevron-down' })
                )
            );
        }
    }, {
        key: 'renderSecondPicker',
        value: function renderSecondPicker() {
            if (this.props.showSeconds) {
                var currentTime = this.props.value || this.getViewDate();
                var second = currentTime.getSeconds();
                var secondDisplay = second < 10 ? '0' + second : second;

                return _react2.default.createElement(
                    'div',
                    { className: 'ui-second-picker' },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.incrementSecond },
                        _react2.default.createElement('span', { className: 'pi pi-chevron-up' })
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        secondDisplay
                    ),
                    _react2.default.createElement(
                        'a',
                        { onClick: this.decrementSecond },
                        _react2.default.createElement('span', { className: 'pi pi-chevron-down' })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderAmPmPicker',
        value: function renderAmPmPicker() {
            if (this.props.hourFormat === '12') {
                var currentTime = this.props.value || this.getViewDate();
                var hour = currentTime.getHours();
                var display = hour > 11 ? 'PM' : 'AM';

                return _react2.default.createElement(
                    'div',
                    { className: 'ui-ampm-picker' },
                    _react2.default.createElement(
                        'a',
                        { onClick: this.toggleAmPm },
                        _react2.default.createElement('span', { className: 'pi pi-chevron-up' })
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        display
                    ),
                    _react2.default.createElement(
                        'a',
                        { onClick: this.toggleAmPm },
                        _react2.default.createElement('span', { className: 'pi pi-chevron-down' })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderSeparator',
        value: function renderSeparator() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-separator' },
                _react2.default.createElement(
                    'a',
                    null,
                    _react2.default.createElement('span', { className: 'pi pi-chevron-up' })
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    ':'
                ),
                _react2.default.createElement(
                    'a',
                    null,
                    _react2.default.createElement('span', { className: 'pi pi-chevron-down' })
                )
            );
        }
    }, {
        key: 'renderTimePicker',
        value: function renderTimePicker() {
            if (this.props.showTime || this.props.timeOnly) {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-timepicker ui-widget-header ui-corner-all' },
                    this.renderHourPicker(),
                    this.renderSeparator(),
                    this.renderMinutePicker(),
                    this.props.showSeconds && this.renderSeparator(),
                    this.renderSecondPicker(),
                    this.props.hourFormat === '12' && this.renderSeparator(),
                    this.renderAmPmPicker()
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderInputElement',
        value: function renderInputElement() {
            var _this12 = this;

            if (!this.props.inline) {
                var className = (0, _classnames2.default)('ui-inputtext ui-widget ui-state-default ui-corner-all', this.props.inputClassName);
                var value = this.getValueToRender();

                return _react2.default.createElement(_InputText.InputText, { ref: function ref(el) {
                        return _this12.inputElement = _reactDom2.default.findDOMNode(el);
                    }, id: this.props.inputId, name: this.props.name, value: value, type: 'text', className: className, style: this.props.inputStyle,
                    readOnly: this.props.readOnlyInput, disabled: this.props.disabled, tabIndex: this.props.tabIndex, required: this.props.required, autoComplete: 'off', placeholder: this.props.placeholder,
                    onInput: this.onInput, onClick: this.onInputClick, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.onInputKeyDown });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderButton',
        value: function renderButton() {
            if (this.props.showIcon) {
                return _react2.default.createElement(_Button.Button, { type: 'button', icon: this.props.icon, onClick: this.onButtonClick, tabIndex: '-1',
                    disabled: this.props.disabled, className: 'ui-datepicker-trigger ui-calendar-button' });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderButtonBar',
        value: function renderButtonBar() {
            if (this.props.showButtonBar) {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-datepicker-buttonbar ui-widget-header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'ui-g' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-g-6' },
                            _react2.default.createElement(_Button.Button, { type: 'button', label: this.props.locale.today, onClick: this.onTodayButtonClick, className: this.props.todayButtonClassName })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-g-6' },
                            _react2.default.createElement(_Button.Button, { type: 'button', label: this.props.locale.clear, onClick: this.onClearButtonClick, className: this.props.todayButtonClassName })
                        )
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this13 = this;

            var className = (0, _classnames2.default)('ui-calendar', this.props.className, {
                'ui-calendar-w-btn': this.props.showIcon,
                'ui-calendar-timeonly': this.props.timeOnly,
                'ui-inputwrapper-filled': this.props.value
            });
            var panelClassName = (0, _classnames2.default)('ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all', this.props.panelClassName, {
                'ui-datepicker-inline': this.props.inline,
                'ui-input-overlay': !this.props.inline,
                'ui-shadow': !this.props.inline,
                'ui-state-disabled': this.props.disabled,
                'ui-datepicker-timeonly': this.props.timeOnly,
                'ui-datepicker-multiple-month': this.props.numberOfMonths > 1,
                'ui-datepicker-monthpicker': this.props.view === 'month',
                'ui-datepicker-touch-ui': this.props.touchUI
            });
            var input = this.renderInputElement();
            var button = this.renderButton();
            var datePicker = this.renderDatePicker();
            var timePicker = this.renderTimePicker();
            var buttonBar = this.renderButtonBar();

            return _react2.default.createElement(
                'span',
                { ref: function ref(el) {
                        return _this13.container = el;
                    }, id: this.props.id, className: className, style: this.props.style },
                input,
                button,
                _react2.default.createElement(
                    _CalendarPanel.CalendarPanel,
                    { ref: function ref(el) {
                            return _this13.panel = _reactDom2.default.findDOMNode(el);
                        }, className: panelClassName, style: this.props.panelStyle,
                        appendTo: this.props.appendTo, onClick: this.onPanelClick },
                    datePicker,
                    timePicker,
                    buttonBar
                )
            );
        }
    }]);

    return Calendar;
}(_react.Component);

Calendar.defaultProps = {
    id: null,
    name: null,
    value: null,
    viewDate: null,
    style: null,
    className: null,
    inline: false,
    selectionMode: 'single',
    inputId: null,
    inputStyle: null,
    inputClassName: null,
    required: false,
    readOnlyInput: false,
    disabled: false,
    tabIndex: null,
    placeholder: null,
    showIcon: false,
    icon: 'pi pi-calendar',
    showOnFocus: true,
    numberOfMonths: 1,
    view: 'date',
    touchUI: false,
    showTime: false,
    timeOnly: false,
    showSeconds: false,
    hourFormat: '24',
    stepHour: 1,
    stepMinute: 1,
    stepSecond: 1,
    shortYearCutoff: '+10',
    hideOnDateTimeSelect: false,
    locale: {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: 'Today',
        clear: 'Clear'
    },
    dateFormat: 'mm/dd/yy',
    panelStyle: null,
    panelClassName: null,
    monthNavigator: false,
    yearNavigator: false,
    disabledDates: null,
    disabledDays: null,
    minDate: null,
    maxDate: null,
    maxDateCount: null,
    showOtherMonths: true,
    selectOtherMonths: false,
    showButtonBar: false,
    todayButtonClassName: 'ui-button-secondary',
    clearButtonStyleClass: 'ui-button-secondary',
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: null,
    dateTemplate: null,
    onFocus: null,
    onBlur: null,
    onInput: null,
    onSelect: null,
    onChange: null,
    onViewDateChange: null,
    onTodayButtonClick: null,
    onClearButtonClick: null
};
Calendar.propsTypes = {
    id: _propTypes2.default.string,
    name: _propTypes2.default.string,
    value: _propTypes2.default.any,
    viewDate: null,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    selectionMode: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    inputStyle: _propTypes2.default.object,
    inputClassName: _propTypes2.default.string,
    required: _propTypes2.default.bool,
    readOnlyInput: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    tabIndex: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    showIcon: _propTypes2.default.bool,
    icon: _propTypes2.default.string,
    showOnFocus: _propTypes2.default.bool,
    numberOfMonths: _propTypes2.default.number,
    view: _propTypes2.default.string,
    touchUI: _propTypes2.default.bool,
    showTime: _propTypes2.default.bool,
    timeOnly: _propTypes2.default.bool,
    showSeconds: _propTypes2.default.bool,
    hourFormat: _propTypes2.default.string,
    stepHour: _propTypes2.default.number,
    stepMinute: _propTypes2.default.number,
    stepSecond: _propTypes2.default.number,
    shortYearCutoff: _propTypes2.default.string,
    hideOnDateTimeSelect: _propTypes2.default.bool,
    locale: _propTypes2.default.string,
    dateFormat: _propTypes2.default.string,
    panelStyle: _propTypes2.default.object,
    panelClassName: _propTypes2.default.string,
    monthNavigator: _propTypes2.default.bool,
    yearNavigator: _propTypes2.default.bool,
    disabledDates: _propTypes2.default.array,
    disabledDays: _propTypes2.default.array,
    minDate: _propTypes2.default.date,
    maxDate: _propTypes2.default.date,
    maxDateCount: _propTypes2.default.number,
    showOtherMonths: _propTypes2.default.bool,
    selectOtherMonths: _propTypes2.default.bool,
    showButtonBar: _propTypes2.default.bool,
    todayButtonClassName: _propTypes2.default.string,
    clearButtonStyleClass: _propTypes2.default.string,
    autoZIndex: _propTypes2.default.bool,
    baseZIndex: _propTypes2.default.number,
    appendTo: _propTypes2.default.any,
    dateTemplate: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onInput: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onViewDateChange: _propTypes2.default.func,
    onTodayButtonClick: _propTypes2.default.func,
    onClearButtonClick: _propTypes2.default.func
};