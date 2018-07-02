/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js_hmac_sha256__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto_js_hmac_sha256___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto_js_hmac_sha256__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_base64__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_base64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js_enc_base64__);
/** * omd 让你写的javascript代码兼容所有的运行环境，符合amd, cmd, commonjs规范，在原生环境中也能运行
 * 例如，你写了一堆代码，在没有模块化加载的时候可以使用，在模块化框架下也可以使用
 */



!function(spacename,dependencies,window,factory){
    // 当define被定义的情况下
    if(typeof define == 'function' && (__webpack_require__(1) != undefined || define.cmd != undefined)) {
        console.log('define',typeof define)
        console.log('define1',__webpack_require__(1))
        console.log('define2',define.cmd)
        define(dependencies,function() {
            return factory(window);
        });
    }
    // 当define没有被定义的情况下
    else {
        var ex = factory(window);
        // CommonJS NodeJS
        if(typeof module !== 'undefined' && typeof exports === 'object') {
            // 由于exports被定义，函数中的exports已经是全局变量，因此，这里就不进行任何操作
            module.exports = ex;
        }
        // 原生Javascript，接口将被作为一个window的子对象
        else {
            window[spacename] = ex;
        }
    }
}('coinchat',['dsbridge'],window,function(window,isGlobalMode = true){
    // var $ = require('jquery');
    var dsBridge=__webpack_require__(9);

    /**
     * 如何上手呢？
     * 1. 修改上面的'spaceName'为当前文件的名称（不要后缀）【在非模块化环境中使用其接口会加载到window中，例如你可以使用类似window.spaceName.function()来调用某个接口函数】
     * 2. 修改上面['jquery']的内容为依赖包列表【在模块化环境中可能使用】
     * 3. window就是window，有你需要的window属性
     * 4. 加载$，如果你的项目中依赖了jQuery或Zepto，则选择上面注释中的一种，使$可用
     * 5. 接口，通过return返回接口
     */

    function getHashByData(data) {

        var api_key = "v1ymtpfgaautzakupen4xocrnnvnxwjz";
        var api_secret = '9cltjeoremroutzowcucjcl9y1j5tj4j';

        // console.log('要签名的数据是',data);
        var myObj = data,
          keys = [],
          k, i, len;

        for (k in myObj) {
          if (myObj.hasOwnProperty(k)) {
            keys.push(k);
          }
        }

        keys.sort();
        len = keys.length;

        var str = '';
        for (i = 0; i < len; i++) {
          k = keys[i];
          str += k + '=' + myObj[k];
        }

        var sign =  __WEBPACK_IMPORTED_MODULE_0_crypto_js_hmac_sha256___default()(str,api_secret).toString();
        console.log('签名字符串是',str);
        console.log('签名后是',sign);
        return sign;
    }

    // var d = {user_id: 1, group_id: 2, timestamp: 1234567890, nonce: "some_random_character", api_key: "foo"};
    // getHashByData(d);


    function invoke(sdkName, args, handler) {

        console.log('invoke-start',sdkName,args,handler)

        var sign = getHashByData(args);
        args['sign'] = sign;

        //Call asynchronously
        dsBridge.call("invoke",{'sdkname':sdkName,'args':args}, function (res) {
            console.log('调用成功');
            alert(res);
            execute(sdkName, res, handler)
        })

        console.log('新方法调用invoke_finished');

        // global.CoinchatJSBridge ? CoinchatJSBridge.invoke(sdkName, 'this is params', callback) : logEventInfo(sdkName, handler);
    }

    function on(sdkName, listener, handler) {
        global.CoinchatJSBridge ? CoinchatJSBridge.on(sdkName, function(res) {
            handler && handler.trigger && handler.trigger(res);
            execute(sdkName, res, listener);
        }) : (handler ? logEventInfo(sdkName, handler) : logEventInfo(sdkName, listener));
    }

    function addVerifyInfo(data) {
        data = data || {};
        data.appId = settings.appId;
        data.verifyAppId = settings.appId;
        data.verifySignType = "sha1";
        data.verifyTimestamp = settings.timestamp + "";
        data.verifyNonceStr = settings.nonceStr;
        data.verifySignature = settings.signature;

        return data;
    }

    function execute(sdkName, res, handler) {
        "openEnterpriseChat" == sdkName && (res.errCode = res.err_code);
        delete res.err_code, delete res.err_desc, delete res.err_detail;
        var errMsg = res.errMsg;
        errMsg || (errMsg = res.err_msg, delete res.err_msg, errMsg = formatErrMsg(sdkName, errMsg), res.errMsg = errMsg);
        handler = handler || {};
        handler._complete && (handler._complete(res), delete handler._complete);
        errMsg = res.errMsg || "";
        settings.debug && !handler.isInnerInvoke && alert(JSON.stringify(res));
        var separatorIndex = errMsg.indexOf(":"),
            status = errMsg.substring(separatorIndex + 1);
        switch (status) {
            case "ok":
                handler.success && handler.success(res);
                break;
            case "cancel":
                handler.cancel && handler.cancel(res);
                break;
            default:
                handler.fail && handler.fail(res)
        }
        handler.complete && handler.complete(res)
    }

    function formatErrMsg(sdkName, errMsg) {
        var name = sdkName,
            event = sdkNameEventMap[sdkName];
        event && (name = event);
        var status = "ok";
        if (errMsg) {
            var separatorIndex = errMsg.indexOf(":");
            status = errMsg.substring(separatorIndex + 1);
            "confirm" == status && (status = "ok");
            "failed" == status && (status = "fail"); - 1 != status.indexOf("failed_") && (status = status.substring(7)); - 1 != status.indexOf("fail_") && (status = status.substring(5));
            status = status.replace(/_/g, " ");
            status = status.toLowerCase();
            ("access denied" == status || "no permission to execute" == status) && (status = "permission denied");
            "config" == sdkName && "function not exist" == status && (status = "ok");
            "" == status && (status = "fail");
        }
        return errMsg = name + ":" + status;
    }

    function eventArrToSdkNameArr(jsApiList) {
        if (jsApiList) {
            for (var i = 0, length = jsApiList.length; length > i; ++i) {
                var event = jsApiList[i],
                    sdkName = eventSdkNameMap[event];
                sdkName && (jsApiList[i] = sdkName);
            }
            return jsApiList;
        }
    }

    function logEventInfo(name, data) {
        console.log('"' + name + '",', data || "")
        return ;
        if (!(!settings.debug || data && data.isInnerInvoke)) {
            var event = sdkNameEventMap[name];
            event && (name = event);
            data && data._complete && delete data._complete;
            console.log('"' + name + '",', data || "")
        }
    }

    function report(data) {
        if (!(isNormalPC || isCoinchatDeBugger || settings.debug || "6.0.2" > coinchatVersion || info.systemType < 0)) {
            var img = new Image;
            info.appId = settings.appId;
            info.initTime = loadTimeInfo.initEndTime - loadTimeInfo.initStartTime;
            info.preVerifyTime = loadTimeInfo.preVerifyEndTime - loadTimeInfo.preVerifyStartTime;
            jCoinchat.getNetworkType({
                isInnerInvoke: true,
                success: function(res) {
                    info.networkType = res.networkType;
                    var reportUrl = "https://open.coinchat.qq.com/sdk/report?v=" + info.version + "&o=" + info.isPreVerifyOk + "&s=" + info.systemType + "&c=" + info.clientVersion + "&a=" + info.appId + "&n=" + info.networkType + "&i=" + info.initTime + "&p=" + info.preVerifyTime + "&u=" + info.url;
                    img.src = reportUrl;
                }
            });
        }
    }

    function getTime() {
        return new Date().getTime();
    }

    function startup(callback) {
        isCoinchat && (global.CoinchatJSBridge ? callback() : document.addEventListener && document.addEventListener("CoinchatJSBridgeReady", callback, false))
    }

    function enableBetaApi() {
        jCoinchat.invoke || (jCoinchat.invoke = function(sdkName, args, handler) {
            global.CoinchatJSBridge && CoinchatJSBridge.invoke(sdkName, addVerifyInfo(args), handler)
        }, jCoinchat.on = function(sdkName, args) {
            global.CoinchatJSBridge && CoinchatJSBridge.on(sdkName, args)
        });
    }

    if (!global.jCoinchat) {


        console.log('init_coinchat',global.document,global);

        var eventSdkNameMap = {
                config: "preVerifyJSAPI",
                // onMenuShareTimeline: "menu:share:timeline",
                // onMenuShareAppMessage: "menu:share:appmessage",
                // onMenuShareQQ: "menu:share:qq",
                // onMenuShareWeibo: "menu:share:weiboApp",
                // onMenuShareQZone: "menu:share:QZone",
                // previewImage: "imagePreview",
                // getLocation: "geoLocation",
                // openProductSpecificView: "openProductViewWithPid",
                // addCard: "batchAddCard",
                // openCard: "batchViewCard",
                // chooseWXPay: "getBrandWCPayRequest",
                // openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                // startSearchBeacons: "startMonitoringBeacons",
                // stopSearchBeacons: "stopMonitoringBeacons",
                // onSearchBeacons: "onBeaconsInRange",
                // consumeAndShareCard: "consumedShareCard",
                // openAddress: "editAddress"
            },
            sdkNameEventMap = (function() {
                var map = {};
                for (var i in eventSdkNameMap)
                    map[eventSdkNameMap[i]] = i;
                return map;
            })(),
            document = global.document,
            title = document.title,
            uaLowerCase = navigator.userAgent.toLowerCase(),
            platLowerCase = navigator.platform.toLowerCase(),
            isNormalPC = !(!uaLowerCase.match('mac') && !uaLowerCase.match('win')),
            isCoinchatDeBugger = uaLowerCase.indexOf('coinchatdebugger') != -1,
            isCoinchat = uaLowerCase.indexOf('coinchat') != -1,
            isAndroid = uaLowerCase.indexOf('android') != -1,
            isIOs = uaLowerCase.indexOf('iphone') != -1 || uaLowerCase.indexOf('ipad') != -1,
            coinchatVersion = (function() {
                var version = uaLowerCase.match(/coinchat\/(\d+\.\d+\.\d+)/) || uaLowerCase.match(/coinchat\/(\d+\.\d+)/);
                return version ? version[1] : ''
            })(),
            loadTimeInfo = {
                initStartTime: getTime(),
                initEndTime: 0,
                preVerifyStartTime: 0,
                preVerifyEndTime: 0
            },
            info = {
                version: 1,
                appId: "",
                initTime: 0,
                preVerifyTime: 0,
                networkType: "",
                isPreVerifyOk: 1,
                systemType: isIOs ? 1 : isAndroid ? 2 : -1,
                clientVersion: coinchatVersion,
                url: encodeURIComponent(location.href)
            },
            settings = {},
            handler = {
                _completes: []
            },
            resource = {
                state: 0,
                data: {}
            };

        var jCoinchat = {
                config: function(data) {
                    settings = data;
                    logEventInfo("config", data);
                    var callback = {};

                    settings['debug'] = (data['debug'] == true) ? true : false;
                    delete data['debug'];

                    invoke('config', data, function() {
                        console.log('callback',callback)
                        callback._complete = function(res) {
                            // delete res.type
                            console.log('调用完成');
                        };
                        callback._success = function(res) {
                            // delete res.type
                            console.log('调用成功');
                        };
                        callback._cancel = function(res) {
                            // delete res.type
                            console.log('调用取消');
                        };
                        callback._fail = function(res) {
                            // delete res.type
                            console.log('调用失败');
                        };
                        return callback;
                    }());
                    // var needCheck = settings.check === false ? false : true;
                    // startup(function() {
                    //     if (needCheck) {
                    //         invoke(eventSdkNameMap.config, {
                    //             verifyJsApiList: eventArrToSdkNameArr(settings.jsApiList)
                    //         }, function() {
                    //             handler._complete = function(data) {
                    //                 loadTimeInfo.preVerifyEndTime = getTime();
                    //                 resource.state = 1;
                    //                 resource.data = data;
                    //             };
                    //             handler.success = function(data) {
                    //                 info.isPreVerifyOk = 0;
                    //             };
                    //             handler.fail = function(data) {
                    //                 handler._fail ? handler._fail(data) : resource.state = -1;
                    //             };
                    //             var _completes = handler._completes;
                    //             _completes.push(function() {
                    //                 report();
                    //             });
                    //             handler.complete = function(data) {
                    //                 for (var i = 0, length = _completes.length; length > i; ++i) {
                    //                     _completes[i]();
                    //                 }
                    //             };
                    //             handler._completes = [];
                    //             return handler;
                    //         }());
                    //         loadTimeInfo.preVerifyStartTime = getTime();
                    //     } else {
                    //         resource.state = 1;
                    //         var _completes = handler._completes;
                    //         for (var i = 0, length = _completes.length; length > i; ++i) {
                    //             _completes[i]();
                    //         }
                    //         handler._completes = [];
                    //     }
                    // });
                    // settings.beta && enableBetaApi();
                },

                ready: function(callback) {
                    0 != resource.state ? callback() : (handler._completes.push(callback), !isCoinchat && settings.debug && callback())
                },
                error: function(callback) {
                    "6.0.2" > coinchatVersion || (-1 == resource.state ? callback(resource.data) : handler._fail = callback)
                },
                getLoginUserInfo : function(data) {
                    invoke('getLoginUserInfo', {
                        'partner_no' : data.partner_no,
                        'timestamp'  : data.timestamp
                    }, function() {
                        data._complete = function(res) {
                            // delete res.type
                            console.log('调用完成');
                            if (data.complete) {
                                data.complete(res);
                            }
                        };
                        data._success = function(res) {
                            // delete res.type
                            console.log('调用成功');
                            if (data.success) {
                                data.success(res);
                            }
                        };
                        data._cancel = function(res) {
                            // delete res.type
                            console.log('调用取消');
                        };
                        data._fail = function(res) {
                            // delete res.type
                            console.log('调用失败');
                            if (data.fail) {
                                data.fail(res);
                            }
                        };
                        return data;
                    }());
                },
                showToast: function(data) {
                    data = data || {};
                    console.log('invoke_show_toast');
                    invoke('showToast', data, function() {
                        data._complete = function(res) {
                            // delete res.type
                            console.log('调用完成');
                        };
                        data._success = function(res) {
                            // delete res.type
                            console.log('调用成功');
                        };
                        data._cancel = function(res) {
                            // delete res.type
                            console.log('调用取消');
                        };
                        data._fail = function(res) {
                            // delete res.type
                            console.log('调用失败');
                        };
                        return data;
                    }());
                },

                // checkJsApi: function(data) {
                //     var formatResultData = function(data) {
                //         var checkResult = data.checkResult;
                //         for (var key in checkResult) {
                //             var event = sdkNameEventMap[key];
                //             event && (checkResult[event] = checkResult[key], delete checkResult[key]);
                //         }
                //         return data;
                //     };
                //     invoke("checkJsApi", {
                //         jsApiList: eventArrToSdkNameArr(data.jsApiList)
                //     }, function() {
                //         data._complete = function(data) {
                //             if (isAndroid) {
                //                 var resultStr = data.checkResult;
                //                 resultStr && (data.checkResult = JSON.parse(resultStr));
                //             }
                //             data = formatResultData(data);
                //         };
                //         return data;
                //     }());
                // },
                onMenuShareTimeline: function(data) {
                    on(eventSdkNameMap.onMenuShareTimeline, {
                        complete: function() {
                            invoke("shareTimeline", {
                                title: data.title || title,
                                desc: data.title || title,
                                img_url: data.imgUrl || "",
                                link: data.link || location.href,
                                type: data.type || "link",
                                data_url: data.dataUrl || ""
                            }, data);
                        }
                    }, data);
                },
                onMenuShareAppMessage: function(data) {
                    on(eventSdkNameMap.onMenuShareAppMessage, {
                        complete: function() {
                            invoke("sendAppMessage", {
                                title: data.title || title,
                                desc: data.desc || "",
                                link: data.link || location.href,
                                img_url: data.imgUrl || "",
                                type: data.type || "link",
                                data_url: data.dataUrl || ""
                            }, data);
                        }
                    }, data);
                },
                onMenuShareQQ: function(data) {
                    on(eventSdkNameMap.onMenuShareQQ, {
                        complete: function() {
                            invoke("shareQQ", {
                                title: data.title || title,
                                desc: data.desc || "",
                                img_url: data.imgUrl || "",
                                link: data.link || location.href
                            }, data);
                        }
                    }, data);
                },
                onMenuShareWeibo: function(data) {
                    on(eventSdkNameMap.onMenuShareWeibo, {
                        complete: function() {
                            invoke("shareWeiboApp", {
                                title: data.title || title,
                                desc: data.desc || "",
                                img_url: data.imgUrl || "",
                                link: data.link || location.href
                            }, data);
                        }
                    }, data);
                },
                onMenuShareQZone: function(data) {
                    on(eventSdkNameMap.onMenuShareQZone, {
                        complete: function() {
                            invoke("shareQZone", {
                                title: data.title || title,
                                desc: data.desc || "",
                                img_url: data.imgUrl || "",
                                link: data.link || location.href
                            }, data);
                        }
                    }, data);
                },
                getNetworkType: function(data) {
                    var formatErrMsg = function(res) {
                        var errMsg = res.errMsg;
                        res.errMsg = "getNetworkType:ok";
                        var subtype = res.subtype;
                        delete res.subtype
                        if (subtype)
                            res.networkType = subtype;
                        else {
                            var separatorIndex = errMsg.indexOf(":"),
                                status = errMsg.substring(separatorIndex + 1);
                            switch (status) {
                                case "wifi":
                                case "edge":
                                case "wwan":
                                    res.networkType = status;
                                    break;
                                default:
                                    res.errMsg = "getNetworkType:fail"
                            }
                        }
                        return res;
                    };
                    invoke("getNetworkType", {}, function() {
                        data._complete = function(res) {
                            res = formatErrMsg(res);
                        };
                        return data;
                    }());
                },
                getLocation: function(data) {
                    data = data || {};
                    invoke(eventSdkNameMap.getLocation, {
                        type: data.type || "wgs84"
                    }, function() {
                        data._complete = function(res) {
                            delete res.type
                        };
                        return data;
                    }());
                },
                hideOptionMenu: function(data) {
                    invoke("hideOptionMenu", {}, data);
                },
                showOptionMenu: function(data) {
                    invoke("showOptionMenu", {}, data);
                },
                closeWindow: function(data) {
                    data = data || {};
                    invoke("closeWindow", {}, data);
                },
                hideMenuItems: function(data) {
                    invoke("hideMenuItems", {
                        menuList: data.menuList
                    }, data);
                },
                showMenuItems: function(data) {
                    invoke("showMenuItems", {
                        menuList: data.menuList
                    }, data);
                },
                hideAllNonBaseMenuItem: function(data) {
                    invoke("hideAllNonBaseMenuItem", {}, data);
                },
                showAllNonBaseMenuItem: function(data) {
                    invoke("showAllNonBaseMenuItem", {}, data);
                },
                scanQRCode: function(data) {
                    data = data || {};
                    invoke("scanQRCode", {
                        needResult: data.needResult || 0,
                        scanType: data.scanType || ["qrCode", "barCode"]
                    }, function() {
                        data._complete = function(res) {
                            if (isIOs) {
                                var resultStr = res.resultStr;
                                if (resultStr) {
                                    var result = JSON.parse(resultStr);
                                    res.resultStr = result && result.scan_code && result.scan_code.scan_result
                                }
                            }
                        };
                        return data;
                    }());
                }
            },
            next_iOSLocalImgId = 1,
            iOS_LocalImgMap = {};

        // 兼容 iOS WKWebview 不支持 localId 直接显示图片的问题
        document.addEventListener("error", function(event) {
            if (!isAndroid) {
                var target = event.target,
                    targetTagName = target.tagName,
                    targetSrc = target.src;
                if ("IMG" == targetTagName || "VIDEO" == targetTagName || "AUDIO" == targetTagName || "SOURCE" == targetTagName) {
                    var isWxlocalresource = targetSrc.indexOf("wxlocalresource://") != -1;
                    if (isWxlocalresource) {
                        event.preventDefault(), event.stopPropagation();
                        var wxId = target["wx-id"];
                        wxId || (wxId = next_iOSLocalImgId++, target["wx-id"] = wxId);
                        if (iOS_LocalImgMap[wxId]) {
                            return;
                        }
                        iOS_LocalImgMap[wxId] = true;
                        wx.ready(function() {
                            wx.getLocalImgData({
                                localId: targetSrc,
                                success: function(res) {
                                    target.src = res.localData
                                }
                            })
                        });
                    }
                }
            }
        }, true);
        document.addEventListener("load", function(event) {
            if (!isAndroid) {
                var target = event.target,
                    targetTagName = target.tagName,
                    targetSrc = target.src;
                if ("IMG" == targetTagName || "VIDEO" == targetTagName || "AUDIO" == targetTagName || "SOURCE" == targetTagName) {
                    var wxId = target["wx-id"];
                    wxId && (iOS_LocalImgMap[wxId] = false);
                }
            }
        }, true);

        console.log('set_ready')
        window._is_coinchat_init = true;

        return isGlobalMode && (global.coinchat = global.jCoinchat = jCoinchat), jCoinchat

    }


});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3), __webpack_require__(4)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(6), __webpack_require__(7));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha256", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var bridge = {
    default:this,// for typescript
    call: function (method, args, cb) {
        var ret = '';
        if (typeof args == 'function') {
            cb = args;
            args = {};
        }
        var arg={data:args===undefined?null:args}
        if (typeof cb == 'function') {
            var cbName = 'dscb' + window.dscb++;
            window[cbName] = cb;
            arg['_dscbstub'] = cbName;
        }
        arg = JSON.stringify(arg)

        //if in webview that dsBridge provided, call!
        if(window._dsbridge){
           ret=  _dsbridge.call(method, arg)
        }else if(window._dswk||navigator.userAgent.indexOf("_dsbridge")!=-1){
           ret = prompt("_dsbridge=" + method, arg);
        }

       return  JSON.parse(ret||'{}').data
    },
    register: function (name, fun, asyn) {
        var q = asyn ? window._dsaf : window._dsf
        if (!window._dsInit) {
            window._dsInit = true;
            //notify native that js apis register successfully on next event loop
            setTimeout(function () {
                bridge.call("_dsb.dsinit");
            }, 0)
        }
        if (typeof fun == "object") {
            q._obs[name] = fun;
        } else {
            q[name] = fun
        }
    },
    registerAsyn: function (name, fun) {
        this.register(name, fun, true);
    },
    hasNativeMethod: function (name, type) {
        return this.call("_dsb.hasNativeMethod", {name: name, type:type||"all"});
    },
    disableJavascriptDialogBlock: function (disable) {
        this.call("_dsb.disableJavascriptDialogBlock", {
            disable: disable !== false
        })
    }
};

!function () {
    if (window._dsf) return;
    var ob = {
        _dsf: {
            _obs: {}
        },
        _dsaf: {
            _obs: {}
        },
        dscb: 0,
        dsBridge: bridge,
        close: function () {
            bridge.call("_dsb.closePage")
        },
        _handleMessageFromNative: function (info) {
            var arg = JSON.parse(info.data);
            var ret = {
                id: info.callbackId,
                complete: true
            }
            var f = this._dsf[info.method];
            var af = this._dsaf[info.method]
            var callSyn = function (f, ob) {
                ret.data = f.apply(ob, arg)
                bridge.call("_dsb.returnValue", ret)
            }
            var callAsyn = function (f, ob) {
                arg.push(function (data, complete) {
                    ret.data = data;
                    ret.complete = complete!==false;
                    bridge.call("_dsb.returnValue", ret)
                })
                f.apply(ob, arg)
            }
            if (f) {
                callSyn(f, this._dsf);
            } else if (af) {
                callAsyn(af, this._dsaf);
            } else {
                //with namespace
                var name = info.method.split('.');
                if (name.length<2) return;
                var method=name.pop();
                var namespace=name.join('.')
                var obs = this._dsf._obs;
                var ob = obs[namespace] || {};
                var m = ob[method];
                if (m && typeof m == "function") {
                    callSyn(m, ob);
                    return;
                }
                obs = this._dsaf._obs;
                ob = obs[namespace] || {};
                m = ob[method];
                if (m && typeof m == "function") {
                    callAsyn(m, ob);
                    return;
                }
            }
        }
    }
    for (var attr in ob) {
        window[attr] = ob[attr]
    }
    bridge.register("_hasJavascriptMethod", function (method, tag) {
         var name = method.split('.')
         if(name.length<2) {
           return !!(_dsf[name]||_dsaf[name])
         }else{
           // with namespace
           var method=name.pop()
           var namespace=name.join('.')
           var ob=_dsf._obs[namespace]||_dsaf._obs[namespace]
           return ob&&!!ob[method]
         }
    })
}();

module.exports = bridge;

/***/ })
/******/ ]);