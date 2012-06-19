import 'js/web.jsx';
import 'config.jsx';


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
