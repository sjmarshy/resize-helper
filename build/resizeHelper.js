"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var EventEmitter = require("events").EventEmitter;

var ResizeHelper = (function (_EventEmitter) {
    function ResizeHelper(bSizeCursor, sizes) {
        _classCallCheck(this, ResizeHelper);

        _get(Object.getPrototypeOf(ResizeHelper.prototype), "constructor", this).call(this);

        this.sizes = sizes;
        this.cursor = bSizeCursor;
        this.currentSize = "";
        this.t = {};
        this.f = {};

        this.cursor.on("update", this.checkSizes.bind(this));
    }

    _inherits(ResizeHelper, _EventEmitter);

    _createClass(ResizeHelper, [{
        key: "checkSizes",
        value: function checkSizes() {

            var newSize = this.cursor.get();
            var sizes = Object.keys(this.sizes).map(function (e) {
                return parseInt(e, 10);
            });
            var size = sizes.filter(function (s) {
                return newSize < s;
            })[0];

            if (newSize >= sizes[sizes.length - 1]) {
                size = sizes[sizes.length - 1];
            }

            var nSize = this.sizes[size];

            if (this.currentSize !== nSize) {

                this.currentSize && this.emit("from:" + this.currentSize);
                this.emit("to:" + nSize);
                this.currentSize = nSize;
            }
        }
    }]);

    return ResizeHelper;
})(EventEmitter);

module.exports = ResizeHelper;