# Resize Helper

quick & dirty 'I want something to happen differently when my browser is at a
different size' helper. Think ridiculously basic media queries for js. If you
need anything more complex, this probably won't be that useful.

## Usage

first, install it (it isn't on npm right now):

```
npm install --save sjmarshy/resize-helper#v1.0.1
```

then in your project file:

```
var resizeHelper = require("resize-helper");

var rh = resizeHelper({
	460: "mobile",
	940: "desktop"
});

// each size gets both a 'to' handler
rh.to("mobile", function () {
	// stuff that needs to happen when entering mobile size
});

rh.to("desktop", function () {
	// stuff that needs to happen when entering desktop size
});

// and a 'from' handler
rh.from("mobile", function () {
	// clean up mobile mode
});
```

that's pretty much it
