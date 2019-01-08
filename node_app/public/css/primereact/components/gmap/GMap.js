'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global google*/


var GMap = exports.GMap = function (_Component) {
    _inherits(GMap, _Component);

    function GMap() {
        _classCallCheck(this, GMap);

        return _possibleConstructorReturn(this, (GMap.__proto__ || Object.getPrototypeOf(GMap)).apply(this, arguments));
    }

    _createClass(GMap, [{
        key: 'initMap',
        value: function initMap() {
            this.map = new google.maps.Map(this.container, this.props.options);

            if (this.props.onMapReady) {
                this.props.onMapReady({
                    map: this.map
                });
            }

            this.initOverlays(this.props.overlays);

            this.bindMapEvent('click', this.props.onMapClick);
            this.bindMapEvent('dragend', this.props.onMapDragEnd);
            this.bindMapEvent('zoom_changed', this.props.onZoomChanged);
        }
    }, {
        key: 'initOverlays',
        value: function initOverlays(overlays) {
            if (overlays) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = overlays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var overlay = _step.value;

                        overlay.setMap(this.map);
                        this.bindOverlayEvents(overlay);
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
            }
        }
    }, {
        key: 'bindOverlayEvents',
        value: function bindOverlayEvents(overlay) {
            var _this2 = this;

            overlay.addListener('click', function (event) {
                if (_this2.props.onOverlayClick) {
                    _this2.props.onOverlayClick({
                        originalEvent: event,
                        overlay: overlay,
                        map: _this2.map
                    });
                }
            });

            if (overlay.getDraggable()) {
                this.bindDragEvents(overlay);
            }
        }
    }, {
        key: 'bindDragEvents',
        value: function bindDragEvents(overlay) {
            this.bindDragEvent(overlay, 'dragstart', this.props.onOverlayDragStart);
            this.bindDragEvent(overlay, 'drag', this.props.onOverlayDrag);
            this.bindDragEvent(overlay, 'dragend', this.props.onOverlayDragEnd);
        }
    }, {
        key: 'bindMapEvent',
        value: function bindMapEvent(eventName, callback) {
            this.map.addListener(eventName, function (event) {
                if (callback) {
                    callback(event);
                }
            });
        }
    }, {
        key: 'bindDragEvent',
        value: function bindDragEvent(overlay, eventName, callback) {
            var _this3 = this;

            overlay.addListener(eventName, function (event) {
                if (callback) {
                    callback({
                        originalEvent: event,
                        overlay: overlay,
                        map: _this3.map
                    });
                }
            });
        }
    }, {
        key: 'getMap',
        value: function getMap() {
            return this.map;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.overlays !== this.props.overlays) {
                if (prevProps.overlays) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = prevProps.overlays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var overlay = _step2.value;

                            google.maps.event.clearInstanceListeners(overlay);
                            overlay.setMap(null);
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
                }

                this.initOverlays(this.props.overlays);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initMap();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement('div', { ref: function ref(el) {
                    return _this4.container = el;
                }, style: this.props.style, className: this.props.className });
        }
    }]);

    return GMap;
}(_react.Component);

GMap.defaultProps = {
    options: null,
    overlays: null,
    style: null,
    className: null,
    onMapReady: null,
    onMapClick: null,
    onMapDragEnd: null,
    onZoomChanged: null,
    onOverlayDragStart: null,
    onOverlayDrag: null,
    onOverlayDragEnd: null,
    onOverlayClick: null
};
GMap.propTypes = {
    options: _propTypes2.default.object,
    overlays: _propTypes2.default.array,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    onMapReady: _propTypes2.default.func,
    onMapClick: _propTypes2.default.func,
    onMapDragEnd: _propTypes2.default.func,
    onZoomChanged: _propTypes2.default.func,
    onOverlayDragStart: _propTypes2.default.func,
    onOverlayDrag: _propTypes2.default.func,
    onOverlayDragEnd: _propTypes2.default.func,
    onOverlayClick: _propTypes2.default.func
};