"use strict";

const EventEmitter = require("events").EventEmitter;

class ResizeHelper extends EventEmitter {

    constructor (bSizeCursor, sizes) {

        super();

        this.sizes = sizes;
        this.cursor = bSizeCursor;
        this.currentSize = "";

        this.cursor.on("update", this.checkSizes.bind(this));
        this.checkSizes();
    }

    checkSizes() {

        let newSize = this.cursor.get();
        let sizes = Object.keys(this.sizes).map(function (e) { return parseInt(e, 10); });
        let size = sizes.filter(function (s, i, arr) {
            return newSize >= s && newSize < arr[i + 1];
        })[0];

        if (newSize <= sizes[0]) {
            size = sizes[0];
        }

        if (!size && newSize >= sizes[sizes.length -1]) {
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
