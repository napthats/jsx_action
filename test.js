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

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};
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
	this.pc = undefined;
	this.enemies = undefined;
	this.items = undefined;
	this.isEnd = false;
	this.isStarted = false;
	this.stage_number = 0;
	canvas.width = 160;
	canvas.height = 240;
	this.ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext("2d"));
	this.ctx.font = "16px serif";
	this.pc = new Pc$NN(80, 231);
	this.enemies = Stage$getEnemies$();
	this.items = Stage.items[Stage.stage_number];
	body = dom.window.document.body;
	body.addEventListener("keydown", (function (e) {
		/** @type {KeyboardEvent} */
		var ke;
		if (e instanceof KeyboardEvent) {
			ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
			switch (ke.keyCode) {
			case 38:
				Key.up = true;
				break;
			case 39:
				Key.right = true;
				break;
			case 37:
				Key.left = true;
				break;
			case 90:
				Key.z = true;
				break;
			case 88:
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
			case 38:
				Key.up = false;
				break;
			case 39:
				Key.right = false;
				break;
			case 37:
				Key.left = false;
				break;
			case 90:
				Key.z = false;
				break;
			case 88:
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
	var $math_abs_t;
	/** @type {Bullet} */
	var bullet;
	/** @type {Region} */
	var inout;
	/** @type {Outer} */
	var out;
	/** @type {!number} */
	var i;
	/** @type {Array.<undefined|!number>} */
	var deadCheck;
	/** @type {Array.<undefined|Enemy>} */
	var newEnemies;
	/** @type {Enemy} */
	var enemy;
	/** @type {!number} */
	var j;
	/** @type {Enemy} */
	var aenemy;
	/** @type {MirrorEnemy} */
	var menemy;
	/** @type {ShotEnemy} */
	var senemy;
	/** @type {Array.<undefined|Enemy>} */
	var l;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var ord_x_l$0;
	/** @type {!number} */
	var ord_x_r$0;
	/** @type {!number} */
	var ord_y_d$0;
	/** @type {!number} */
	var ord_y_t$0;
	/** @type {Pc} */
	var this$0;
	/** @type {Enemy} */
	var this$1;
	if (this.isEnd) {
		return;
	}
	dom.window.setTimeout((function () {
		$this.tick$();
	}), 16.666666666666668);
	if (! this.isStarted) {
		this.ctx.clearRect(0, 0, 160, 240);
		this.ctx.fillText("Normal: z, Hard: x", 0, 120);
		if (Key.z) {
			Stage.difficulty = 0;
			this.isStarted = true;
		}
		if (Key.x) {
			Stage.difficulty = 1;
			this.isStarted = true;
		}
		return;
	}
	this.ctx.clearRect(0, 0, 160, 240);
	Stage$draw$LCanvasRenderingContext2D$(this.ctx);
	if (Key.right) {
		this.pc.move$N(1);
	}
	if (Key.left) {
		this.pc.move$N(-1);
	}
	if (Key.up || Key.z) {
		this.pc.jump$N(4.5);
	}
	if (Key.x) {
		bullet = this.pc.shot$();
		if (bullet) {
			this.enemies.push(bullet);
		}
	}
	this.pc.tick$();
	x$0 = this.pc.x;
	y$0 = this.pc.y;
	ord_x_l$0 = Math.floor(x$0 / 8);
	ord_x_r$0 = Math.floor(x$0 / 8) + 1;
	ord_y_d$0 = Math.floor(y$0 / 8);
	ord_y_t$0 = Math.floor(y$0 / 8) - 1;
	inout = (ord_x_l$0 < 0 ? new Outer$LDirection$(new Left$()) : ord_x_r$0 >= 20 ? new Outer$LDirection$(new Right$()) : ord_y_d$0 >= 30 ? new Outer$LDirection$(new Down$()) : ord_y_t$0 < 0 ? new Outer$LDirection$(new Up$()) : new Inner$());
	if (inout instanceof Inner) {
		this.pc.draw$LCanvasRenderingContext2D$(this.ctx);
	} else {
		if (inout instanceof Outer) {
			out = (function (o) { return o instanceof Outer ? o : null; })(inout);
			if (out.direction instanceof Up && Stage.stage_number === 1) {
				this.isEnd = true;
				this.ctx.clearRect(0, 0, 160, 240);
				this.ctx.fillText("Congratulation!", 40, 120);
				return;
			} else {
				if (out.direction instanceof Up && Stage.stage_number === 0) {
					Stage.stage_number = 1;
					this.enemies = Stage$getEnemies$();
					this.items = Stage.items[Stage.stage_number];
					this.pc.y = 232;
				} else {
					if (out.direction instanceof Down && Stage.stage_number === 1) {
						Stage.stage_number = 0;
						this.enemies = Stage$getEnemies$();
						this.items = Stage.items[Stage.stage_number];
						this.pc.y = 8;
					} else {
						if (out.direction instanceof Left && Stage.stage_number === 0) {
							Stage.stage_number = 2;
							this.enemies = Stage$getEnemies$();
							this.items = Stage.items[Stage.stage_number];
							this.pc.x = 152;
						} else {
							if (out.direction instanceof Right && Stage.stage_number === 2) {
								Stage.stage_number = 0;
								this.enemies = Stage$getEnemies$();
								this.items = Stage.items[Stage.stage_number];
								this.pc.x = 4;
							}
						}
					}
				}
			}
		}
	}
	for (i = 0; i < this.items.length; ++ i) {
		this.items[i].draw$LCanvasRenderingContext2D$(this.ctx);
		if (this.pc.hit$LObj$(this.items[i])) {
			this$0 = this.pc;
			this$0.can_shot = true;
			this.items.pop();
		}
	}
	deadCheck = [  ];
	newEnemies = [  ];
	for (i = 0; i < this.enemies.length; ++ i) {
		enemy = this.enemies[i];
		enemy.tick$();
		enemy.draw$LCanvasRenderingContext2D$(this.ctx);
		if (enemy instanceof Bullet) {
			for (j = 0; j < this.enemies.length; ++ j) {
				aenemy = this.enemies[j];
				if (i !== j && enemy.hit$LObj$(aenemy)) {
					-- enemy.hp;
					if (aenemy instanceof MirrorEnemy) {
						bullet = (function (o) { return o instanceof Bullet ? o : null; })(enemy);
						menemy = (function (o) { return o instanceof MirrorEnemy ? o : null; })(aenemy);
						newEnemies.push(menemy.mirror$N(bullet.dx));
					} else {
						-- aenemy.hp;
					}
				}
			}
		}
		this$1 = this.enemies[i];
		if (this$1.hp <= 0) {
			deadCheck.push(i);
		}
		if (this.pc.hit$LObj$(enemy)) {
			this.isEnd = true;
			this.ctx.clearRect(0, 0, 160, 240);
			this.ctx.fillText("Game Over", 40, 120);
			return;
		}
		if (enemy instanceof ShotEnemy && (($math_abs_t = this.pc.y - enemy.y) >= 0 ? $math_abs_t : -$math_abs_t) < 8) {
			senemy = (function (o) { return o instanceof ShotEnemy ? o : null; })(enemy);
			bullet = senemy.shot$N((($math_abs_t = this.pc.x - enemy.x) >= 0 ? $math_abs_t : -$math_abs_t) / (this.pc.x - enemy.x));
			if (bullet) {
				newEnemies.push(bullet);
			}
		}
	}
	for (i = 0; i < deadCheck.length; ++ i) {
		l = [  ];
		for (j = 0; j < this.enemies.length; ++ j) {
			if (deadCheck[i] != j) {
				l.push(this.enemies[j]);
			}
		}
		this.enemies = l;
	}
	for (i = 0; i < newEnemies.length; ++ i) {
		this.enemies.push(newEnemies[i]);
	}
};

/**
 * @param {!string} msg
 */
Game.prototype.gameEnd$S = function (msg) {
	this.isEnd = true;
	this.ctx.clearRect(0, 0, 160, 240);
	this.ctx.fillText(msg, 40, 120);
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
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S(args[0]));
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
	return dom.window.document.createElement(tag);
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
 * class Direction
 * @constructor
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
};

Left$.prototype = new Left;

/**
 * class Region
 * @constructor
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
	if (Stage.stage_number === 0) {
		return [ new WalkingEnemy$NNN(80, 200, 1), new WalkingEnemy$NNN(80, 160, 3), new WalkingEnemy$NNN(90, 60, 1) ];
	} else {
		if (Stage.stage_number === 1) {
			return [ new MirrorEnemy$NNN(80, 120, 0.5), new WalkingEnemy$NNN(80, 150, 3), new ShotEnemy$NNN(140, 120, 0), new MirrorEnemy$NNN(10, 40, 1), new WalkingEnemy$NNN(80, 200, 1), new FlyingEnemy$NNF$NHN$(70, 40, (function (tick_count) {
				/** @type {!number} */
				var dx;
				/** @type {!number} */
				var dy;
				dx = Math.sin(tick_count / 60 * 3.14);
				dy = Math.sin(tick_count / 60 * 3.14 / 2.2);
				return { "dx": dx, "dy": dy };
			})), new FlyingEnemy$NNF$NHN$(116, 160, (function (tick_count) {
				/** @type {!number} */
				var dy;
				dy = Math.sin(tick_count / 60 * 3.14);
				return { "dx": 0, "dy": dy };
			})) ];
		} else {
			if (Stage.stage_number === 2) {
				return [ new ShotEnemy$NNN(72, 60, 0), new ShotEnemy$NNN(143, 60, 0), new WalkingEnemy$NNN(80, 158, 3), new WalkingEnemy$NNN(100, 100, 3) ];
			}
		}
	}
	return [  ];
};

var Stage$getEnemies$ = Stage.getEnemies$;

/**
 * @return {Array.<undefined|Item>}
 */
Stage.getItems$ = function () {
	return Stage.items[Stage.stage_number];
};

var Stage$getItems$ = Stage.getItems$;

/**
 * @param {!number} d
 */
Stage.setDifficulty$N = function (d) {
	Stage.difficulty = d;
};

var Stage$setDifficulty$N = Stage.setDifficulty$N;

/**
 * @param {!number} _stage_number
 */
Stage.changeStage$N = function (_stage_number) {
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
	for (key in Stage.map[Stage.difficulty][Stage.stage_number]) {
		str = Stage.map[Stage.difficulty][Stage.stage_number][key];
		x_ord = 0;
		for (i = 0; i < str.length; ++ i) {
			context.fillText(Stage.map[Stage.difficulty][Stage.stage_number][key].charAt(i), 8 * x_ord, 8 * y_ord);
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
	ord_x_l = Math.floor(x / 8);
	ord_x_r = Math.floor(x / 8) + 1;
	ord_y_d = Math.floor(y / 8);
	ord_y_t = Math.floor(y / 8) - 1;
	return (ord_x_l < 0 ? new Outer$LDirection$(new Left$()) : ord_x_r >= 20 ? new Outer$LDirection$(new Right$()) : ord_y_d >= 30 ? new Outer$LDirection$(new Down$()) : ord_y_t < 0 ? new Outer$LDirection$(new Up$()) : new Inner$());
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
	ord_x_l = Math.floor(x / 8);
	ord_x_r = Math.floor(x / 8) + 1;
	ord_y_d = Math.floor(y / 8);
	ord_y_t = Math.floor(y / 8) - 1;
	return (ord_x_l < 0 || ord_x_r >= 20 || ord_y_d >= 30 || ord_y_t < 0 ? false : Stage.map[Stage.difficulty][Stage.stage_number][ord_y_d].charAt(ord_x_l) === ' ' && Stage.map[Stage.difficulty][Stage.stage_number][ord_y_d].charAt(ord_x_r) === ' ' && Stage.map[Stage.difficulty][Stage.stage_number][ord_y_t].charAt(ord_x_l) === ' ' && Stage.map[Stage.difficulty][Stage.stage_number][ord_y_t].charAt(ord_x_r) === ' ' ? false : true);
};

var Stage$isGround$NN = Stage.isGround$NN;

/**
 * class Obj
 * @constructor
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
	return (($math_abs_t = this.x - other.x) >= 0 ? $math_abs_t : -$math_abs_t) < 8 && (($math_abs_t = this.y - other.y) >= 0 ? $math_abs_t : -$math_abs_t) < 8;
};

/**
 * @param {!number} dx
 * @param {!number} dy
 * @return {!boolean}
 */
Obj.prototype.hitGround$NN = function (dx, dy) {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	/** @type {!number} */
	var ord_x_l$0;
	/** @type {!number} */
	var ord_x_r$0;
	/** @type {!number} */
	var ord_y_d$0;
	/** @type {!number} */
	var ord_y_t$0;
	x$0 = this.x + dx;
	y$0 = this.y + dy;
	ord_x_l$0 = Math.floor(x$0 / 8);
	ord_x_r$0 = Math.floor(x$0 / 8) + 1;
	ord_y_d$0 = Math.floor(y$0 / 8);
	ord_y_t$0 = Math.floor(y$0 / 8) - 1;
	return (ord_x_l$0 < 0 || ord_x_r$0 >= 20 || ord_y_d$0 >= 30 || ord_y_t$0 < 0 ? false : Stage.map[Stage.difficulty][Stage.stage_number][ord_y_d$0].charAt(ord_x_l$0) === ' ' && Stage.map[Stage.difficulty][Stage.stage_number][ord_y_d$0].charAt(ord_x_r$0) === ' ' && Stage.map[Stage.difficulty][Stage.stage_number][ord_y_t$0].charAt(ord_x_l$0) === ' ' && Stage.map[Stage.difficulty][Stage.stage_number][ord_y_t$0].charAt(ord_x_r$0) === ' ' ? false : true);
};

/**
 * @return {!boolean}
 */
Obj.prototype.isOuter$ = function () {
	return (Stage$checkInner$NN(this.x, this.y) instanceof Outer ? true : false);
};

/**
 * @param {CanvasRenderingContext2D} context
 */
Obj.prototype.draw$LCanvasRenderingContext2D$ = function (context) {
	context.fillText(this.character, this.x, this.y);
};

/**
 * class Item extends Object
 * @constructor
 */
function Item() {
}

Item.prototype = new Object;
$__jsx_merge_interface(Item, Obj);

/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 */
function Item$NN(_x, _y) {
	this.x = _x;
	this.y = _y;
	this.character = "%";
};

Item$NN.prototype = new Item;

/**
 */
Item.prototype.tick$ = function () {
};

/**
 * class Enemy
 * @constructor
 */
function Enemy() {
}

$__jsx_merge_interface(Enemy, Obj);

Enemy.prototype.$__jsx_implements_Enemy = true;

/**
 * @constructor
 */
function Enemy$() {
};

Enemy$.prototype = new Enemy;

/**
 * @return {!boolean}
 */
Enemy.prototype.isDead$ = function () {
	return this.hp <= 0;
};

/**
 */
Enemy.prototype.damage$ = function () {
	-- this.hp;
};

/**
 * class Bullet extends Object
 * @constructor
 */
function Bullet() {
}

Bullet.prototype = new Object;
$__jsx_merge_interface(Bullet, Enemy);

/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 * @param {!number} _dx
 */
function Bullet$NNN(_x, _y, _dx) {
	this.x = _x;
	this.y = _y;
	this.character = ":";
	this.dx = _dx;
	this.hp = 1;
};

Bullet$NNN.prototype = new Bullet;

/**
 */
Bullet.prototype.tick$ = function () {
	if (this.hitGround$NN(this.dx, 0)) {
		this.hp = 0;
	} else {
		this.x += this.dx;
	}
};

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
	this.x = _x;
	this.y = _y;
	this.character = "F";
	this.get_delta = _get_delta;
	this.tick_count = 0;
	this.hp = 3;
};

FlyingEnemy$NNF$NHN$.prototype = new FlyingEnemy;

/**
 */
FlyingEnemy.prototype.tick$ = function () {
	/** @type {Object.<string, undefined|!number>} */
	var delta;
	delta = this.get_delta(this.tick_count);
	if (! this.hitGround$NN(delta.dx, delta.dy)) {
		this.x += delta.dx;
		this.y += delta.dy;
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
			if (this.dy <= 0 && this.hitGround$NN(0, -1)) {
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
	this.x = _x;
	this.y = _y;
	this.character = "E";
	this.dx = 0;
	this.dy = 0;
	this.onGround = false;
	this.dx = _dx;
	this.hp = 3;
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
 * class ShotEnemy extends WalkingEnemy
 * @constructor
 */
function ShotEnemy() {
}

ShotEnemy.prototype = new WalkingEnemy;
/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 * @param {!number} _dx
 */
function ShotEnemy$NNN(_x, _y, _dx) {
	this.x = _x;
	this.y = _y;
	this.character = "E";
	this.dx = 0;
	this.dy = 0;
	this.onGround = false;
	this.dx = _dx;
	this.hp = 3;
	this.character = "S";
	this.shot_delay = 0;
};

ShotEnemy$NNN.prototype = new ShotEnemy;

/**
 * @param {!number} dx
 * @return {Bullet}
 */
ShotEnemy.prototype.shot$N = function (dx) {
	if (this.shot_delay) {
		return undefined;
	}
	this.shot_delay = 90;
	return new Bullet$NNN(this.x + ((dx >= 0 ? dx : - dx) / dx * 8 + dx), this.y, dx);
};

/**
 */
ShotEnemy.prototype.tick$ = function () {
	WalkingEnemy.prototype.tick$.call(this);
	if (this.shot_delay) {
		-- this.shot_delay;
	}
};

/**
 * class MirrorEnemy extends WalkingEnemy
 * @constructor
 */
function MirrorEnemy() {
}

MirrorEnemy.prototype = new WalkingEnemy;
/**
 * @constructor
 * @param {!number} _x
 * @param {!number} _y
 * @param {!number} _dx
 */
function MirrorEnemy$NNN(_x, _y, _dx) {
	this.x = _x;
	this.y = _y;
	this.character = "E";
	this.dx = 0;
	this.dy = 0;
	this.onGround = false;
	this.dx = _dx;
	this.hp = 3;
	this.character = "M";
};

MirrorEnemy$NNN.prototype = new MirrorEnemy;

/**
 * @param {!number} dx
 * @return {Bullet}
 */
MirrorEnemy.prototype.mirror$N = function (dx) {
	return new Bullet$NNN(this.x - (dx >= 0 ? dx : - dx) / dx * 8 * 2 - dx, this.y, - dx);
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
	this.x = _x;
	this.y = _y;
	this.character = "@";
	this.dx = 0;
	this.dy = 0;
	this.onGround = false;
	this.dir = 1;
	this.shot_delay = 0;
	this.can_shot = false;
};

Pc$NN.prototype = new Pc;

/**
 * @param {!number} pow
 */
Pc.prototype.move$N = function (pow) {
	var $math_abs_t;
	if (pow > 0) {
		this.dir = 1;
	} else {
		this.dir = -1;
	}
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
Pc.prototype.enableShot$ = function () {
	this.can_shot = true;
};

/**
 * @return {Bullet}
 */
Pc.prototype.shot$ = function () {
	if (! this.can_shot || this.shot_delay) {
		return undefined;
	}
	this.shot_delay = 30;
	return new Bullet$NNN(this.x + this.dir * (8 + Pc.shot_dx), this.y, this.dir * Pc.shot_dx);
};

/**
 */
Pc.prototype.tick$ = function () {
	var $math_abs_t;
	if (this.shot_delay) {
		-- this.shot_delay;
	}
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
Config.startMessage = "Normal: z, Hard: x";
Stage.stage_number = 0;
Stage.difficulty = 1;
$__jsx_lazy_init(Stage, "items", function () {
	return [ [  ], [  ], [ new Item$NN(124, 216) ] ];
});
$__jsx_lazy_init(Stage, "map", function () {
	return [ [ [ "============       =", "=                  =", "                   =", "             ==    =", "                   =", "=   ====           =", "=   ====           =", "=              =   =", "=              =   =", "=              =   =", "=        =======   =", "====               =", "=                  =", "=   ==             =", "=                  =", "=                  =", "=        ====      =", "=                  =", "=                  =", "=                  =", "=                  =", "==============   ===", "=       ======     =", "=                  =", "=                  =", "=                  =", "=   ================", "=                  =", "=                  =", "====================" ], [ "===     ============", "=                  =", "=                  =", "=                  =", "=      =           =", "=                  =", "=                  =", "=                  =", "=                  =", "=           ====   =", "=                  =", "=                  =", "=                  =", "======             =", "=                  =", "=                  =", "=        ========  =", "=                ===", "=                  =", "=                  =", "=                  =", "==============   ===", "=                  =", "=                  =", "=   ====     =     =", "=                  =", "=        === =     =", "=                  =", "=                  =", "============       =" ], [ "====================", "=                  =", "=                   ", "=                   ", "=                   ", "=             ======", "=                  =", "=                  =", "=               =  =", "=               =  =", "=   =    =      ====", "=                  =", "=                  =", "=      =============", "=                  =", "=                  =", "=  == = = = = = =  =", "=     =   =   =    =", "=                  =", "=                  =", "=   ================", "=    =             =", "=         =        =", "==                 =", "=           =      =", "=                  =", "=      =           =", "=              ==  =", "=              ==  =", "====================" ] ], [ [ "============       =", "=      =           =", "       =           =", "       =     ===   =", "=                  =", "=   ====           =", "=   ====           =", "=              =   =", "=              =   =", "=              =   =", "=        =======   =", "=   =              =", "=                  =", "=                  =", "=                  =", "=                  =", "=        ====== =  =", "=                  =", "=                  =", "=                  =", "=                  =", "================   =", "=   ============   =", "=   ============   =", "=                  =", "=                  =", "=   ================", "=                  =", "=                  =", "====================" ], [ "===    =============", "=                  =", "=                  =", "=                  =", "=      =           =", "=                  =", "=                  =", "=                  =", "=                  =", "=              =   =", "=                  =", "=                  =", "=                  =", "======             =", "=                  =", "=                  =", "=        ====      =", "=                  =", "=                  =", "=                  =", "=                  =", "==============   ===", "=         =        =", "=         =        =", "=   ====     ==    =", "=      =     =     =", "=      =======     =", "=                  =", "=                  =", "============       =" ], [ "====================", "=                  =", "=                   ", "=                   ", "=                  =", "=             =    =", "=                  =", "=                  =", "=                  =", "=                  =", "=        =         =", "=                  =", "=                  =", "=    ===============", "=                  =", "=                  =", "= = = = = = = = =  =", "=     =   =   =    =", "=                  =", "=                  =", "=   ================", "=    =             =", "=         =        =", "==                 =", "=           =      =", "=                  =", "=      =           =", "=              ==  =", "=              ==  =", "====================" ] ] ];
});
Pc.max_dx = 2;
Pc.shot_dx = 3;
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
		Item: Item,
		Item$NN: Item$NN,
		Enemy: Enemy,
		Enemy$: Enemy$,
		Bullet: Bullet,
		Bullet$NNN: Bullet$NNN,
		FlyingEnemy: FlyingEnemy,
		FlyingEnemy$NNF$NHN$: FlyingEnemy$NNF$NHN$,
		WalkingObj: WalkingObj,
		WalkingObj$NNS: WalkingObj$NNS,
		WalkingEnemy: WalkingEnemy,
		WalkingEnemy$NNN: WalkingEnemy$NNN,
		ShotEnemy: ShotEnemy,
		ShotEnemy$NNN: ShotEnemy$NNN,
		MirrorEnemy: MirrorEnemy,
		MirrorEnemy$NNN: MirrorEnemy$NNN,
		Pc: Pc,
		Pc$NN: Pc$NN
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


})();
