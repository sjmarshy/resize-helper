"use strict";

const Baobab = require("baobab");
const ResizeHelper = require("./resizeHelper.js");
const _ = require("underscore");
const appState = new Baobab({ size: 0 });

const sizeProperty = "size";

window.onresize = _.debounce(function () {
    appState.set(sizeProperty, window.innerWidth);
}, 150);

appState.set(sizeProperty, window.innerWidth);

function resizeHelperFactory(sizes) {
    return new ResizeHelper(appState.select(sizeProperty), sizes);
}

module.exports = resizeHelperFactory;
