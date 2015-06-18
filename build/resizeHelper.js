"use strict";

function ResizeHelper(bSizeCursor, sizes) {

    this.sizes = sizes;
    this.cursor = bSizeCursor;
    this.currentSize = "";
    this.t = {};
    this.f = {};

    this.initialiseSizeListeners();
    this.cursor.on("update", this.checkSizes.bind(this));
}

ResizeHelper.prototype.initialiseSizeListeners = function () {

    var sizeNames = Object.keys(this.sizes).map((function (e) {

        return this.sizes[e];
    }).bind(this));

    sizeNames.forEach((function (sn) {

        this.t[sn] = function () {};
        this.f[sn] = function () {};
    }).bind(this));
};

ResizeHelper.prototype.checkSizes = function () {

    var newSize = this.cursor.get();
    var sizes = Object.keys(this.sizes).map(function (e) {
        return parseInt(e, 10);
    });

    var size = sizes.filter(function (s) {
        return newSize < s;
    })[0];

    if (newSize > sizes[sizes.length - 1]) {
        size = sizes[sizes.length - 1];
    }

    var nSize = this.sizes[size];

    if (this.currentSize !== nSize) {

        this.currentSize && this.call("from", this.currentSize);
        this.call("to", nSize);
        this.currentSize = nSize;
    }
};

ResizeHelper.prototype.from = function (sn, callback) {
    this.f[sn] = callback;
};

ResizeHelper.prototype.to = function (sn, callback) {
    this.t[sn] = callback;
};

ResizeHelper.prototype.call = function (toorfrom, sn) {
    this[toorfrom === "to" ? "t" : "f"][sn]();
};

module.exports = ResizeHelper;