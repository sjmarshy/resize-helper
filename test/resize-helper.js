/* eslint-env mocha */
"use strict";
var Baobab = require("baobab");
var ResizeHelper = require("../build/resizeHelper.js");

var sizes = {
  460: "mobile",
  740: "tablet",
  940: "desktop",
  1300: "wide"
};

describe("resize-helper", function () {

  var helper, appstate;

  before(function () {
    appstate = new Baobab({ size: 950 });
    helper = new ResizeHelper(appstate.select("size"), sizes);
    helper.on("update", console.log);
  });

  beforeEach(function (done) {
    appstate.set("size", 950);
    setTimeout(function () {
      done(); 
    }, 250);
  });

  afterEach(function () {
    helper.removeAllListeners();
  });

  it("should work when the browser size is exactly on a boundry", function (done) {

    helper.on("to:wide", function () {
      done();
    });

    appstate.set("size", 1300);
  });

  it("should trigger a from:<size> event when leaving a size bracket", function (done) {

    helper.on("from:desktop", function () {
      done();
    });

    appstate.set("size", 1300);
  });

  it("should trigger a to:<size> event when entering a size bracket", function (done) {

    helper.on("to:tablet", function () {
      done();
    });
    
    appstate.set("size", 780);
  });
  

  describe("Query Syntax", function () {

    describe("a more complex way of setting js states", function (done) {

      it("should apply 0 as a minimum size by default", function () {

        helper.query({
          to: "desktop",
          action: function () {
            done();
          }
        });

        appstate.set("size", 400);
      });
    });
  });
});
