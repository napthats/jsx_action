var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/*
 * global functions called by JSX as Number.* (renamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
}
/**
 * class Ground extends Object
 * @constructor
 */
function Ground() {
}

Ground.prototype = new Object;
/**
 * @constructor
 */
function Ground$() {
};

Ground$.prototype = new Ground;

/**
 * @param {CanvasRenderingContext2D} context
 */
Ground.draw$LCanvasRenderingContext2D$ = function (context) {
	/** @type {!number} */
	var y_ord;
	/** @type {!number} */
	var key;
	/** @type {undefined|!string} */
	var str;
	/** @type {!number} */
	var x_ord;
	/** @type {!number} */
	var i;
	y_ord = 1;
	for (key in Ground.map) {
		str = Ground.map[key];
		x_ord = 0;
		for (i = 0; i < str.length; ++ i) {
			context.fillText(Ground.map[key].charAt(i), Config.objWidth * x_ord, Config.objHeight * y_ord);
			x_ord += 1;
		}
		y_ord += 1;
	}
};

var Ground$draw$LCanvasRenderingContext2D$ = Ground.draw$LCanvasRenderingContext2D$;

/**
 * @param {!number} x
 * @param {!number} y
 * @return {!boolean}
 */
Ground.isGround$NN = function (x, y) {
	/** @type {!number} */
	var ord_x_l;
	/** @type {!number} */
	var ord_x_r;
	/** @type {!number} */
	var ord_y_d;
	/** @type {!number} */
	var ord_y_t;
	ord_x_l = Math.floor(x / Config.objWidth);
	ord_x_r = Math.floor(x / Config.objWidth) + 1;
	ord_y_d = Math.floor(y / Config.objHeight);
	ord_y_t = Math.floor(y / Config.objHeight) - 1;
	if (ord_x_l < 0 || ord_x_r >= 20 || ord_y_d >= 30 || ord_y_t < 0) {
		return true;
	}
	if (Ground.map[ord_y_d].charAt(ord_x_l) === ' ' && Ground.map[ord_y_d].charAt(ord_x_r) === ' ' && Ground.map[ord_y_t].charAt(ord_x_l) === ' ' && Ground.map[ord_y_t].charAt(ord_x_r) === ' ') {
		return false;
	} else {
		return true;
	}
};

var Ground$isGround$NN = Ground.isGround$NN;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return (function (v) {
		if (! (v === null || v instanceof HTMLElement)) {
			debugger;
			throw new Error("[/home/napthats/Downloads/JSX/lib/js/js/web.jsx:30] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(dom.window.document.createElement(tag)));
};

var dom$createElement$S = dom.createElement$S;

/**
 * class Config extends Object
 * @constructor
 */
function Config() {
}

Config.prototype = new Object;
/**
 * @constructor
 */
function Config$() {
};

Config$.prototype = new Config;

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

$__jsx_lazy_init(Ground, "map", function () {
	return [ "===    =============", "=                  =", "=                  =", "=                  =", "=      =           =", "=                  =", "=                  =", "=                  =", "=                  =", "=              =   =", "=                  =", "=                  =", "=                  =", "=   ==             =", "=                  =", "=                  =", "=        ====      =", "=                  =", "=                  =", "=                  =", "=                  =", "==============   ===", "=                  =", "=                  =", "=                  =", "=                  =", "==   ===============", "=                  =", "=                  =", "====================" ];
});
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
Config.objWidth = 8;
Config.objHeight = 8;
Config.canvasWidth = 160;
Config.canvasHeight = 240;
Config.defaultX = 80;
Config.defaultY = 231;
Config.fps = 60;
Config.font = "16px serif";
Config.messageX = 40;
Config.messageY = 120;
Config.goalMessage = "Congratulation!";
Config.deadMessage = "Game Over";
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"ground.jsx": {
		Ground: Ground,
		Ground$: Ground$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"config.jsx": {
		Config: Config,
		Config$: Config$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


}());
