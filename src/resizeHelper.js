"use strict";

const EventEmitter = require("events").EventEmitter;

class ResizeHelper extends EventEmitter {

    constructor (bSizeCursor, sizes) {

        super();

        this.sizes = sizes;
        this.cursor = bSizeCursor;
        this.currentSize = "";
        this.t = {};
        this.f = {};

        this.cursor.on("update", this.checkSizes.bind(this));
    }

    checkSizes() {

        let newSize = this.cursor.get();
        let sizes = Object.keys(this.sizes).map(function (e) { return parseInt(e, 10); });
        let size = sizes.filter(function (s) {
            return newSize < s;
        })[0];

        if (newSize >= sizes[sizes.length - 1]) {
            size = sizes[sizes.length - 1];
        }

        let nSize = this.sizes[size];

        if (this.currentSize !== nSize) {

            this.currentSize && this.emit("from:" + this.currentSize);
            this.emit("to:" + nSize);
            this.currentSize = nSize;
        }
    }
}

module.exports = ResizeHelper;
