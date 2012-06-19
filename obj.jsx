import 'js/web.jsx';
import 'config.jsx';
import 'stage.jsx';


mixin Obj {
    abstract var x : number;
    abstract var y : number;

    abstract var character : string;


    function hit(other : Obj) : boolean {
        return Math.abs(this.x - other.x) < Config.objWidth
        && Math.abs(this.y - other.y) < Config.objHeight;
    }

    function hitGround(dx : number, dy : number) : boolean {
        return Stage.isGround(this.x + dx, this.y + dy);
    }    

    function isOuter() : boolean {
        if (Stage.checkInner(this.x, this.y) instanceof Outer) return true;
        else return false;
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

class Item implements Obj {
    var x : number;
    var y : number;
    var character : string;

    function constructor(_x : number, _y : number) {
        this.x = _x;
        this.y = _y;
        this.character = "%";
    }

    override function tick() : void {}
}

mixin Enemy implements Obj {
    abstract var hp : number;

    function isDead() : boolean {
        return this.hp <= 0;
    }

    function damage() : void {
        --this.hp;
    }
}

class Bullet implements Enemy {
    var x : number;
    var y : number;
    var character : string;
    var dx : number;
    var hp : number;

    function constructor(_x : number, _y : number, _dx : number) {
        this.x = _x;
        this.y = _y;
        this.character = ":";
        this.dx = _dx;
        this.hp = 1;
    }

    override function tick() : void {
        if (this.hitGround(this.dx, 0)) this.hp = 0;
        else this.x += this.dx;
    }
}

class FlyingEnemy implements Obj, Enemy {
    var x : number;
    var y : number;
    var character : string;
    var get_delta : function(:number) : Map.<number>;
    var tick_count : number;
    var hp : number;

    function constructor(
        _x : number, _y : number, _get_delta : function(:number) : Map.<number>
    ) {
        this.x = _x;
        this.y = _y;
        this.character = "F";
        this.get_delta = _get_delta;
        this.tick_count = 0;
        this.hp = 3;
    }

    override function tick() : void {
        var delta = this.get_delta(this.tick_count);
        assert(delta["dx"] != undefined);
        assert(delta["dy"] != undefined);

        if (!this.hitGround(delta["dx"], delta["dy"])) {
            this.x += delta["dx"];
            this.y += delta["dy"];
        }
        
        ++this.tick_count;
    }
}

abstract class WalkingObj implements Obj {
    var x : number;
    var y : number;
    var dx : number;
    var dy : number;
    var onGround : boolean;
    var character : string;

    function constructor(_x : number, _y : number, _character : string) {
        this.x = _x;
        this.y = _y;
        this.character = _character;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
    }

    override function tick() : void {
        if (this.isOuter()) return;
        else if (this.dy >= 0 && this.hitGround(0, 1)) {this.dy = 0; this.onGround = true;}
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

class WalkingEnemy extends WalkingObj implements Enemy {
    var hp : number;

    function constructor(_x : number, _y : number, _dx : number) {
        super(_x, _y, "E");
        this.dx = _dx;
        this.hp = 3;
    }

    override function tick() : void {
        if (this.onGround && !this.hitGround(this.dx, 0) && this.hitGround(this.dx, 1))
            this.x += this.dx;
        else this.dx = -this.dx;
        super.tick();
    }
}

class ShotEnemy extends WalkingEnemy {
    var shot_delay : number;

    function constructor(_x : number, _y : number, _dx : number) {
        super(_x, _y, _dx);
        this.character = "S";
        this.shot_delay = 0;
    }
    
    function shot (dx : number) : Bullet {
        if (this.shot_delay) return null;
        this.shot_delay = 120;
        return new Bullet(this.x + (Math.abs(dx)/dx * Config.objWidth + dx), this.y, dx);
    }

    override function tick() : void {
        super.tick();
        if (this.shot_delay) --this.shot_delay;
    }
}

final class Pc extends WalkingObj {
    static var max_dx = 2;
    static var shot_dx = 3;
    var dir : number;
    var shot_delay : number;
    var can_shot : boolean;

    function constructor(_x : number, _y : number) {
        super(_x, _y, "@");
        this.dir = 1;
        this.shot_delay = 0;
        this.can_shot = false;
    }

    function move(pow : number) : void {
        if (pow > 0) this.dir = 1;
        else this.dir = -1;
        if (Math.abs(this.dx + pow/10) <= Pc.max_dx) this.dx += pow/10;
    }

    function jump(pow : number) : void {
        if (this.onGround) this.dy = -pow;
    }

    function enableShot() : void {
        this.can_shot = true;
    }

    function shot() : Bullet {
        if (!this.can_shot || this.shot_delay) return null;
        this.shot_delay = 30;
        return new Bullet(this.x + this.dir * (Config.objWidth + Pc.shot_dx), this.y,
                          this.dir * Pc.shot_dx);
    }

    override function tick() : void {
        if (this.shot_delay) --this.shot_delay;

        if (Math.abs(this.dx) >= 0.1) {this.dx -= 0.05 * (Math.abs(this.dx) / this.dx);}
        else {this.dx = 0;}

        if (this.hitGround(this.dx, 0)) this.dx = 0;
        else this.x += this.dx;
        super.tick();
    }
}
