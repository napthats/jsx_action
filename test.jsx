import 'js/web.jsx';

final class Config {
    static const objWidth = 8;
    static const objHeight = 8;
    static const canvasWidth = 160;
    static const canvasHeight = 240;
    static const defaultX = 80;
    static const defaultY = 231;
    static const fps = 60;
    static const font = "16px serif";
    static const messageX = 40;
    static const messageY = 120;
    static const goalMessage = "Congratulation!";
    static const deadMessage = "Game Over";
}

final class Ground {
    static const map = [
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
        "=   ==             =",
        "=                  =",
        "=                  =",
        "=        ====      =",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "==============   ===",
        "=                  =",
        "=                  =",
        "=                  =",
        "=                  =",
        "==   ===============",
        "=                  =",
        "=                  =",
        "===================="
        ];

    static function draw(context : CanvasRenderingContext2D) : void {
        var y_ord = 1;
        for (var key in Ground.map) {
            var str = Ground.map[key];
            var x_ord = 0;
            for (var i = 0; i < str.length; ++i) {
                context.fillText(
                    Ground.map[key].charAt(i),
                    Config.objWidth * x_ord,
                    Config.objHeight * y_ord
                );
                x_ord += 1;
            }
            y_ord += 1;
        }
    }

    static function isGround(x : number, y : number) : boolean {
        var ord_x_l = Math.floor(x / Config.objWidth);
        var ord_x_r = Math.floor(x / Config.objWidth) + 1;
        var ord_y_d = Math.floor(y / Config.objHeight);
        var ord_y_t = Math.floor(y / Config.objHeight) - 1;
        if (ord_x_l < 0 || ord_x_r >= 20 || ord_y_d >= 30 || ord_y_t < 0) return true;
        if (Ground.map[ord_y_d].charAt(ord_x_l) == ' ' &&
            Ground.map[ord_y_d].charAt(ord_x_r) == ' ' &&
            Ground.map[ord_y_t].charAt(ord_x_l) == ' ' &&
            Ground.map[ord_y_t].charAt(ord_x_r) == ' ')
                return false;
        else return true;
    }
}


final class Key {
    static const up_code = 38;
    static const right_code = 39;
    static const down_code = 40;
    static const left_code = 37;

    static var up = false;
    static var right = false;
    static var down = false;
    static var left = false;
}

mixin Obj {
    abstract var x : number;
    abstract var y : number;

    abstract var character : string;

    function hit(other : Obj) : boolean {
        return Math.abs(this.x - other.x) < Config.objWidth
        && Math.abs(this.y - other.y) < Config.objHeight;
    }

    function hitGround(dx : number, dy : number) : boolean {
        return Ground.isGround(this.x + dx, this.y + dy);
    }    

    function draw(context : CanvasRenderingContext2D) : void {
        context.fillText(
            this.character,
            this.x,
            this.y
        );
    }

    abstract function tick() : void;
}

final class Enemy implements Obj {
    var x : number;
    var y : number;
    var dx : number;
    var dy : number;
    var onGround : boolean;
    var character : string;

    function constructor(_x : number, _y : number, _dx : number) {
        this.x = _x;
        this.y = _y;
        this.dx = _dx;
        this.dy = 0;
        this.onGround = false;
        this.character = "E";
    }

    override function tick() : void {
        if (this.onGround && !this.hitGround(this.dx, 0) && this.hitGround(this.dx, 1))
            this.x += this.dx;
        else this.dx = -this.dx;

        if (this.hitGround(0, 1)) {this.dy = 0; this.onGround = true;}
        else {
            this.onGround = false;
            this.dy += 0.2;
            if (this.hitGround(0, this.dy)) this.y += 1;
            else this.y += this.dy;
        }
    }
}

final class Pc implements Obj {
    static var max_dx = 2;

    var x : number;
    var y : number;

    var onGround : boolean;

    var dx : number;
    var dy : number;

    var character : string;

    function constructor(_x : number, _y : number) {
        this.x = _x;
        this.y = _y;
        this.character = "@";
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
    }

    function move(pow : number) : void {
        if (Math.abs(this.dx + pow/10) <= Pc.max_dx) this.dx += pow/10;
    }

    function jump(pow : number) : void {
        if (this.onGround) this.dy = -pow;
    }

    override function tick() : void {
        if (Math.abs(this.dx) >= 0.1) {this.dx -= 0.05 * (Math.abs(this.dx) / this.dx);}
        else {this.dx = 0;}

        if (this.hitGround(this.dx, 0)) this.dx = 0;
        else this.x += this.dx;

        if (this.dy >= 0 && this.hitGround(0, 1)) {this.dy = 0; this.onGround = true;}
        else {
            this.dy += 0.2;
            this.onGround = false;
            if (this.dy <= 0 && this.hitGround(0, -1)) this.dy = 0;
            else {
                if (this.hitGround(0, this.dy)) this.y += 1;
                else this.y += this.dy;
            }
        }
    }
}

final class Game {
    var pc : Pc;
    var enemies : Array.<Enemy>;
    var ctx : CanvasRenderingContext2D;
    var isEnd : boolean;

    function constructor(canvas : HTMLCanvasElement) {
        this.isEnd = false;

        canvas.width = Config.canvasWidth;
        canvas.height = Config.canvasHeight;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        assert this.ctx != null;
        this.ctx.font = Config.font;

        this.pc = new Pc(Config.defaultX, Config.defaultY);

        this.enemies = [new Enemy(80, 120, 1), new Enemy(80, 150, 1)];

        var body = dom.window.document.body;
        body.addEventListener(
            "keydown",
            function(e : Event) : void {
                if (e instanceof KeyboardEvent) {
                    var ke = e as KeyboardEvent;
                    switch (ke.keyCode) {
                        case Key.up_code: {Key.up = true; break;}
                        case Key.right_code: {Key.right = true; break;}
                        case Key.down_code: {Key.down = true; break;}
                        case Key.left_code: {Key.left = true; break;}
                    }
                }
            }
        );
        body.addEventListener(
            "keyup",
            function(e : Event) : void {
                if (e instanceof KeyboardEvent) {
                    var ke = e as KeyboardEvent;
                    switch (ke.keyCode) {
                        case Key.up_code: {Key.up = false; break;}
                        case Key.right_code: {Key.right = false; break;}
                        case Key.down_code: {Key.down = false; break;}
                        case Key.left_code: {Key.left = false; break;}
                    }
                }
            }
        );
    }

    function tick() : void {
        if (this.isEnd) return;

        dom.window.setTimeout(function() : void {this.tick();}, (1000 / Config.fps));

        this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
  
        Ground.draw(this.ctx);
      
        if (Key.right) this.pc.move(1);
        if (Key.left) this.pc.move(-1);
        if (Key.up) this.pc.jump(4.5);

        this.pc.tick();
        if (this.pc.y - Config.objHeight * 1.5 > 0) this.pc.draw(this.ctx);
        else {this.gameEnd(Config.goalMessage); return;}

        for (var i = 0; i < this.enemies.length; ++i) {
            this.enemies[i].tick();
            this.enemies[i].draw(this.ctx);
            
            if (this.pc.hit(this.enemies[i])) {this.gameEnd(Config.deadMessage); return;}
        }
    }

    function gameEnd(msg : string) : void {
        this.isEnd = true;
        this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
        this.ctx.fillText(msg, Config.messageX, Config.messageY);
    }
}

final class _Main {
    static function main(args : string[]) : void {
        var canvas = dom.id(args[0]) as HTMLCanvasElement;
        assert canvas != null;

        var game = new Game(canvas);
        game.tick();
    }
}
