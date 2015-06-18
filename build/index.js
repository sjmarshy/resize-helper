"use strict";

var Baobab = require("baobab");
var ResizeHelper = require("./resizeHelper.js");
var _ = require("underscore");
var appState = new Baobab({ size: 0 });

var sizeProperty = "size";

window.onresize = _.debounce(function () {
    appState.set(sizeProperty, window.innerWidth);
}, 150);

appState.set(sizeProperty, window.innerWidth);

function resizeHelperFactory(sizes) {
    return new ResizeHelper(appState.select(sizeProperty), sizes);
}

module.exports = resizeHelperFactory;