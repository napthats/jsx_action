import 'js/web.jsx';
import 'config.jsx';
import 'obj.jsx';


interface Direction {}
class Up implements Direction {}
class Right implements Direction {}
class Down implements Direction {}
class Left implements Direction {}

interface Region {}
class Outer implements Region {
    var direction : Direction;
    function constructor(d : Direction) {this.direction = d;}
}
class Inner implements Region {}


final class Stage {
    static var stage_number = 0;
    static var difficulty = 1;

    static const items = [
        [] : Array.<Item>,
        [] : Array.<Item>,
        [new Item(124, 216)]
    ];

    static const enemies = [
//
//        [new WalkingEnemy(0,0,0) as Enemy],[new WalkingEnemy(10,40,1) as Enemy],[new WalkingEnemy(0,0,0) as Enemy]];
        [new WalkingEnemy(80, 200, 1) as Enemy,
         new WalkingEnemy(90, 60, 1) as Enemy
        ],
        [new WalkingEnemy(80, 120, 0.5) as Enemy,
         new WalkingEnemy(80, 150, 3) as Enemy,
         new ShotEnemy(140, 120, 0) as Enemy,
         new WalkingEnemy(10, 40, 1) as Enemy,
         new WalkingEnemy(80, 200, 1) as Enemy,
         new FlyingEnemy(70, 40,
             function(tick_count : number) : Map.<number> {
                 var dx = Math.sin(tick_count / Config.fps * 3.14);
                 var dy = Math.sin(tick_count / Config.fps * 3.14 / 2.2);
                 return {"dx": dx, "dy": dy};}
         ) as Enemy,
         new FlyingEnemy(120, 160,
             function(tick_count : number) : Map.<number> {
                 var dy = Math.sin(tick_count / Config.fps * 3.14);
                 return {"dx": 0, "dy": dy};}
         ) as Enemy
        ],
        [new ShotEnemy(72, 60, 0) as Enemy,
         new WalkingEnemy(80, 158, 3) as Enemy,
         new WalkingEnemy(100, 100, 3) as Enemy
        ]];

    static const map = [
        [[
        "============       =",
        "=                  =",
        "                   =",
        "             ==    =",
        "                   =",
        "=   ====           =",
        "=   ====           =",
        "=              =   =",
        "=              =   =",
        "=              =   =",
        "=        =======   =",
        "====               =",
        "=                  =",
        "=   ==             =",
        "=                  =",
        "=                  =",
        "=        ====      =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "==============   ===",
        "=       ======     =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=   ================",
        "=                  =",
        "=                  =",
        "===================="
        ],
        [
        "===     ============",
        "=                  =",
        "=                  =",
        "=                  =",
        "=      =           =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=           ====   =",
        "=                  =",
        "=                  =",
        "=                  =",
        "======             =",
        "=                  =",
        "=                  =",
        "=        ========  =",
        "=                ===",
        "=                  =",
        "=                  =",
        "=                  =",
        "==============   ===",
        "=                  =",
        "=                  =",
        "=   ====     =     =",
        "=                  =",
        "=        === =     =",
        "=                  =",
        "=                  =",
        "============       ="
        ],
        [
        "====================",
        "=                  =",
        "=                   ",
        "=                   ",
        "=                   ",
        "=             ======",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=   =    =        ==",
        "=                  =",
        "=                  =",
        "=      =============",
        "=                  =",
        "=                  =",
        "=  == = = = = = =  =",
        "=     =   =   =    =",
        "=                  =",
        "=                  =",
        "=   ================",
        "=    =             =",
        "=         =        =",
        "==                 =",
        "=           =      =",
        "=                  =",
        "=      =           =",
        "=              ==  =",
        "=              ==  =",
        "===================="
        ]],
        [[
        "============       =",
        "=      =           =",
        "       =           =",
        "       =     ===   =",
        "=                  =",
        "=   ====           =",
        "=   ====           =",
        "=              =   =",
        "=              =   =",
        "=              =   =",
        "=        =======   =",
        "=  =               =",
        "=                  =",
        "=   ==             =",
        "=                  =",
        "=                  =",
        "=        ====      =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "==============   ===",
        "=       ======     =",
        "=       ======     =",
        "=                  =",
        "=               ====",
        "=   ================",
        "=                  =",
        "=                  =",
        "===================="
        ],
        [
        "===    =============",
        "=                  =",
        "=                  =",
        "=                  =",
        "=      =           =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=              =   =",
        "=                  =",
        "=                  =",
        "=                  =",
        "======             =",
        "=                  =",
        "=                  =",
        "=        ====      =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "==============   ===",
        "=         =        =",
        "=         =        =",
        "=   ====     =     =",
        "=      =     =     =",
        "=      =======     =",
        "=                  =",
        "=                  =",
        "============       ="
        ],
        [
        "====================",
        "=                  =",
        "=                   ",
        "=                   ",
        "=                  =",
        "=             =    =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=        =         =",
        "=                  =",
        "=                  =",
        "=    ===============",
        "=                  =",
        "=                  =",
        "= = = = = = = = =  =",
        "=     =   =   =    =",
        "=                  =",
        "=                  =",
        "=   ================",
        "=    =             =",
        "=         =        =",
        "==                 =",
        "=           =      =",
        "=                  =",
        "=      =           =",
        "=              ==  =",
        "=              ==  =",
        "===================="
        ]]];



    static function getEnemies() : Array.<Enemy> {
        return Stage.enemies[Stage.stage_number];
    }

    static function getItems() : Array.<Item> {
        return Stage.items[Stage.stage_number];
    }

    static function setDifficulty(d : number) : void {
        assert(d == 0 || d == 1);
        Stage.difficulty = d;
    }

    static function changeStage(_stage_number : number) : void {
        assert(_stage_number == 0 || _stage_number == 1 || _stage_number == 2);
        Stage.stage_number = _stage_number;
    }

    static function draw(context : CanvasRenderingContext2D) : void {
        var y_ord = 1;
        for (var key in Stage.map[Stage.difficulty][Stage.stage_number]) {
            var str = Stage.map[Stage.difficulty][Stage.stage_number][key];
            var x_ord = 0;
            for (var i = 0; i < str.length; ++i) {
                context.fillText(
                    Stage.map[Stage.difficulty][Stage.stage_number][key].charAt(i),
                    Config.objWidth * x_ord,
                    Config.objHeight * y_ord
                );
                x_ord += 1;
            }
            y_ord += 1;
        }
    }

    static function checkInner(x : number, y : number) : Region {
        var ord_x_l = Math.floor(x / Config.objWidth);
        var ord_x_r = Math.floor(x / Config.objWidth) + 1;
        var ord_y_d = Math.floor(y / Config.objHeight);
        var ord_y_t = Math.floor(y / Config.objHeight) - 1;
        if (ord_x_l < 0) return new Outer(new Left);
        else if (ord_x_r >= 20) return new Outer(new Right);
        else if (ord_y_d >= 30) return new Outer(new Down);
        else if (ord_y_t < 0) return new Outer(new Up);
        else return new Inner();
    }

    static function isGround(x : number, y : number) : boolean {
        var ord_x_l = Math.floor(x / Config.objWidth);
        var ord_x_r = Math.floor(x / Config.objWidth) + 1;
        var ord_y_d = Math.floor(y / Config.objHeight);
        var ord_y_t = Math.floor(y / Config.objHeight) - 1;
        if (ord_x_l < 0 || ord_x_r >= 20 || ord_y_d >= 30 || ord_y_t < 0) return false;
        if (Stage.map[Stage.difficulty][Stage.stage_number][ord_y_d].charAt(ord_x_l) == ' ' &&
            Stage.map[Stage.difficulty][Stage.stage_number][ord_y_d].charAt(ord_x_r) == ' ' &&
            Stage.map[Stage.difficulty][Stage.stage_number][ord_y_t].charAt(ord_x_l) == ' ' &&
            Stage.map[Stage.difficulty][Stage.stage_number][ord_y_t].charAt(ord_x_r) == ' ')
                return false;
        else return true;
    }
}
