'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license Licensed Materials - Property of IBM
 * @copyright IBM Cognos Products: BI Cloud (C) Copyright IBM Corp. 2017, 2018
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 * @file <strong>{@link CognosApi}</strong> class provides an client API framework for developing applications using IBM Cognos Analytics components <i>as a service</i>.
 * <strong>{@link CognosApi}</strong> class is the root level API. Once the <strong>{@link CognosApi}</strong> is <code>initialized</code>,
 * it provides an entry point to all service APIs where developers can have direct access to rich features of IBM Cognos Analytics components.<br>
 * Multiple instances of the <strong>{@link CognosApi}</strong> class can be instantiated if the client application wishes to access more than one services
 * (or the same service in multiple instances).<br>
 * <br>
 * As a prerequisite, <strong>{@link CognosApi}</strong> requires a <strong>Promise</strong> library.
 * Although most modern (ECMAScript 6 compatible) browsers do support <strong>Promise</strong>,
 * It is recommended to load a <strong>Promise</strong> library (ie. Bluebird) to extend the compatibility of the application.
 * <br><br>
 * @example
 * // Create an instance of the CognosApi by providing the IBM Cognos Analytics root URL
 * // and the DOM node of the container DIV
 * const cognosApi = new CognosApi({
 * 	cognosRootURL: 'http://localhost/bi/',
 * 	node: document.getElementById('containerDivId')
 * });
 *
 * // initialize the CognosApi in order to obtain the service APIs
 * cognosApi.initialize().then(() => {
 * 	cognosApi.dashboard.createNew();
 * 	...
 * });
 * ...
 *
 * // Ensure to close API at the end
 * cognosApi.close();
 */

/**
 * Default initialization timeout (30 seconds)
 */
var INIT_TIMEOUT = 30000;

/**
 * Constructor of the API client framework
 * @classdesc CognosApi is a client API framework class that builds a robust API for
 * developing applications using CognosAnalytics components as a service.
 * @constructor
 * @param {object} options.cognosRootURL CognosAnalytics root URL
 * @param {object} options.node DOM node that will become the container of the client
 * @param {object} options.sessionCode sessionCode of the obtained session
 * @param {object} options.initTimeout initialization timeout (ms). Default 30000 ms.
 * @class CognosApi
 * @example
 * const cognosApi = new CognosApi({
 * 	cognosRootURL: 'http://localhost/bi/',
 * 	node: document.getElementById('containerDivId'),
 *	sessionCode: 'CD1a2b34567b8c901234d5'
 * });
 */

var CognosApi = function () {
	function CognosApi(options) {
		_classCallCheck(this, CognosApi);

		console.log('node' +options.node);
		console.log('root URL' +options.cognosRootURL);
		if (!options || !options.node || !options.cognosRootURL) {
			throw new Error('Invalid options parameter passed into the constructor. Must provide both options.node and options.cognosRootURL in the options parameter.');
		}

		this._node = options.node;
		this._cognosURL = options.cognosRootURL;
		this._testURL = options.testURL;
		this._sessionCode = options.sessionCode;
		this._initTimeout = options.initTimeout || INIT_TIMEOUT;

		this._apiKey = CognosApi._createUID('capi');
		this._pendingRequests = {};
		this._eventCallbacks = {};
		this._eventReverseLookup = {};

		// regular expression validate the incoming message header
		this._message_regex = new RegExp('#capi#(.+)#' + this._apiKey + '#(.*)$', 'g');

		/**
   * Allows the caller to update the module definitions inside the dashboard specification
   * @memberof CognosApi
   * @function CognosApi#updateModuleDefinitions
   * @param {String} dashboardSpec The dashboard specification
   * @param {Function} callback A callback method which will be called with an array of module IDs.  This callback should return an array of objects containing the module ID (id) and the new module definition (module).
   * @return {Promise} Promise that gets resolved with the updated dashboard specification
   * @example
   * const cognosApi = new CognosApi({
   * 	cognosRootURL: 'http://localhost/bi/',
   * 	node: document.getElementById('containerDivId'),
   *	sessionCode: 'CD1a2b34567b8c901234d5'
   * });
   *
   * cognosApi.initialize().then(() => {
   * 	console.log(cognosApi.dashboard);
   * });
   *
   * cognosApi.updateModuleDefinitions(oldDashboardSpec, (moduleIds) => {
   * 	// Implement the callback that returns an array of the new module definitions.
   * 	// The array of module definitions corresponds to the array of moduleIds
   * 	return Promise.resolve(newModules);
   * }).then((newDashboardSpec) => {
   *	console.log(newDashboardSpec);
   * });
   */
		this.updateModuleDefinitions = CognosApi._updateModuleDefinitions.bind(this);
	}

	/**
  * Initializes the CognosApi client.
  * @memberof CognosApi
  * @function CognosApi#initialize
  * @return {Promise} Promise that gets resolved with a Api instance is constructed with available APIs
  * @example
  * const cognosApi = new CognosApi({
  * 	cognosRootURL: 'http://localhost/bi/',
  * 	node: document.getElementById('containerDivId'),
  *	sessionCode: 'CD1a2b34567b8c901234d5',
  * 	initTimeout: 5000
  * });
  * cognosApi.initialize().then(() => {
  * 	console.log(cognosApi.dashboard);
  * }, (error) => {
  * 	// Initialization took more than 5 seconds
  * 	console.log(error);
  * });
  */


	_createClass(CognosApi, [{
		key: 'initialize',
		value: function initialize() {
			var _this = this;

			if (!this._readyPromise) {
				this._readyPromise = new Promise(function (resolve, reject) {
					// setup the initialize timeout
					var timeout = setTimeout(_this._onInitTimeout.bind(_this, reject), _this._initTimeout);

					// create the API service container
					_this._initializeContainer();
					// initialize the API service
					_this._initializeService().then(function () {
						// clear the init timeout
						clearTimeout(timeout);

						// wait for the APIs to be initialized
						_this._sendMessage({
							apiId: _this._apiKey,
							actionId: CognosApi._createUID(CognosApi.APISERVICE_INIT),
							name: CognosApi.APISERVICE_INIT
						}, resolve, reject);
					});
				});
			}
			return this._readyPromise;
		}

		/**
   * Attach an {@link CognosApi#EVENTS event} handler function for the root CognosApi
   * @memberof CognosApi
   * @function CognosApi#on
   * @param {string} eventName - name of the event
   * @callback cb - event handler callback
   */

	}, {
		key: 'on',
		value: function on(eventName, cb) {
			if (!this._eventReverseLookup[cb]) {
				this._sendMessage({
					apiId: this._apiKey,
					actionId: CognosApi._createUID(CognosApi.APISERVICE_ON),
					name: CognosApi.APISERVICE_ON,
					parameters: Array.prototype.slice.call(arguments)
				}, cb);
			}
		}

		/**
   * Dettach an {@link CognosApi#EVENTS event} handler function for the root CognosApi
   * @memberof CognosApi
   * @function CognosApi#on
   * @param {string} eventName - name of the event
   * @callback cb - event handler callback
   */

	}, {
		key: 'off',
		value: function off(eventName, cb) {
			if (this._eventReverseLookup[cb]) {
				this._sendMessage({
					apiId: this._apiKey,
					actionId: this._eventReverseLookup[cb],
					name: CognosApi.APISERVICE_OFF,
					parameters: Array.prototype.slice.call(arguments)
				}, cb);
			}
		}

		/**
   * initialization timeout handler
   * @private
   */

	}, {
		key: '_onInitTimeout',
		value: function _onInitTimeout(reject) {
			this._cleanupContainer();
			reject(new Error('Initialization timeout. ' + this._initTimeout + 'ms'));
		}

		/**
   * Initialize the CAPI service container
   * @private
   */

	}, {
		key: '_initializeContainer',
		value: function _initializeContainer() {
			var container = document.createElement('iframe');

			container.src = this._buildSourceUrl();
			container.setAttribute('class', CognosApi.APISERVICE_CLASS);
			container.setAttribute('style', 'height:100%; width:100%;');
			container.setAttribute('frameBorder', '0');

			// append the container to the root node
			this._node.innerHTML = '';
			this._node.appendChild(container);

			// keep the iframe contentWindow as the messaging target
			this._target = container.contentWindow;
			this._targetOrigin = (/(https*:\/\/[^\/]+)/.exec(this._cognosURL) || [window.location.origin])[0];
		}

		/**
   * Closes the CognosApi client.
   * @memberof CognosApi
   * @function CognosApi#close
   * @return {Promise} Promise that gets resolved with a Api instance is successfully closed
   * @example
   * const cognosApi = new CognosApi({
   * 	cognosRootURL: 'http://localhost/bi/',
   * 	node: document.getElementById('containerDivId'),
   *	sessionCode: 'CD1a2b34567b8c901234d5'
   * });
   * ...
   * cognosApi.close();
   */

	}, {
		key: 'close',
		value: function close() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2._destroyService().then(function (obj) {
					// remove all injected apis
					_this2._cleanupApiService();
					// clean up the container node
					_this2._cleanupContainer();
					resolve(obj);
				}, function (err) {
					reject(err);
				});
			});
		}
	}, {
		key: '_buildSourceUrl',
		value: function _buildSourceUrl() {
			if (this._testURL) {
				return this._testURL;
			} else {
				var root = this._cognosURL + (this._cognosURL.indexOf('?') === -1 ? '?' : '&');
				var params = {
					'perspective': 'postMessageApiLoader',
					'apiKey': this._apiKey,
					'parentOrigin': window.location.origin,
					'sessionCode': this._sessionCode
				};
				return root + Object.keys(params).map(function (k) {
					return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
				}).join('&');
			}
		}

		/**
   * Clean up the injected apis
   * @private
   */

	}, {
		key: '_cleanupApiService',
		value: function _cleanupApiService() {
			var _this3 = this;

			// remove the message handler
			if (this._messageHandler) {
				window.removeEventListener('message', this._messageHandler, false);
			}

			// clean up all apis
			Object.keys(this).forEach(function (memberName) {
				if (memberName.indexOf('_') !== 0 && _typeof(_this3[memberName]) === 'object' && _this3[memberName].apiId) {
					delete _this3[memberName];
				}
			});

			this._pendingRequests = {};
			this._eventCallbacks = {};
			this._eventReverseLookup = {};
			this._messageHandler = null;
			this.apiId = null;
		}

		/**
   * Clean up the iframe container
   * @private
   */

	}, {
		key: '_cleanupContainer',
		value: function _cleanupContainer() {
			if (this._node) {
				var iframes = this._node.getElementsByClassName(CognosApi.APISERVICE_CLASS) || [];
				if (iframes.length === 1) {
					this._node.removeChild(iframes[0]);
				}
			}

			this._readyPromise = null;
			this._targetOrigin = null;
			this._target = null;
		}

		/**
   * Wait for the CognosApi service to initialize
   * @private
   * @return {Promise} Promise that gets resolved when the CognosApi service initialization is complete
   */

	}, {
		key: '_initializeService',
		value: function _initializeService() {
			var _this4 = this;

			this._messageHandler = this._receiveMessage.bind(this);
			window.addEventListener('message', this._messageHandler, false);

			return new Promise(function (resolve, reject) {
				_this4._registerResponseCallbacks(_this4._apiKey, resolve, reject);
			});
		}

		/**
   * Make a request to destroy the service
   * @private
   * @return {Promise} Promise that gets resolved when the service finishes terminate
   */

	}, {
		key: '_destroyService',
		value: function _destroyService() {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				_this5._sendMessage({
					apiId: _this5._apiKey,
					actionId: CognosApi._createUID(CognosApi.APISERVICE_DESTROY),
					name: CognosApi.APISERVICE_DESTROY
				}, resolve, reject);
			});
		}

		/**
   * Register the Promise callbacks that are created for each postMessage requests
   * @private
   * @param {string} identifier that uniquely identifies a single postMessage request
   * @param {function} callback function to be used when the postMessage response comes back successfully
   * @param {function} callback function to be used when the postMessage response comes back as a failure
   */

	}, {
		key: '_registerResponseCallbacks',
		value: function _registerResponseCallbacks(id, success, fail) {
			if (id && success) {
				this._pendingRequests[id] = {
					success: success,
					fail: fail
				};
			}
		}

		/**
   * Invoke the resolve callback for the request that has returned successfully
   * @private
   * @param {string} identifier that uniquely identifies a single postMessage request
   * @param {any} the resolved value
   */

	}, {
		key: '_resolveResponseCallbacks',
		value: function _resolveResponseCallbacks(id, obj) {
			if (id && this._pendingRequests[id]) {
				this._pendingRequests[id].success(obj);
				delete this._pendingRequests[id];
			}
		}

		/**
   * Invoke the reject callback for the request that has returned as a failure
   * @private
   * @param {string} identifier that uniquely identifies a single postMessage request
   * @param {object} the error object
   */

	}, {
		key: '_rejectResponseCallbacks',
		value: function _rejectResponseCallbacks(id, obj) {
			if (id && this._pendingRequests[id]) {
				this._pendingRequests[id].fail(obj);
				delete this._pendingRequests[id];
			}
		}

		/**
   * Register an event callback
   * @private
   */

	}, {
		key: '_registerEventCallbacks',
		value: function _registerEventCallbacks(id, callback) {
			if (id && callback) {
				this._eventCallbacks[id] = callback;
				this._eventReverseLookup[callback] = id;
			}
		}

		/**
   * Unregister an event callback
   * @private
   */

	}, {
		key: '_unregisterEventCallbacks',
		value: function _unregisterEventCallbacks(id, callback) {
			if (id && callback && this._eventReverseLookup[callback] === id) {
				delete this._eventCallbacks[id];
				delete this._eventReverseLookup[callback];
			}
		}

		/**
   * Handle event by invoking the corresponding callback
   * @private
   */

	}, {
		key: '_handleEventCallbacks',
		value: function _handleEventCallbacks(id, obj) {
			if (id && typeof this._eventCallbacks[id] === 'function') {
				this._eventCallbacks[id].call(this._eventCallbacks[id], obj);
			}
		}

		/**
   * Invoke a postMessage to the target window.
   * Callbacks are registered which gets invoked when the corresponding response is returned
   * @private
   * @param {object} Payload object to be post to the target window
   * @param {function} Resolve callback function
   * @param {function} Reject callback function
   */

	}, {
		key: '_sendMessage',
		value: function _sendMessage(obj, success, fail) {
			if (this._target) {
				if (obj.name === 'on') {
					this._registerEventCallbacks(obj.actionId, success);
				} else if (obj.name === 'off') {
					this._unregisterEventCallbacks(obj.actionId, success);
				} else {
					this._registerResponseCallbacks(obj.actionId, success, fail);
				}
				this._target.postMessage(this._createMessage(obj), this._targetOrigin);
			}
		}

		/**
   * Message event handler to handle messages posted by the inner iframe
   * @private
   * @param {object} Event object
   */

	}, {
		key: '_receiveMessage',
		value: function _receiveMessage(event) {
			// Only accept message from the iframe we know about
			if (event.origin !== this._targetOrigin) {
				return;
			}
			var obj = this._parseMessage(event.data);
			if (obj !== null) {
				if (!obj.status || obj.status === 'success') {
					switch (obj.type) {
						case 'ready':
							this._resolveResponseCallbacks(this._apiKey);
							break;
						case 'api':
							// expand the api response by either injecting to the API to the root or creating an new API object
							var resolvedAPI = obj.actionId.indexOf(CognosApi.APISERVICE_INIT) === 0 ? this : {};
							this._injectAPI(resolvedAPI, obj.payload);
							this._resolveResponseCallbacks(obj.actionId, resolvedAPI);
							break;
						case 'event':
							this._handleEventCallbacks(obj.actionId, obj.payload);
							break;
						default:
							// simply resolve with the raw payload
							this._resolveResponseCallbacks(obj.actionId, obj.payload);
					}
				} else {
					this._rejectResponseCallbacks(obj.actionId, obj.payload);
				}
			}
		}

		/**
   * Create a message with the CAPI header prepended to the message
   * @private
   * @param {object} Payload object
   */

	}, {
		key: '_createMessage',
		value: function _createMessage(obj) {
			return CognosApi.APIHEADER + CognosApi.APIHEADER_DELIMITER + this._apiKey + CognosApi.APIHEADER_DELIMITER + JSON.stringify(obj);
		}

		/**
   * Parse the response message.
   * @private
   * @return Response payload object
   */

	}, {
		key: '_parseMessage',
		value: function _parseMessage(data) {
			var result = this._message_regex.exec(data);
			if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result !== null) {
				this._message_regex.lastIndex = 0;
				return JSON.parse(result[2]);
			}
			return null;
		}

		/**
   * Inject the API spec returned by the API service to the client API object
   * @private
   * @param {object} client API object
   * @param {object} API spec that describes an API
   */

	}, {
		key: '_injectAPI',
		value: function _injectAPI(api, apiSpec) {
			var _this6 = this;

			Object.keys(apiSpec).forEach(function (memberName) {
				if (memberName === 'apiId') {
					api[memberName] = apiSpec[memberName];
				} else if (apiSpec[memberName].apiId) {
					// new nested API needs to built recursively
					api[memberName] = {};
					_this6._injectAPI(api[memberName], apiSpec[memberName]);
				} else {
					if (apiSpec[memberName].type === 'enum') {
						api[memberName] = apiSpec[memberName].values;
					} else if (apiSpec[memberName].type === 'method') {
						api[memberName] = _this6._getAPIMethod(memberName, apiSpec.apiId);
					}
				}
			});
		}

		/**
   * Generate an API proxy method to be injected to the client API object
   * @private
   * @param {string} Method name
   * @param {string} Identifier of the API
   */

	}, {
		key: '_getAPIMethod',
		value: function _getAPIMethod(methodName, apiId) {
			var _this7 = this;

			// predefined event on/off methods
			if (methodName === 'on') {
				return function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					var params = Array.prototype.slice.call(args);
					var callback = params[1];
					_this7._sendMessage({
						apiId: apiId,
						actionId: CognosApi._createUID(methodName),
						name: methodName,
						parameters: params
					}, callback, callback);
				};
			} else if (methodName === 'off') {
				return function () {
					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}

					var params = Array.prototype.slice.call(args);
					var callback = params[1];
					_this7._sendMessage({
						apiId: apiId,
						actionId: _this7._eventReverseLookup[callback],
						name: methodName,
						parameters: params
					}, callback, callback);
				};
			}

			// general api methods
			return function () {
				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				var params = Array.prototype.slice.call(args);
				return new Promise(function (resolve, reject) {
					_this7._sendMessage({
						apiId: apiId,
						actionId: CognosApi._createUID(methodName),
						name: methodName,
						parameters: params
					}, resolve, reject);
				});
			};
		}

		/**
   * Static private method to to update the modules in the dashboard spec.
   * @static
   * @private
  */

	}], [{
		key: '_updateModuleDefinitions',
		value: function _updateModuleDefinitions(dashboardSpec, callback) {
			if (!dashboardSpec || !dashboardSpec.dataSources || !dashboardSpec.dataSources.sources) {
				return Promise.resolve(dashboardSpec);
			}

			var moduleClientIds = [];
			dashboardSpec.dataSources.sources.forEach(function (source) {
				if (source.clientId) {
					moduleClientIds.push(source.clientId);
				}
			});

			if (moduleClientIds.length === 0) {
				return Promise.resolve(dashboardSpec);
			}

			var result = callback(moduleClientIds);
			if (result && typeof result.then === 'function') {
				return result.then(function (newModules) {
					return CognosApi._doModuleUpdate(dashboardSpec, newModules);
				});
			}

			return Promise.resolve(CognosApi._doModuleUpdate(dashboardSpec, result));
		}

		/**
   * Static private method to to update the modules in the dashboard spec.
   * @static
   * @private
   */

	}, {
		key: '_doModuleUpdate',
		value: function _doModuleUpdate(dashboardSpec, newModules) {
			var cloneDashboardSpec = JSON.parse(JSON.stringify(dashboardSpec));
			if (newModules) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = cloneDashboardSpec.dataSources.sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var source = _step.value;
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = newModules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var newModule = _step2.value;

								if (newModule.id === source.clientId) {
									if (newModule.module) {
										source.module = newModule.module;
									}
									if (newModule.name) {
										source.name = newModule.name;
									}
									if (newModule.newId && newModule.id !== newModule.newId) {
										source.clientId = newModule.newId;
									}
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

				;
			}

			return cloneDashboardSpec;
		}

		/**
  * Static private method to create an unique identifier prepended with a give name
   * @static
  * @private
  */

	}, {
		key: '_createUID',
		value: function _createUID(prepend) {
			var uid = Date.now().valueOf();
			CognosApi.__uid = CognosApi.__uid === uid ? uid + 1 : uid;
			return prepend + '_' + CognosApi.__uid.toString(16);
		}
	}]);

	return CognosApi;
}();

/**
 * Constant for event names used for on and off
 * @public
 * @readonly
 * @enum {string}
 * @memberof CognosApi
 */


CognosApi.EVENTS = {
	/** Request error events.<br>
 Allows users to receive HTTP request error events. */
	REQUEST_ERROR: 'api:error:request'
};

/**
 * Constant for Api message header and initialization
 * @private
 */
CognosApi.APIHEADER_DELIMITER = '#';
CognosApi.APIHEADER_MARKER = 'capi';
CognosApi.APIHEADER_VERSION = 'v1';
CognosApi.APIHEADER = CognosApi.APIHEADER_DELIMITER + CognosApi.APIHEADER_MARKER + CognosApi.APIHEADER_DELIMITER + CognosApi.APIHEADER_VERSION;

CognosApi.APISERVICE_INIT = 'getAppApi';
CognosApi.APISERVICE_ON = 'on';
CognosApi.APISERVICE_OFF = 'off';
CognosApi.APISERVICE_DESTROY = 'destroyAppApi';
CognosApi.APISERVICE_CLASS = 'capi-service';
//# sourceMappingURL=CognosApi.js.map
