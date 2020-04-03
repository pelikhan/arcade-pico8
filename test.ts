// tests go here; this will not be compiled when this package is used as a library
const c = [0, 1, 2, 8, 14, 15, 7]
fillp(0xa5a5)
const r = range(3, 68, .1);
game.onPaint(function () {
    for (let w of r) {
        const a = 4 / w + time() / 4;
        const k = 145 / w;
        const x = 64 + cos(a) * k;
        const y = 64 + sin(a) * k;
        const i = 35 / w + 2 + time() * 3;
        rect(x - w, y - w, x + w, y + w, f(i) * 16 + f(i + .5));
    }
})
function f(i: number) {
    return c[flr(1.5 + abs(6 - i % 12))]
}