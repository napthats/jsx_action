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
 * class Key extends Object
 * @constructor
 */
function Key() {
}

Key.prototype = new Object;
/**
 * @constructor
 */
function Key$() {
};

Key$.prototype = new Key;

/**
 * class Game extends Object
 * @constructor
 */
function Game() {
}

Game.prototype = new Object;
/**
 * @constructor
 * @param {HTMLCanvasElement} canvas
 */
function Game$LHTMLCanvasElement$(canvas) {
	var $this = this;
	/** @type {HTMLElement} */
	var body;
	this.pc = null;
	this.enemies = null;
	this.isEnd = false;
	this.stage_number = 0;
	canvas.width = (Config.canvasWidth | 0);
	canvas.height = (Config.canvasHeight | 0);
	this.ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext("2d"));
	if (! (this.ctx != null)) {
		debugger;
		throw new Error("[test.jsx:37] assertion failure");
	}
	this.ctx.font = Config.font;
	this.pc = new Pc$NN(Config.defaultX, Config.defaultY);
	this.enemies = Stage$getEnemies$();
	body = dom.window.document.body;
	body.addEventListener("keydown", (function (e) {
		/** @type {KeyboardEvent} */
		var ke;
		if (e instanceof KeyboardEvent) {
			ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
			switch (ke.keyCode) {
			case Key.up_code:
				Key.up = true;
				break;
			case Key.right_code:
				Key.right = true;
				break;
			case Key.left_code:
				Key.left = true;
				break;
			case Key.z_code:
				Key.z = true;
				break;
			case Key.x_code:
				Key.x = true;
				break;
			}
		}
	}));
	body.addEventListener("keyup", (function (e) {
		/** @type {KeyboardEvent} */
		var ke;
		if (e instanceof KeyboardEvent) {
			ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
			switch (ke.keyCode) {
			case Key.up_code:
				Key.up = false;
				break;
			case Key.right_code:
				Key.right = false;
				break;
			case Key.left_code:
				Key.left = false;
				break;
			case Key.z_code:
				Key.z = false;
				break;
			case Key.x_code:
				Key.x = false;
				break;
			}
		}
	}));
};

Game$LHTMLCanvasElement$.prototype = new Game;

/**
 */
Game.prototype.tick$ = function () {
	var $this = this;
	/** @type {Region} */
	var inout;
	/** @type {Outer} */
	var out;
	/** @type {!number} */
	var i;
	if (this.isEnd) {
		return;
	}
	dom.window.setTimeout((function () {
		$this.tick$();
	}), 1000 / Config.fps);
	this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
	Stage$draw$LCanvasRenderingContext2D$(this.ctx);
	if (Key.right) {
		this.pc.move$N(1);
	}
	if (Key.left) {
		this.pc.move$N(- 1);
	}
	if (Key.up || Key.z) {
		this.pc.jump$N(4.5);
	}
	this.pc.tick$();
	inout = Stage$checkInner$NN(this.pc.x, this.pc.y);
	if (inout instanceof Inner) {
		this.pc.draw$LCanvasRenderingContext2D$(this.ctx);
	} else {
		if (inout instanceof Outer) {
			out = (function (o) { return o instanceof Outer ? o : null; })(inout);
			if (out.direction instanceof Up && Stage.stage_number === 1) {
				this.gameEnd$S(Config.goalMessage);
				return;
			} else {
				if (out.direction instanceof Up && Stage.stage_number === 0) {
					Stage$changeStage$N(1);
					this.enemies = Stage$getEnemies$();
					this.pc.y = Config.canvasHeight - Config.objHeight;
				} else {
					if (out.direction instanceof Down && Stage.stage_number === 1) {
						Stage$changeStage$N(0);
						this.enemies = Stage$getEnemies$();
						this.pc.y = 0 + Config.objHeight;
					} else {
						if (out.direction instanceof Left && Stage.stage_number === 0) {
							Stage$changeStage$N(2);
							this.enemies = Stage$getEnemies$();
							this.pc.x = Config.canvasWidth - Config.objWidth;
						} else {
							if (out.direction instanceof Right && Stage.stage_number === 2) {
								Stage$changeStage$N(0);
								this.enemies = Stage$getEnemies$();
								this.pc.x = 0 + Config.objWidth / 2;
							} else {
								if (! (false)) {
									debugger;
									throw new Error("[test.jsx:120] assertion failure");
								}
							}
						}
					}
				}
			}
		} else {
			if (! (false)) {
				debugger;
				throw new Error("[test.jsx:122] assertion failure");
			}
		}
	}
	for (i = 0; i < this.enemies.length; ++ i) {
		this.enemies[i].tick$();
		this.enemies[i].draw$LCanvasRenderingContext2D$(this.ctx);
		if (this.pc.hit$LObj$((function (v) {
			if (! (typeof v !== "undefined")) {
				debugger;
				throw new Error("[test.jsx:128] detected misuse of 'undefined' as type 'Enemy'");
			}
			return v;
		}(this.enemies[i])))) {
			this.gameEnd$S(Config.deadMessage);
			return;
		}
	}
};

/**
 * @param {!string} msg
 */
Game.prototype.gameEnd$S = function (msg) {
	this.isEnd = true;
	this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
	this.ctx.fillText(msg, Config.messageX, Config.messageY);
};

/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {Game} */
	var game;
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S((function (v) {
		if (! (typeof v !== "undefined")) {
			debugger;
			throw new Error("[test.jsx:141] detected misuse of 'undefined' as type 'string'");
		}
		return v;
	}(args[0]))));
	if (! (canvas != null)) {
		debugger;
		throw new Error("[test.jsx:142] assertion failure");
	}
	game = new Game$LHTMLCanvasElement$(canvas);
	game.tick$();
};

var _Main$main$AS = _Main.main$AS;

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
 * class Direction * @constructor
 */
function Direction() {
}

Direction.prototype.$__jsx_implements_Direction = true;

/**
 * @constructor
 */
function Direction$() {
};

Direction$.prototype = new Direction;

/**
 * class Up extends Object
 * @constructor
 */
function Up() {
}

Up.prototype = new Object;
$__jsx_merge_interface(Up, Direction);

/**
 * @constructor
 */
function Up$() {
	Direction$.call(this);
};

Up$.prototype = new Up;

/**
 * class Right extends Object
 * @constructor
 */
function Right() {
}

Right.prototype = new Object;
$__jsx_merge_interface(Right, Direction);

/**
 * @constructor
 */
function Right$() {
	Direction$.call(this);
};

Right$.prototype = new Right;

/**
 * class Down extends Object
 * @constructor
 */
function Down() {
}

Down.prototype = new Object;
$__jsx_merge_interface(Down, Direction);

/**
 * @constructor
 */
function Down$() {
	Direction$.call(this);
};

Down$.prototype = new Down;

/**
 * class Left extends Object
 * @constructor
 */
function Left() {
}

Left.prototype = new Object;
$__jsx_merge_interface(Left, Direction);

/**
 * @constructor
 */
function Left$() {
	Direction$.call(this);
};

Left$.prototype = new Left;

/**
 * class Region * @constructor
 */
function Region() {
}

Region.prototype.$__jsx_implements_Region = true;

/**
 * @constructor
 */
function Region$() {
};

Region$.prototype = new Region;

/**
 * class Outer extends Object
 * @constructor
 */
function Outer() {
}

Outer.prototype = new Object;
$__jsx_merge_interface(Outer, Region);

/**
 * @constructor
 * @param {Direction} d
 */
function Outer$LDirection$(d) {
	Region$.call(this);
	this.direction = d;
};

Outer$LDirection$.prototype = new Outer;

/**
 * class Inner extends Object
 * @constructor
 */
function Inner() {
}

Inner.prototype = new Object;
$__jsx_merge_interface(Inner, Region);

/**
 * @constructor
 */
function Inner$() {
	Region$.call(this);
};

Inner$.prototype = new Inner;

/**
 * class Stage extends Object
 * @constructor
 */
function Stage() {
}

Stage.prototype = new Object;
/**
 * @constructor
 */
function Stage$() {
};

Stage$.prototype = new Stage;

/**
 * @return {Array.<undefined|Enemy>}
 */
Stage.getEnemies$ = function () {
	return Stage.enemies[Stage.stage_number];
};

var Stage$getEnemies$ = Stage.getEnemies$;

/**
 * @param {!number} _stage_number
 */
Stage.changeStage$N = function (_stage_number) {
	if (! (_stage_number === 0 || _stage_number === 1 || _stage_number === 2)) {
		debugger;
		throw new Error("[stage.jsx:145] assertion failure");
	}
	Stage.stage_number = _stage_number;
};

var Stage$changeStage$N = Stage.changeStage$N;

/**
 * @param {CanvasRenderingContext2D} context
 */
Stage.draw$LCanvasRenderingContext2D$ = function (context) {
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
	for (key in Stage.map[Stage.stage_number]) {
		str = Stage.map[Stage.stage_number][key];
		x_ord = 0;
		for (i = 0; i < str.length; ++ i) {
			context.fillText(Stage.map[Stage.stage_number][key].charAt(i), Config.objWidth * x_ord, Config.objHeight * y_ord);
			x_ord += 1;
		}
		y_ord += 1;
	}
};

var Stage$draw$LCanvasRenderingContext2D$ = Stage.draw$LCanvasRenderingContext2D$;

/**
 * @param {!number} x
 * @param {!number} y
 * @return {Region}
 */
Stage.checkInner$NN = function (x, y) {
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
	if (ord_x_l + 0.5 < 0) {
		return new Outer$LDirection$(new Left$());
	} else {
		if (ord_x_r - 0.5 >= 20) {
			return new Outer$LDirection$(new Right$());
		} else {
			if (ord_y_d - 0.5 >= 30) {
				return new Outer$LDirection$(new Down$());
			} else {
				if (ord_y_t + 0.5 < 0) {
					return new Outer$LDirection$(new Up$());
				} else {
					return new Inner$();
				}
			}
		}
	}
};

var Stage$checkInner$NN = Stage.checkInner$NN;

/**
 * @param {!number} x
 * @param {!number} y
 * @return {!boolean}
 */
Stage.isGround$NN = function (x, y) {
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
		return false;
	}
	if (Stage.map[Stage.stage_number][ord_y_d].charAt(ord_x_l) === ' ' && Stage.map[Stage.stage_number][ord_y_d].charAt(ord_x_r) === ' ' && Stage.map[Stage.stage_number][ord_y_t].charAt(ord_x_l) === ' ' && Stage.map[Stage.stage_number][ord_y_t].charAt(ord_x_r) === ' ') {
		return false;
	} else {
		return true;
	}
};

var Stage$isGround$NN = Stage.isGround$NN;

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
	return Stage$isGround$NN(this.x + dx, this.y + dy);
};

/**
 * @return {!boolean}
 */
Obj.prototype.isOuter$ = function () {
	if (Stage$checkInner$NN(this.x, this.y) instanceof Outer) {
		return true;
	} else {
		return false;
	}
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
		throw new Error("[obj.jsx:59] assertion failure");
	}
	if (! (delta.dy !== undefined)) {
		debugger;
		throw new Error("[obj.jsx:60] assertion failure");
	}
	if (! this.hitGround$NN((function (v) {
		if (! (typeof v !== "undefined")) {
			debugger;
			throw new Error("[obj.jsx:62] detected misuse of 'undefined' as type 'number'");
		}
		return v;
	}(delta.dx)), (function (v) {
		if (! (typeof v !== "undefined")) {
			debugger;
			throw new Error("[obj.jsx:62] detected misuse of 'undefined' as type 'number'");
		}
		return v;
	}(delta.dy)))) {
		this.x += (function (v) {
			if (! (typeof v !== "undefined")) {
				debugger;
				throw new Error("[obj.jsx:63] detected misuse of 'undefined' as type 'number'");
			}
			return v;
		}(delta.dx));
		this.y += (function (v) {
			if (! (typeof v !== "undefined")) {
				debugger;
				throw new Error("[obj.jsx:64] detected misuse of 'undefined' as type 'number'");
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
	if (this.isOuter$()) {
		return;
	} else {
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
	if (this.onGround && ! this.hitGround$NN(this.dx, 0) && this.hitGround$NN(this.dx, 1)) {
		this.x += this.dx;
	} else {
		this.dx = - this.dx;
	}
	WalkingObj.prototype.tick$.call(this);
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
	WalkingObj.prototype.tick$.call(this);
};

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

Key.up_code = 38;
Key.right_code = 39;
Key.left_code = 37;
Key.z_code = 90;
Key.x_code = 88;
Key.up = false;
Key.right = false;
Key.left = false;
Key.z = false;
Key.x = false;
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
Stage.stage_number = 0;
$__jsx_lazy_init(Stage, "enemies", function () {
	return [ [ new WalkingEnemy$NNN(0, 0, 0) ], [ new WalkingEnemy$NNN(10, 40, 1) ], [ new WalkingEnemy$NNN(0, 0, 0) ] ];
});
$__jsx_lazy_init(Stage, "map", function () {
	return [ [ "============       =", "=      =           =", "       =           =", "       =     ===   =", "=                  =", "=   ====           =", "=   ====           =", "=              =   =", "=              =   =", "=              =   =", "=        =======   =", "=  =               =", "=                  =", "=   ==             =", "=                  =", "=                  =", "=        ====      =", "=                  =", "=                  =", "=                  =", "=                  =", "==============   ===", "=         ====     =", "=                  =", "=                  =", "=                  =", "=   ================", "=                  =", "=                  =", "====================" ], [ "===    =============", "=                  =", "=                  =", "=                  =", "=      =           =", "=                  =", "=                  =", "=                  =", "=                  =", "=              =   =", "=                  =", "=                  =", "=                  =", "======             =", "=                  =", "=                  =", "=        ====      =", "=                  =", "=                  =", "=                  =", "=                  =", "==============   ===", "=         =        =", "=         =        =", "=   ====     =     =", "=      =     =     =", "=      =======     =", "=                  =", "=                  =", "============       =" ], [ "====================", "=                  =", "=                   ", "=                   ", "=                  =", "=             =    =", "=                  =", "=                  =", "=                  =", "=                  =", "=        =         =", "=  =               =", "=                  =", "=    ===============", "=                  =", "=                  =", "= = = = = = = = =  =", "=     =   =   =    =", "=                  =", "=                  =", "=   ================", "=    =             =", "=         =        =", "=                  =", "=                  =", "=                  =", "=      =           =", "=                  =", "=                  =", "====================" ] ];
});
Pc.max_dx = 2;
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"test.jsx": {
		Key: Key,
		Key$: Key$,
		Game: Game,
		Game$LHTMLCanvasElement$: Game$LHTMLCanvasElement$,
		_Main: _Main,
		_Main$: _Main$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"config.jsx": {
		Config: Config,
		Config$: Config$
	},
	"stage.jsx": {
		Direction: Direction,
		Direction$: Direction$,
		Up: Up,
		Up$: Up$,
		Right: Right,
		Right$: Right$,
		Down: Down,
		Down$: Down$,
		Left: Left,
		Left$: Left$,
		Region: Region,
		Region$: Region$,
		Outer: Outer,
		Outer$LDirection$: Outer$LDirection$,
		Inner: Inner,
		Inner$: Inner$,
		Stage: Stage,
		Stage$: Stage$
	},
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
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


}());
