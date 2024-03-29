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
 * class Obj * @constructor
 */
function Obj() {
}

Obj.prototype.$__jsx_implements_Obj = true;

/**
 * @constructor
 */
function Obj$() {
};

Obj$.prototype = new Obj;

/**
 * @param {Obj} other
 * @return {!boolean}
 */
Obj.prototype.hit$LObj$ = function (other) {
	var $math_abs_t;
	return (($math_abs_t = this.x - other.x) >= 0 ? $math_abs_t : -$math_abs_t) < Config.objWidth && (($math_abs_t = this.y - other.y) >= 0 ? $math_abs_t : -$math_abs_t) < Config.objHeight;
};

/**
 * @param {!number} dx
 * @param {!number} dy
 * @return {!boolean}
 */
Obj.prototype.hitGround$NN = function (dx, dy) {
	return Ground$isGround$NN(this.x + dx, this.y + dy);
};

/**
 * @param {CanvasRenderingContext2D} context
 */
Obj.prototype.draw$LCanvasRenderingContext2D$ = function (context) {
	context.fillText(this.character, this.x, this.y);
};

/**
 * class Enemy * @constructor
 */
function Enemy() {
}

$__jsx_merge_interface(Enemy, Obj);

Enemy.prototype.$__jsx_implements_Enemy = true;

/**
 * @constructor
 */
function Enemy$() {
	Obj$.call(this);
};

Enemy$.prototype = new Enemy;

/**
 * class FlyingEnemy extends Object
 * @constructor
 */
function FlyingEnemy() {
}

FlyingEnemy.prototype = new Object;
$__jsx_merge_interface(FlyingEnemy, Obj);
$__jsx_merge_interface(FlyingEnemy, Enemy);

/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 */
function FlyingEnemy$NNF$NHN$(_x, _y, _get_delta) {
	Obj$.call(this);
	Enemy$.call(this);
	this.x = _x;
	this.y = _y;
	this.character = "F";
	this.get_delta = _get_delta;
	this.tick_count = 0;
};

FlyingEnemy$NNF$NHN$.prototype = new FlyingEnemy;

/**
 */
FlyingEnemy.prototype.tick$ = function () {
	/** @type {Object.<string, undefined|!number>} */
	var delta;
	delta = this.get_delta(this.tick_count);
	if (! (delta.dx !== undefined)) {
		debugger;
		throw new Error("[obj.jsx:54] assertion failure");
	}
	if (! (delta.dy !== undefined)) {
		debugger;
		throw new Error("[obj.jsx:55] assertion failure");
	}
	if (! this.hitGround$NN((function (v) {
		if (! (typeof v !== "undefined")) {
			debugger;
			throw new Error("[obj.jsx:57] detected misuse of 'undefined' as type 'number'");
		}
		return v;
	}(delta.dx)), (function (v) {
		if (! (typeof v !== "undefined")) {
			debugger;
			throw new Error("[obj.jsx:57] detected misuse of 'undefined' as type 'number'");
		}
		return v;
	}(delta.dy)))) {
		this.x += (function (v) {
			if (! (typeof v !== "undefined")) {
				debugger;
				throw new Error("[obj.jsx:58] detected misuse of 'undefined' as type 'number'");
			}
			return v;
		}(delta.dx));
		this.y += (function (v) {
			if (! (typeof v !== "undefined")) {
				debugger;
				throw new Error("[obj.jsx:59] detected misuse of 'undefined' as type 'number'");
			}
			return v;
		}(delta.dy));
	}
	++ this.tick_count;
};

/**
 * class WalkingObj extends Object
 * @constructor
 */
function WalkingObj() {
}

WalkingObj.prototype = new Object;
$__jsx_merge_interface(WalkingObj, Obj);

/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 * @param {!string} _character
 */
function WalkingObj$NNS(_x, _y, _character) {
	Obj$.call(this);
	this.x = _x;
	this.y = _y;
	this.character = _character;
	this.dx = 0;
	this.dy = 0;
	this.onGround = false;
};

WalkingObj$NNS.prototype = new WalkingObj;

/**
 */
WalkingObj.prototype.tick$ = function () {
	if (this.dy >= 0 && this.hitGround$NN(0, 1)) {
		this.dy = 0;
		this.onGround = true;
	} else {
		this.dy += 0.2;
		this.onGround = false;
		if (this.dy <= 0 && this.hitGround$NN(0, - 1)) {
			this.dy = 0;
		} else {
			if (this.hitGround$NN(0, this.dy)) {
				this.y += 1;
			} else {
				this.y += this.dy;
			}
		}
	}
};

/**
 * class WalkingEnemy extends WalkingObj
 * @constructor
 */
function WalkingEnemy() {
}

WalkingEnemy.prototype = new WalkingObj;
$__jsx_merge_interface(WalkingEnemy, Enemy);

/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 * @param {!number} _dx
 */
function WalkingEnemy$NNN(_x, _y, _dx) {
	WalkingObj$NNS.call(this, _x, _y, "E");
	Enemy$.call(this);
	this.dx = _dx;
};

WalkingEnemy$NNN.prototype = new WalkingEnemy;

/**
 */
WalkingEnemy.prototype.tick$ = function () {
	WalkingObj.prototype.tick$.call(this);
	if (this.onGround && ! this.hitGround$NN(this.dx, 0) && this.hitGround$NN(this.dx, 1)) {
		this.x += this.dx;
	} else {
		this.dx = - this.dx;
	}
};

/**
 * class Pc extends WalkingObj
 * @constructor
 */
function Pc() {
}

Pc.prototype = new WalkingObj;
/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 */
function Pc$NN(_x, _y) {
	WalkingObj$NNS.call(this, _x, _y, "@");
};

Pc$NN.prototype = new Pc;

/**
 * @param {!number} pow
 */
Pc.prototype.move$N = function (pow) {
	var $math_abs_t;
	if ((($math_abs_t = this.dx + pow / 10) >= 0 ? $math_abs_t : -$math_abs_t) <= Pc.max_dx) {
		this.dx += pow / 10;
	}
};

/**
 * @param {!number} pow
 */
Pc.prototype.jump$N = function (pow) {
	if (this.onGround) {
		this.dy = - pow;
	}
};

/**
 */
Pc.prototype.tick$ = function () {
	var $math_abs_t;
	WalkingObj.prototype.tick$.call(this);
	if ((($math_abs_t = this.dx) >= 0 ? $math_abs_t : -$math_abs_t) >= 0.1) {
		this.dx -= 0.05 * ((($math_abs_t = this.dx) >= 0 ? $math_abs_t : -$math_abs_t) / this.dx);
	} else {
		this.dx = 0;
	}
	if (this.hitGround$NN(this.dx, 0)) {
		this.dx = 0;
	} else {
		this.x += this.dx;
	}
};

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

Pc.max_dx = 2;
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
$__jsx_lazy_init(Ground, "map", function () {
	return [ "===    =============", "=                  =", "=                  =", "=                  =", "=      =           =", "=                  =", "=                  =", "=                  =", "=                  =", "=              =   =", "=                  =", "=                  =", "=                  =", "=   ==             =", "=                  =", "=                  =", "=        ====      =", "=                  =", "=                  =", "=                  =", "=                  =", "==============   ===", "=                  =", "=                  =", "=                  =", "=                  =", "==   ===============", "=                  =", "=                  =", "====================" ];
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"obj.jsx": {
		Obj: Obj,
		Obj$: Obj$,
		Enemy: Enemy,
		Enemy$: Enemy$,
		FlyingEnemy: FlyingEnemy,
		FlyingEnemy$NNF$NHN$: FlyingEnemy$NNF$NHN$,
		WalkingObj: WalkingObj,
		WalkingObj$NNS: WalkingObj$NNS,
		WalkingEnemy: WalkingEnemy,
		WalkingEnemy$NNN: WalkingEnemy$NNN,
		Pc: Pc,
		Pc$NN: Pc$NN
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"config.jsx": {
		Config: Config,
		Config$: Config$
	},
	"ground.jsx": {
		Ground: Ground,
		Ground$: Ground$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


}());
