import 'js/web.jsx';
import 'config.jsx';
import 'ground.jsx';
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
  
        Ground.draw(this.ctx);
      
        if (Key.right) this.pc.move(1);
        if (Key.left) this.pc.move(-1);
        if (Key.up || Key.z) this.pc.jump(4.5);

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
