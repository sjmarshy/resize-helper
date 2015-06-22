/* eslint-env mocha */
"use strict";
var Baobab = require("baobab");
var ResizeHelper = require("../build/resizeHelper.js");

var sizes = {
    940: "desktop",
    1300: "wide"
};

describe("resize-helper", function () {

    var helper, appstate;

    before(function () {
	appstate = new Baobab({ size: 900 });
	helper = new ResizeHelper(appstate.select("size"), sizes);
    });

    it("should work when the browser size is exactly on a boundry", function (done) {

	helper.to("wide", function () {
	    done();
	});

	appstate.set("size", 1300);
    });
});
