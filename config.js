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
var $__jsx_classMap = {
	"config.jsx": {
		Config: Config,
		Config$: Config$
	}
};


}());
