'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataTable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paginator = require('../paginator/Paginator');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _ScrollableView = require('./ScrollableView');

var _TableBody = require('./TableBody');

var _TableFooter = require('./TableFooter');

var _TableHeader = require('./TableHeader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = exports.DataTable = function (_Component) {
    _inherits(DataTable, _Component);

    function DataTable(props) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

        var state = {};

        if (!_this.props.onPage) {
            state.first = props.first;
            state.rows = props.rows;
        }

        if (!_this.props.onSort) {
            state.sortField = props.sortField;
            state.sortOrder = props.sortOrder;
            state.multiSortMeta = props.multiSortMeta;
        }

        if (!_this.props.onFilter) {
            state.filters = props.filters;
        }

        if (Object.keys(state).length) {
            _this.state = state;
        }

        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onSort = _this.onSort.bind(_this);
        _this.onFilter = _this.onFilter.bind(_this);
        _this.onColumnResizeStart = _this.onColumnResizeStart.bind(_this);
        _this.onHeaderCheckboxClick = _this.onHeaderCheckboxClick.bind(_this);
        _this.onColumnDragStart = _this.onColumnDragStart.bind(_this);
        _this.onColumnDragOver = _this.onColumnDragOver.bind(_this);
        _this.onColumnDragLeave = _this.onColumnDragLeave.bind(_this);
        _this.onColumnDrop = _this.onColumnDrop.bind(_this);
        _this.onVirtualScroll = _this.onVirtualScroll.bind(_this);
        _this.frozenSelectionMode = null;
        return _this;
    }

    _createClass(DataTable, [{
        key: 'getFirst',
        value: function getFirst() {
            return this.props.onPage ? this.props.first : this.state.first;
        }
    }, {
        key: 'getRows',
        value: function getRows() {
            return this.props.onPage ? this.props.rows : this.state.rows;
        }
    }, {
        key: 'getSortField',
        value: function getSortField() {
            return this.props.onSort ? this.props.sortField : this.state.sortField;
        }
    }, {
        key: 'getSortOrder',
        value: function getSortOrder() {
            return this.props.onSort ? this.props.sortOrder : this.state.sortOrder;
        }
    }, {
        key: 'getMultiSortMeta',
        value: function getMultiSortMeta() {
            return this.props.onSort ? this.props.multiSortMeta : this.state.multiSortMeta;
        }
    }, {
        key: 'getFilters',
        value: function getFilters() {
            return this.props.onFilter ? this.props.filters : this.state.filters;
        }
    }, {
        key: 'onPageChange',
        value: function onPageChange(event) {
            if (this.props.onPage) this.props.onPage(event);else this.setState({ first: event.first, rows: event.rows });
        }
    }, {
        key: 'createPaginator',
        value: function createPaginator(position, totalRecords, data) {
            var className = 'ui-paginator-' + position;

            return _react2.default.createElement(_Paginator.Paginator, { first: this.getFirst(), rows: this.getRows(), pageLinkSize: this.props.pageLinkSize, className: className, onPageChange: this.onPageChange, template: this.props.paginatorTemplate,
                totalRecords: totalRecords, rowsPerPageOptions: this.props.rowsPerPageOptions, leftContent: this.props.paginatorLeft, rightContent: this.props.paginatorRight });
        }
    }, {
        key: 'onSort',
        value: function onSort(event) {
            var sortField = event.sortField;
            var sortOrder = this.getSortField() === event.sortField ? this.getSortOrder() * -1 : 1;
            var multiSortMeta = void 0;

            this.columnSortable = event.sortable;
            this.columnSortFunction = event.sortFunction;

            if (this.props.sortMode === 'multiple') {
                var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                multiSortMeta = this.getMultiSortMeta();
                if (!multiSortMeta || !metaKey) {
                    multiSortMeta = [];
                }

                this.addSortMeta({ field: sortField, order: sortOrder }, multiSortMeta);
            }

            if (this.props.onSort) {
                this.props.onSort({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    multiSortMeta: multiSortMeta
                });
            } else {
                this.setState({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    first: 0,
                    multiSortMeta: multiSortMeta
                });
            }
        }
    }, {
        key: 'addSortMeta',
        value: function addSortMeta(meta, multiSortMeta) {
            var index = -1;
            for (var i = 0; i < multiSortMeta.length; i++) {
                if (multiSortMeta[i].field === meta.field) {
                    index = i;
                    break;
                }
            }

            if (index >= 0) multiSortMeta[index] = meta;else multiSortMeta.push(meta);
        }
    }, {
        key: 'sortSingle',
        value: function sortSingle(data) {
            var _this2 = this;

            var value = [].concat(_toConsumableArray(data));

            if (this.columnSortable && this.columnSortable === 'custom' && this.columnSortFunction) {
                value = this.columnSortFunction({
                    field: this.getSortField(),
                    order: this.getSortOrder()
                });
            } else {
                value.sort(function (data1, data2) {
                    var sortField = _this2.getSortField();
                    var value1 = _ObjectUtils2.default.resolveFieldData(data1, sortField);
                    var value2 = _ObjectUtils2.default.resolveFieldData(data2, sortField);
                    var result = null;

                    if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                    return _this2.getSortOrder() * result;
                });
            }

            return value;
        }
    }, {
        key: 'sortMultiple',
        value: function sortMultiple(data) {
            var _this3 = this;

            var value = [].concat(_toConsumableArray(data));
            value.sort(function (data1, data2) {
                return _this3.multisortField(data1, data2, _this3.getMultiSortMeta(), 0);
            });

            return value;
        }
    }, {
        key: 'multisortField',
        value: function multisortField(data1, data2, multiSortMeta, index) {
            var value1 = _ObjectUtils2.default.resolveFieldData(data1, multiSortMeta[index].field);
            var value2 = _ObjectUtils2.default.resolveFieldData(data2, multiSortMeta[index].field);
            var result = null;

            if (typeof value1 === 'string' || value1 instanceof String) {
                if (value1.localeCompare && value1 !== value2) {
                    return multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true });
                }
            } else {
                result = value1 < value2 ? -1 : 1;
            }

            if (value1 === value2) {
                return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
            }

            return multiSortMeta[index].order * result;
        }
    }, {
        key: 'filter',
        value: function filter(value, field, mode) {
            this.onFilter({
                value: value,
                field: field,
                matchMode: mode
            });
        }
    }, {
        key: 'onFilter',
        value: function onFilter(event) {
            var currentFilters = this.getFilters();
            var newFilters = currentFilters ? _extends({}, currentFilters) : {};

            if (!this.isFilterBlank(event.value)) newFilters[event.field] = { value: event.value, matchMode: event.matchMode };else if (newFilters[event.field]) delete newFilters[event.field];

            if (this.props.onFilter) {
                this.props.onFilter({
                    filters: newFilters
                });
            } else {
                this.setState({
                    first: 0,
                    filters: newFilters
                });
            }
        }
    }, {
        key: 'isFilterBlank',
        value: function isFilterBlank(filter) {
            if (filter !== null && filter !== undefined) {
                if (typeof filter === 'string' && filter.trim().length === 0 || filter instanceof Array && filter.length === 0) return true;else return false;
            }
            return true;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.container.style.width = this.getContainerWidth();
        }
    }, {
        key: 'hasFooter',
        value: function hasFooter() {
            if (this.props.children) {
                if (this.props.footerColumnGroup) {
                    return true;
                } else {
                    if (this.props.children instanceof Array) {
                        for (var i = 0; i < this.props.children.length; i++) {
                            if (this.props.children[i].footer) {
                                return true;
                            }
                        }
                    } else {
                        return this.props.children.footer !== null;
                    }
                }
            } else {
                return false;
            }
        }
    }, {
        key: 'onColumnResizeStart',
        value: function onColumnResizeStart(event) {
            var containerLeft = _DomHandler2.default.getOffset(this.container).left;
            this.resizeColumn = event.columnEl;
            this.columnResizing = true;
            this.lastResizerHelperX = event.originalEvent.pageX - containerLeft + this.container.scrollLeft;

            this.bindColumnResizeEvents();
        }
    }, {
        key: 'onColumnResize',
        value: function onColumnResize(event) {
            var containerLeft = _DomHandler2.default.getOffset(this.container).left;
            _DomHandler2.default.addClass(this.container, 'ui-unselectable-text');
            this.resizerHelper.style.height = this.container.offsetHeight + 'px';
            this.resizerHelper.style.top = 0 + 'px';
            this.resizerHelper.style.left = event.pageX - containerLeft + this.container.scrollLeft + 'px';

            this.resizerHelper.style.display = 'block';
        }
    }, {
        key: 'onColumnResizeEnd',
        value: function onColumnResizeEnd(event) {
            var delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
            var columnWidth = this.resizeColumn.offsetWidth;
            var newColumnWidth = columnWidth + delta;
            var minWidth = this.resizeColumn.style.minWidth || 15;

            if (columnWidth + delta > parseInt(minWidth, 10)) {
                if (this.props.columnResizeMode === 'fit') {
                    var nextColumn = this.resizeColumn.nextElementSibling;
                    var nextColumnWidth = nextColumn.offsetWidth - delta;

                    if (newColumnWidth > 15 && nextColumnWidth > 15) {
                        this.resizeColumn.style.width = newColumnWidth + 'px';
                        if (nextColumn) {
                            nextColumn.style.width = nextColumnWidth + 'px';
                        }

                        if (this.props.scrollable) {
                            var colGroup = _DomHandler2.default.findSingle(this.container, 'colgroup.ui-datatable-scrollable-colgroup');
                            var resizeColumnIndex = _DomHandler2.default.index(this.resizeColumn);
                            colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';

                            if (nextColumn) {
                                colGroup.children[resizeColumnIndex + 1].style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                } else if (this.props.columnResizeMode === 'expand') {
                    var table = _DomHandler2.default.findSingle(this.container, 'tbody.ui-datatable-data').parentElement;
                    table.style.width = table.offsetWidth + delta + 'px';
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    var containerWidth = table.style.width;

                    if (this.props.scrollable) {
                        _DomHandler2.default.findSingle(this.container, '.ui-datatable-scrollable-header-box').children[0].style.width = containerWidth;
                        var _colGroup = _DomHandler2.default.findSingle(this.container, 'colgroup.ui-datatable-scrollable-colgroup');
                        var _resizeColumnIndex = _DomHandler2.default.index(this.resizeColumn);
                        _colGroup.children[_resizeColumnIndex].style.width = newColumnWidth + 'px';
                    } else {
                        this.container.style.width = containerWidth;
                    }
                }

                if (this.props.onColumnResizeEnd) {
                    this.props.onColumnResizeEnd({
                        element: this.resizeColumn,
                        delta: delta
                    });
                }
            }

            this.resizerHelper.style.display = 'none';
            this.resizeColumn = null;
            _DomHandler2.default.removeClass(this.container, 'ui-unselectable-text');

            this.unbindColumnResizeEvents();
        }
    }, {
        key: 'bindColumnResizeEvents',
        value: function bindColumnResizeEvents() {
            var _this4 = this;

            this.documentColumnResizeListener = document.addEventListener('mousemove', function (event) {
                if (_this4.columnResizing) {
                    _this4.onColumnResize(event);
                }
            });

            this.documentColumnResizeEndListener = document.addEventListener('mouseup', function (event) {
                if (_this4.columnResizing) {
                    _this4.columnResizing = false;
                    _this4.onColumnResizeEnd(event);
                }
            });
        }
    }, {
        key: 'unbindColumnResizeEvents',
        value: function unbindColumnResizeEvents() {
            document.removeEventListener('document', this.documentColumnResizeListener);
            document.removeEventListener('document', this.documentColumnResizeEndListener);
        }
    }, {
        key: 'findParentHeader',
        value: function findParentHeader(element) {
            if (element.nodeName === 'TH') {
                return element;
            } else {
                var parent = element.parentElement;
                while (parent.nodeName !== 'TH') {
                    parent = parent.parentElement;
                    if (!parent) break;
                }
                return parent;
            }
        }
    }, {
        key: 'onColumnDragStart',
        value: function onColumnDragStart(event) {
            if (this.columnResizing) {
                event.preventDefault();
                return;
            }

            this.iconWidth = _DomHandler2.default.getHiddenElementOuterWidth(this.reorderIndicatorUp);
            this.iconHeight = _DomHandler2.default.getHiddenElementOuterHeight(this.reorderIndicatorUp);

            this.draggedColumn = this.findParentHeader(event.target);
            event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
        }
    }, {
        key: 'onColumnDragOver',
        value: function onColumnDragOver(event) {
            var dropHeader = this.findParentHeader(event.target);
            if (this.props.reorderableColumns && this.draggedColumn && dropHeader) {
                event.preventDefault();
                var containerOffset = _DomHandler2.default.getOffset(this.container);
                var dropHeaderOffset = _DomHandler2.default.getOffset(dropHeader);

                if (this.draggedColumn !== dropHeader) {
                    var targetLeft = dropHeaderOffset.left - containerOffset.left;
                    //let targetTop =  containerOffset.top - dropHeaderOffset.top;
                    var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                    this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
                    this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                    if (event.pageX > columnCenter) {
                        this.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
                        this.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
                        this.dropPosition = 1;
                    } else {
                        this.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
                        this.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
                        this.dropPosition = -1;
                    }

                    this.reorderIndicatorUp.style.display = 'block';
                    this.reorderIndicatorDown.style.display = 'block';
                } else {
                    event.dataTransfer.dropEffect = 'none';
                }
            }
        }
    }, {
        key: 'onColumnDragLeave',
        value: function onColumnDragLeave(event) {
            if (this.props.reorderableColumns && this.draggedColumn) {
                event.preventDefault();
                this.reorderIndicatorUp.style.display = 'none';
                this.reorderIndicatorDown.style.display = 'none';
            }
        }
    }, {
        key: 'onColumnDrop',
        value: function onColumnDrop(event) {
            event.preventDefault();
            if (this.draggedColumn) {
                var dragIndex = _DomHandler2.default.index(this.draggedColumn);
                var dropIndex = _DomHandler2.default.index(this.findParentHeader(event.target));
                var allowDrop = dragIndex !== dropIndex;
                if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
                    allowDrop = false;
                }

                if (allowDrop) {
                    var columns = this.state.columnOrder ? this.getColumns() : _react2.default.Children.toArray(this.props.children);
                    _ObjectUtils2.default.reorderArray(columns, dragIndex, dropIndex);
                    var columnOrder = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var column = _step.value;

                            columnOrder.push(column.props.columnKey || column.props.field);
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

                    this.setState({
                        columnOrder: columnOrder
                    });

                    if (this.props.onColReorder) {
                        this.props.onColReorder({
                            dragIndex: dragIndex,
                            dropIndex: dropIndex,
                            columns: columns
                        });
                    }
                }

                this.reorderIndicatorUp.style.display = 'none';
                this.reorderIndicatorDown.style.display = 'none';
                this.draggedColumn.draggable = false;
                this.draggedColumn = null;
                this.dropPosition = null;
            }
        }
    }, {
        key: 'onVirtualScroll',
        value: function onVirtualScroll(event) {
            var _this5 = this;

            if (this.virtualScrollTimer) {
                clearTimeout(this.virtualScrollTimer);
            }

            this.virtualScrollTimer = setTimeout(function () {
                if (_this5.props.onVirtualScroll) {
                    _this5.props.onVirtualScroll({
                        first: (event.page - 1) * _this5.props.rows,
                        rows: _this5.props.rows
                    });
                }
            }, this.props.virtualScrollDelay);
        }
    }, {
        key: 'exportCSV',
        value: function exportCSV() {
            var _this6 = this;

            var data = this.processData();
            var csv = '\uFEFF';
            var columns = _react2.default.Children.toArray(this.props.children);

            //headers
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].props.field) {
                    csv += '"' + (columns[i].props.header || columns[i].props.field) + '"';

                    if (i < columns.length - 1) {
                        csv += this.props.csvSeparator;
                    }
                }
            }

            //body        
            data.forEach(function (record, i) {
                csv += '\n';
                for (var _i = 0; _i < columns.length; _i++) {
                    if (columns[_i].props.field) {
                        csv += '"' + _ObjectUtils2.default.resolveFieldData(record, columns[_i].props.field) + '"';

                        if (_i < columns.length - 1) {
                            csv += _this6.props.csvSeparator;
                        }
                    }
                }
            });

            var blob = new Blob([csv], {
                type: 'text/csv;charset=utf-8;'
            });

            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, this.props.exportFilename + '.csv');
            } else {
                var link = document.createElement("a");
                link.style.display = 'none';
                document.body.appendChild(link);
                if (link.download !== undefined) {
                    link.setAttribute('href', URL.createObjectURL(blob));
                    link.setAttribute('download', this.props.exportFilename + '.csv');
                    link.click();
                } else {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                    window.open(encodeURI(csv));
                }
                document.body.removeChild(link);
            }
        }
    }, {
        key: 'onHeaderCheckboxClick',
        value: function onHeaderCheckboxClick(event) {
            var selection = void 0;

            if (!event.checked) selection = [].concat(_toConsumableArray(this.props.value));else selection = [];

            this.props.onSelectionChange({ originalEvent: event, data: selection });
        }
    }, {
        key: 'filterLocal',
        value: function filterLocal(value) {
            var filteredValue = [];
            var filters = this.getFilters();
            var columns = _react2.default.Children.toArray(this.props.children);

            for (var i = 0; i < value.length; i++) {
                var localMatch = true;
                var globalMatch = false;

                for (var j = 0; j < columns.length; j++) {
                    var col = columns[j];
                    var filterMeta = filters ? filters[col.props.field] : null;

                    //local
                    if (filterMeta) {
                        var filterValue = filterMeta.value;
                        var filterField = col.props.field;
                        var filterMatchMode = filterMeta.matchMode || col.props.filterMatchMode;
                        var dataFieldValue = _ObjectUtils2.default.resolveFieldData(value[i], filterField);
                        var filterConstraint = filterMatchMode === 'custom' ? col.props.filterFunction : _ObjectUtils2.default.filterConstraints[filterMatchMode];

                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }

                        if (!localMatch) {
                            break;
                        }
                    }

                    //global
                    if (this.props.globalFilter && !globalMatch) {
                        globalMatch = _ObjectUtils2.default.filterConstraints['contains'](_ObjectUtils2.default.resolveFieldData(value[i], col.props.field), this.props.globalFilter);
                    }
                }

                var matches = localMatch;
                if (this.props.globalFilter) {
                    matches = localMatch && globalMatch;
                }

                if (matches) {
                    filteredValue.push(value[i]);
                }
            }

            if (filteredValue.length === value.length) {
                filteredValue = value;
            }

            return filteredValue;
        }
    }, {
        key: 'processData',
        value: function processData() {
            var data = this.props.value;
            if (!this.props.lazy) {
                if (data && data.length) {
                    if (this.getSortField() || this.getMultiSortMeta()) {
                        if (this.props.sortMode === 'single') data = this.sortSingle(data);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data);
                    }

                    if (this.getFilters() || this.props.globalFilter) {
                        data = this.filterLocal(data);
                    }
                }
            }

            return data;
        }
    }, {
        key: 'isAllSelected',
        value: function isAllSelected() {
            return this.props.selection && this.props.value && this.props.selection.length === this.props.value.length;
        }
    }, {
        key: 'getFrozenColumns',
        value: function getFrozenColumns(columns) {
            var frozenColumns = null;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var col = _step2.value;

                    if (col.props.frozen) {
                        frozenColumns = frozenColumns || [];
                        frozenColumns.push(col);
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

            return frozenColumns;
        }
    }, {
        key: 'getContainerWidth',
        value: function getContainerWidth() {
            if (this.props.scrollable) {
                if (this.props.scrollWidth) {
                    return this.props.scrollWidth;
                } else if (this.props.frozenWidth && this.props.unfrozenWidth) {
                    return parseFloat(this.props.frozenWidth) + parseFloat(this.props.unfrozenWidth) + 'px';
                }
            } else {
                return this.props.style ? this.props.style.width : null;
            }
        }
    }, {
        key: 'getScrollableColumns',
        value: function getScrollableColumns(columns) {
            var scrollableColumns = null;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var col = _step3.value;

                    if (!col.props.frozen) {
                        scrollableColumns = scrollableColumns || [];
                        scrollableColumns.push(col);
                    }
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

            return scrollableColumns;
        }
    }, {
        key: 'getFrozenSelectionModeInColumn',
        value: function getFrozenSelectionModeInColumn(columns) {
            if (Array.isArray(columns)) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var col = _step4.value;

                        if (col.props.selectionMode) return col.props.selectionMode;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }

            return null;
        }
    }, {
        key: 'createTableHeader',
        value: function createTableHeader(columns, columnGroup) {
            return _react2.default.createElement(
                _TableHeader.TableHeader,
                { onSort: this.onSort, sortField: this.getSortField(), sortOrder: this.getSortOrder(), multiSortMeta: this.getMultiSortMeta(), columnGroup: columnGroup,
                    resizableColumns: this.props.resizableColumns, onColumnResizeStart: this.onColumnResizeStart, onFilter: this.onFilter,
                    onHeaderCheckboxClick: this.onHeaderCheckboxClick, headerCheckboxSelected: this.isAllSelected(),
                    reorderableColumns: this.props.reorderableColumns, onColumnDragStart: this.onColumnDragStart, filters: this.getFilters(),
                    onColumnDragOver: this.onColumnDragOver, onColumnDragLeave: this.onColumnDragLeave, onColumnDrop: this.onColumnDrop },
                columns
            );
        }
    }, {
        key: 'createTableBody',
        value: function createTableBody(value, columns) {
            return _react2.default.createElement(
                _TableBody.TableBody,
                { value: value, first: this.getFirst(), rows: this.getRows(), lazy: this.props.lazy, dataKey: this.props.dataKey, compareSelectionBy: this.props.compareSelectionBy,
                    selectionMode: this.props.selectionMode, selection: this.props.selection, metaKeySelection: this.props.metaKeySelection, frozenSelectionMode: this.frozenSelectionMode,
                    onSelectionChange: this.props.onSelectionChange, onRowClick: this.props.onRowClick, onRowDoubleClick: this.props.onRowDoubleClick, onRowSelect: this.props.onRowSelect, onRowUnselect: this.props.onRowUnselect,
                    expandedRows: this.props.expandedRows, onRowToggle: this.props.onRowToggle, rowExpansionTemplate: this.props.rowExpansionTemplate,
                    onRowExpand: this.props.onRowExpand, responsive: this.props.responsive, emptyMessage: this.props.emptyMessage,
                    contextMenu: this.props.contextMenu, onContextMenuSelect: this.props.onContextMenuSelect, virtualScroll: this.props.virtualScroll,
                    groupField: this.props.groupField, rowGroupMode: this.props.rowGroupMode, rowGroupHeaderTemplate: this.props.rowGroupHeaderTemplate, rowGroupFooterTemplate: this.props.rowGroupFooterTemplate,
                    sortField: this.getSortField(), rowClassName: this.props.rowClassName, onRowReorder: this.props.onRowReorder },
                columns
            );
        }
    }, {
        key: 'createTableFooter',
        value: function createTableFooter(columns, columnGroup) {
            if (this.hasFooter()) return _react2.default.createElement(
                _TableFooter.TableFooter,
                { columnGroup: columnGroup },
                columns
            );else return null;
        }
    }, {
        key: 'createScrollableView',
        value: function createScrollableView(value, columns, frozen, headerColumnGroup, footerColumnGroup, totalRecords) {
            return _react2.default.createElement(_ScrollableView.ScrollableView, { columns: columns, header: this.createTableHeader(columns, headerColumnGroup), body: this.createTableBody(value, columns), frozenBody: this.props.frozenValue ? this.createTableBody(this.props.frozenValue, columns) : null, footer: this.createTableFooter(columns, footerColumnGroup),
                scrollHeight: this.props.scrollHeight, frozen: frozen, frozenWidth: this.props.frozenWidth, unfrozenWidth: this.props.unfrozenWidth,
                virtualScroll: this.props.virtualScroll, rows: this.props.rows, totalRecords: totalRecords,
                onVirtualScroll: this.onVirtualScroll });
        }
    }, {
        key: 'getColumns',
        value: function getColumns() {
            var columns = _react2.default.Children.toArray(this.props.children);

            if (this.props.reorderableColumns && this.state.columnOrder) {
                var orderedColumns = [];
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.state.columnOrder[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var columnKey = _step5.value;

                        orderedColumns.push(this.findColumnByKey(columns, columnKey));
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return orderedColumns;
            } else {
                return columns;
            }
        }
    }, {
        key: 'findColumnByKey',
        value: function findColumnByKey(columns, key) {
            if (columns && columns.length) {
                for (var i = 0; i < columns.length; i++) {
                    var child = columns[i];
                    if (child.props.columnKey === key || child.props.field === key) {
                        return child;
                    }
                }
            }

            return null;
        }
    }, {
        key: 'getTotalRecords',
        value: function getTotalRecords(data) {
            return this.props.lazy ? this.props.totalRecords : data ? data.length : 0;
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            var iconClassName = (0, _classnames2.default)('ui-datatable-loading-icon pi-spin', this.props.loadingIcon);

            return _react2.default.createElement(
                'div',
                { className: 'ui-datatable-loader' },
                _react2.default.createElement('div', { className: 'ui-datatable-loader-overlay ui-widget-overlay' }),
                _react2.default.createElement(
                    'div',
                    { className: 'ui-datatable-loader-content' },
                    _react2.default.createElement('i', { className: iconClassName })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var value = this.processData();
            var columns = this.getColumns();
            var totalRecords = this.getTotalRecords(value);
            var className = (0, _classnames2.default)('ui-datatable ui-widget', { 'ui-datatable-reflow': this.props.responsive, 'ui-datatable-resizable': this.props.resizableColumns,
                'ui-datatable-scrollable': this.props.scrollable, 'ui-datatable-virtual-scrollable': this.props.virtualScroll,
                'ui-datatable-auto-layout': this.props.autoLayout }, this.props.className);
            var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
            var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
            var headerFacet = this.props.header && _react2.default.createElement(
                'div',
                { className: 'ui-datatable-header ui-widget-header' },
                this.props.header
            );
            var footerFacet = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'ui-datatable-footer ui-widget-header' },
                this.props.footer
            );
            var resizeHelper = this.props.resizableColumns && _react2.default.createElement('div', { ref: function ref(el) {
                    _this7.resizerHelper = el;
                }, className: 'ui-column-resizer-helper ui-state-highlight', style: { display: 'none' } });
            var tableContent = null;
            var resizeIndicatorUp = this.props.reorderableColumns && _react2.default.createElement('span', { ref: function ref(el) {
                    _this7.reorderIndicatorUp = el;
                }, className: 'pi pi-arrow-down ui-datatable-reorder-indicator-up', style: { position: 'absolute', display: 'none' } });
            var resizeIndicatorDown = this.props.reorderableColumns && _react2.default.createElement('span', { ref: function ref(el) {
                    _this7.reorderIndicatorDown = el;
                }, className: 'pi pi-arrow-up ui-datatable-reorder-indicator-down', style: { position: 'absolute', display: 'none' } });
            var loader = void 0;

            if (this.props.loading) {
                loader = this.renderLoader();
            }

            if (this.props.scrollable) {
                this.frozenSelectionMode = this.frozenSelectionMode || this.getFrozenSelectionModeInColumn(columns);
                var frozenColumns = this.getFrozenColumns(columns);
                var scrollableColumns = frozenColumns ? this.getScrollableColumns(columns) : columns;
                var frozenView = void 0,
                    scrollableView = void 0;
                if (frozenColumns) {
                    frozenView = this.createScrollableView(value, frozenColumns, true, this.props.frozenHeaderColumnGroup, this.props.frozenFooterColumnGroup, totalRecords);
                }

                scrollableView = this.createScrollableView(value, scrollableColumns, false, this.props.headerColumnGroup, this.props.footerColumnGroup, totalRecords);

                tableContent = _react2.default.createElement(
                    'div',
                    { className: 'ui-datatable-scrollable-wrapper' },
                    frozenView,
                    scrollableView
                );
            } else {
                var tableHeader = this.createTableHeader(columns, this.props.headerColumnGroup);
                var tableBody = this.createTableBody(value, columns);
                var tableFooter = this.createTableFooter(columns, this.props.footerColumnGroup);

                tableContent = _react2.default.createElement(
                    'div',
                    { className: 'ui-datatable-tablewrapper' },
                    _react2.default.createElement(
                        'table',
                        { style: this.props.tableStyle, className: this.props.tableClassName, ref: function ref(el) {
                                _this7.table = el;
                            } },
                        tableHeader,
                        tableFooter,
                        tableBody
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        _this7.container = el;
                    } },
                loader,
                headerFacet,
                paginatorTop,
                tableContent,
                paginatorBottom,
                footerFacet,
                resizeHelper,
                resizeIndicatorUp,
                resizeIndicatorDown
            );
        }
    }]);

    return DataTable;
}(_react.Component);

DataTable.defaultProps = {
    id: null,
    value: null,
    header: null,
    footer: null,
    style: null,
    className: null,
    tableStyle: null,
    tableClassName: null,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    paginatorLeft: null,
    paginatorRight: null,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    first: null,
    rows: null,
    totalRecords: null,
    lazy: false,
    sortField: null,
    sortOrder: null,
    multiSortMeta: null,
    sortMode: 'single',
    emptyMessage: "No records found",
    selectionMode: null,
    selection: null,
    onSelectionChange: null,
    compareSelectionBy: 'deepEquals',
    dataKey: null,
    metaKeySelection: true,
    headerColumnGroup: null,
    footerColumnGroup: null,
    frozenHeaderColumnGroup: null,
    frozenFooterColumnGroup: null,
    rowExpansionTemplate: null,
    expandedRows: null,
    onRowToggle: null,
    responsive: false,
    resizableColumns: false,
    columnResizeMode: 'fit',
    reorderableColumns: false,
    filters: null,
    globalFilter: null,
    scrollable: false,
    scrollHeight: null,
    virtualScroll: false,
    virtualScrollDelay: 500,
    frozenWidth: null,
    unfrozenWidth: null,
    frozenValue: null,
    csvSeparator: ',',
    exportFilename: 'download',
    contextMenu: null,
    rowGroupMode: null,
    autoLayout: false,
    rowClassName: null,
    rowGroupHeaderTemplate: null,
    rowGroupFooterTemplate: null,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    onColumnResizeEnd: null,
    onSort: null,
    onPage: null,
    onFilter: null,
    onVirtualScroll: null,
    onRowClick: null,
    onRowDoubleClick: null,
    onRowSelect: null,
    onRowUnselect: null,
    onRowExpand: null,
    onRowCollapse: null,
    onContextMenuSelect: null,
    onColReorder: null,
    onRowReorder: null
};
DataTable.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.array,
    header: _propTypes2.default.any,
    footer: _propTypes2.default.any,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    tableStyle: _propTypes2.default.any,
    tableClassName: _propTypes2.default.string,
    paginator: _propTypes2.default.bool,
    paginatorPosition: _propTypes2.default.string,
    alwaysShowPaginator: _propTypes2.default.bool,
    paginatorTemplate: _propTypes2.default.string,
    paginatorLeft: _propTypes2.default.any,
    paginatorRight: _propTypes2.default.any,
    pageLinkSize: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array,
    first: _propTypes2.default.number,
    rows: _propTypes2.default.number,
    totalRecords: _propTypes2.default.number,
    lazy: _propTypes2.default.bool,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    multiSortMeta: _propTypes2.default.array,
    sortMode: _propTypes2.default.string,
    emptyMessage: _propTypes2.default.string,
    selectionMode: _propTypes2.default.string,
    selection: _propTypes2.default.any,
    onSelectionChange: _propTypes2.default.func,
    compareSelectionBy: _propTypes2.default.string,
    dataKey: _propTypes2.default.string,
    metaKeySelection: _propTypes2.default.bool,
    headerColumnGroup: _propTypes2.default.element,
    footerColumnGroup: _propTypes2.default.element,
    frozenHeaderColumnGroup: _propTypes2.default.element,
    frozenFooterColumnGroup: _propTypes2.default.element,
    rowExpansionTemplate: _propTypes2.default.func,
    expandedRows: _propTypes2.default.array,
    onRowToggle: _propTypes2.default.func,
    responsive: _propTypes2.default.bool,
    resizableColumns: _propTypes2.default.bool,
    columnResizeMode: _propTypes2.default.string,
    reorderableColumns: _propTypes2.default.bool,
    filters: _propTypes2.default.object,
    globalFilter: _propTypes2.default.any,
    scrollable: _propTypes2.default.bool,
    scrollHeight: _propTypes2.default.string,
    virtualScroll: _propTypes2.default.bool,
    virtualScrollDelay: _propTypes2.default.number,
    frozenWidth: _propTypes2.default.string,
    unfrozenWidth: _propTypes2.default.string,
    frozenValue: _propTypes2.default.array,
    csvSeparator: _propTypes2.default.string,
    exportFilename: _propTypes2.default.string,
    contextMenu: _propTypes2.default.any,
    rowGroupMode: _propTypes2.default.string,
    autoLayout: _propTypes2.default.bool,
    rowClassName: _propTypes2.default.func,
    rowGroupHeaderTemplate: _propTypes2.default.func,
    rowGroupFooterTemplate: _propTypes2.default.func,
    loading: _propTypes2.default.bool,
    loadingIcon: _propTypes2.default.string,
    onColumnResizeEnd: _propTypes2.default.func,
    onSort: _propTypes2.default.func,
    onPage: _propTypes2.default.func,
    onFilter: _propTypes2.default.func,
    onVirtualScroll: _propTypes2.default.func,
    onRowClick: _propTypes2.default.func,
    onRowDoubleClick: _propTypes2.default.func,
    onRowSelect: _propTypes2.default.func,
    onRowUnselect: _propTypes2.default.func,
    onRowExpand: _propTypes2.default.func,
    onRowCollapse: _propTypes2.default.func,
    onContextMenuSelect: _propTypes2.default.func,
    onColReorder: _propTypes2.default.func,
    onRowReorder: _propTypes2.default.func
};