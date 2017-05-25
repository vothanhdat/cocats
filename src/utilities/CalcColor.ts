export default {
    brightness(color : number,bright : number){
        var r = ((color & 0xff0000) >> 16) * bright;
        var g = ((color & 0x00ff00) >> 8) * bright;
        var b = (color & 0x0000ff) * bright;


        return ((Math.min(Math.max(r,0),255) & 0xff) << 16)
            | ((Math.min(Math.max(g,0),255) & 0xff) << 8)
            | ((Math.min(Math.max(b,0),255) & 0xff))
    }
}