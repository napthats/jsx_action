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
    var items : Array.<Item>;
    var ctx : CanvasRenderingContext2D;
    var isEnd : boolean;
    var isStarted : boolean;
    var stage_number : number;

    function constructor(canvas : HTMLCanvasElement) {
        this.isEnd = false;
        this.isStarted = false;
        this.stage_number = 0;

        canvas.width = Config.canvasWidth;
        canvas.height = Config.canvasHeight;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        assert this.ctx != null;
        this.ctx.font = Config.font;

        this.pc = new Pc(Config.defaultX, Config.defaultY);

        this.enemies = Stage.getEnemies();

        this.items = Stage.getItems();

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

        if (!this.isStarted) {
            this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
            this.ctx.fillText(Config.startMessage, 0, Config.messageY);
            if (Key.z) {Stage.setDifficulty(0); this.isStarted = true;}
            if (Key.x) {Stage.setDifficulty(1); this.isStarted = true;}
            return;
        }

        this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
        Stage.draw(this.ctx);
      
        if (Key.right) this.pc.move(1);
        if (Key.left) this.pc.move(-1);
        if (Key.up || Key.z) this.pc.jump(4.5);
        if (Key.x) {
            var bullet = this.pc.shot();
            if (bullet) this.enemies.push(bullet);
        }

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
                this.items = Stage.getItems();
                this.pc.y = Config.canvasHeight - Config.objHeight;
            }
            else if (out.direction instanceof Down && Stage.stage_number == 1) {
                Stage.changeStage(0);
                this.enemies = Stage.getEnemies();
                this.items = Stage.getItems();
                this.pc.y = 0 + Config.objHeight;
            }            
            else if (out.direction instanceof Left && Stage.stage_number == 0) {
                Stage.changeStage(2);
                this.enemies = Stage.getEnemies();
                this.items = Stage.getItems();
                this.pc.x = Config.canvasWidth - Config.objWidth;
            }
            else if (out.direction instanceof Right && Stage.stage_number == 2) {
                Stage.changeStage(0);
                this.enemies = Stage.getEnemies();
                this.items = Stage.getItems();
                this.pc.x = 0 + Config.objWidth/2;
            }            
            else assert(false);
        }
        else assert(false);

        for (var i = 0; i < this.items.length; ++i) {
            this.items[i].draw(this.ctx);
            if (this.pc.hit(this.items[i])) {
                this.pc.enableShot();
                this.items.pop();
            }
        }

        var deadCheck = [] : Array.<number>;
        var newEnemies = [] : Array.<Enemy>;
        for (var i = 0; i < this.enemies.length; ++i) {
            var enemy : Enemy = this.enemies[i];
            enemy.tick();
            enemy.draw(this.ctx);
            

            if (enemy instanceof Bullet) {
                for (var j = 0; j < this.enemies.length; ++j) {
                    var aenemy : Enemy = this.enemies[j];
                    if (i != j && enemy.hit(aenemy)) {
                        enemy.damage();
                        if (aenemy instanceof MirrorEnemy) {
                            var bullet = enemy as Bullet;
                            var menemy = aenemy as MirrorEnemy;
                            newEnemies.push(menemy.mirror(bullet.dx));
                        }
                        else aenemy.damage();
                    }
                }
            }
            
            if (this.enemies[i].isDead()) deadCheck.push(i);

            if (this.pc.hit(enemy)) {this.gameEnd(Config.deadMessage); return;}

            if (enemy instanceof ShotEnemy && Math.abs(this.pc.y - enemy.y) < Config.objHeight) {
                var senemy = enemy as ShotEnemy;
                var bullet = senemy.shot(Math.abs(this.pc.x - enemy.x) / (this.pc.x - enemy.x));
                if (bullet) newEnemies.push(bullet);
            }
        }
        for (var i = 0; i < deadCheck.length; ++i) {
            var l = [] : Array.<Enemy>;
            for (var j = 0; j < this.enemies.length; ++j) {
                if (deadCheck[i] != j) l.push(this.enemies[j]);
            }
            this.enemies = l;
        }
        for (var i = 0; i < newEnemies.length; ++i) {
            this.enemies.push(newEnemies[i]);
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
