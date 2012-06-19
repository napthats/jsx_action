import 'js/web.jsx';
import 'config.jsx';
import 'stage.jsx';
import 'obj.jsx';

final class Key {
    static const up_code = 38;
    static const right_code = 39;
//    static const down_code = 40;
    static const left_code = 37;
    static const z_code = 90;
    static const x_code = 88;

    static var up = false;
    static var right = false;
//    static var down = false;
    static var left = false;
    static var z = false;
    static var x = false;
}


final class Game {
    var pc : Pc;
    var enemies : Array.<Enemy>;
    var ctx : CanvasRenderingContext2D;
    var isEnd : boolean;
    var stage_number : number;

    function constructor(canvas : HTMLCanvasElement) {
        this.isEnd = false;
        this.stage_number = 0;

        canvas.width = Config.canvasWidth;
        canvas.height = Config.canvasHeight;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        assert this.ctx != null;
        this.ctx.font = Config.font;

        this.pc = new Pc(Config.defaultX, Config.defaultY);

        this.enemies = Stage.getEnemies();

        var body = dom.window.document.body;
        body.addEventListener(
            "keydown",
            function(e : Event) : void {
                if (e instanceof KeyboardEvent) {
                    var ke = e as KeyboardEvent;
                    switch (ke.keyCode) {
                        case Key.up_code: {Key.up = true; break;}
                        case Key.right_code: {Key.right = true; break;}
                        case Key.left_code: {Key.left = true; break;}
                        case Key.z_code: {Key.z = true; break;}
                        case Key.x_code: {Key.x = true; break;}
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
                        case Key.left_code: {Key.left = false; break;}
                        case Key.z_code: {Key.z = false; break;}
                        case Key.x_code: {Key.x = false; break;}
                    }
                }
            }
        );
    }

    function tick() : void {
        if (this.isEnd) return;

        dom.window.setTimeout(function() : void {this.tick();}, (1000 / Config.fps));

        this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
  
        Stage.draw(this.ctx);
      
        if (Key.right) this.pc.move(1);
        if (Key.left) this.pc.move(-1);
        if (Key.up || Key.z) this.pc.jump(4.5);

        this.pc.tick();

        var inout = Stage.checkInner(this.pc.x, this.pc.y);
        if (inout instanceof Inner) this.pc.draw(this.ctx);
        else if (inout instanceof Outer) {
            var out = inout as Outer;
            if (out.direction instanceof Up && Stage.stage_number == 1) {
                this.gameEnd(Config.goalMessage);
                return;
            }
            else if (out.direction instanceof Up && Stage.stage_number == 0) {
                Stage.changeStage(1);
                this.enemies = Stage.getEnemies();
                this.pc.y = Config.canvasHeight - Config.objHeight;
            }
            else if (out.direction instanceof Down && Stage.stage_number == 1) {
                Stage.changeStage(0);
                this.enemies = Stage.getEnemies();
                this.pc.y = 0 + Config.objHeight;
            }            
            else if (out.direction instanceof Left && Stage.stage_number == 0) {
                Stage.changeStage(2);
                this.enemies = Stage.getEnemies();
                this.pc.x = Config.canvasWidth - Config.objWidth;
            }
            else if (out.direction instanceof Right && Stage.stage_number == 2) {
                Stage.changeStage(0);
                this.enemies = Stage.getEnemies();
                this.pc.x = 0 + Config.objWidth/2;
            }            
            else assert(false);
        }
        else assert(false);

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
