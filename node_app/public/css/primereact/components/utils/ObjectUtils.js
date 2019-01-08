'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectUtils = function () {
    function ObjectUtils() {
        _classCallCheck(this, ObjectUtils);
    }

    _createClass(ObjectUtils, null, [{
        key: 'equals',
        value: function equals(obj1, obj2, field) {
            if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);else return this.equalsByValue(obj1, obj2);
        }
    }, {
        key: 'equalsByValue',
        value: function equalsByValue(obj1, obj2) {
            if (obj1 === null && obj2 === null) {
                return true;
            }
            if (obj1 === null || obj2 === null) {
                return false;
            }

            if (obj1 === obj2) {
                delete obj1._$visited;
                return true;
            }

            if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object' && (typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object') {
                obj1._$visited = true;
                for (var p in obj1) {
                    if (p === "_$visited") continue;
                    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                        return false;
                    }

                    switch (_typeof(obj1[p])) {
                        case 'object':
                            if (obj1[p] && obj1[p]._$visited || !this.equals(obj1[p], obj2[p])) return false;
                            break;

                        case 'function':
                            if (typeof obj2[p] === 'undefined' || p !== 'compare' && obj1[p].toString() !== obj2[p].toString()) return false;
                            break;

                        default:
                            if (obj1[p] !== obj2[p]) return false;
                            break;
                    }
                }

                for (var pp in obj2) {
                    if (typeof obj1[pp] === 'undefined') return false;
                }

                delete obj1._$visited;
                return true;
            }

            return false;
        }
    }, {
        key: 'resolveFieldData',
        value: function resolveFieldData(data, field) {
            if (data && field) {
                if (field.indexOf('.') === -1) {
                    return data[field];
                } else {
                    var fields = field.split('.');
                    var value = data;
                    for (var i = 0, len = fields.length; i < len; ++i) {
                        value = value[fields[i]];
                    }
                    return value;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'filter',
        value: function filter(value, fields, filterValue) {
            var filteredItems = [];

            if (value) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var field = _step2.value;

                                if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                                    filteredItems.push(item);
                                    break;
                                }
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

            return filteredItems;
        }
    }, {
        key: 'reorderArray',
        value: function reorderArray(value, from, to) {
            var target = void 0;
            if (value && from !== to) {
                if (to >= value.length) {
                    target = to - value.length;
                    while (target-- + 1) {
                        value.push(undefined);
                    }
                }
                value.splice(to, 0, value.splice(from, 1)[0]);
            }
        }
    }, {
        key: 'findIndexInList',
        value: function findIndexInList(value, list) {
            var index = -1;

            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] === value) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }]);

    return ObjectUtils;
}();

ObjectUtils.filterConstraints = {
    startsWith: function startsWith(value, filter) {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        var filterValue = filter.toLowerCase();
        return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
    },
    contains: function contains(value, filter) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    },
    endsWith: function endsWith(value, filter) {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        var filterValue = filter.toString().toLowerCase();
        return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
    },
    equals: function equals(value, filter) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value.toString().toLowerCase() === filter.toString().toLowerCase();
    },
    notEquals: function notEquals(value, filter) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
            return false;
        }

        if (value === undefined || value === null) {
            return true;
        }

        return value.toString().toLowerCase() !== filter.toString().toLowerCase();
    },
    in: function _in(value, filter) {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        for (var i = 0; i < filter.length; i++) {
            if (filter[i] === value) return true;
        }

        return false;
    }
};
exports.default = ObjectUtils;