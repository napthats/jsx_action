import 'js/web.jsx';
import 'config.jsx';
import 'ground.jsx';


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
