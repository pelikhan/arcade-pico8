// tests go here; this will not be compiled when this package is used as a library
let carts: (() => void)[] = []
// https://twitter.com/lucatron_/status/1096168653735657472
carts.push(function() {
    const c = [0, 1, 2, 8, 14, 15, 7]
    const r = range(3, 68, .1);
    const f = (i: number) => {
        return c[flr(1.5 + abs(6 - i % 12))]
    }
    paint(function () {
        for (const w of r) {
            const a = 4 / w + time() / 4;
            const k = 145 / w;
            const x = 64 + cos(a) * k;
            const y = 64 + sin(a) * k;
            const i = 35 / w + 2 + time() * 3;
            rect(x - w, y - w, x + w, y + w, f(i) * 16 + f(i + .5));
        }
    })
})

// https://twitter.com/guerragames/status/1099766885120425987
carts.push(function() {
    const s = sin;
    const c = cos;
    let t = 0;
    const ir = range(-48, 48, 3);
    const jr = range(-48, 48, 3);
    paint(function () {
        t += 0.05;
        rectfill(16, 16, 112, 112, 2)
        for (const i of ir) {
            for (const j of jr) {
                const n = i / 64;
                const m = j / 64;
                const x = s(t / 3) * i / 48 * c(n + t / 5) + c(m + t / 2) * s(n + t / 5);
                const y = s(t / 4) * j / 32 * c(n + t / 7) + s(m + t / 3) * s(n + t / 7);
                const d = sqrt(x * x + y * y);
                circ(64 + i, 64 + j, 4 * d, 8 + d * 1.5)
            }
        }
    })
})

// https://twitter.com/jordi_ros/status/1099803248192569344
carts.push(function() {
    function z(x: number, y: number, j: number, i: number) {
        const o = time() * .03 + j
        return max(-1, 7 - sqrt((11 - x - sin(o * i) * 6) ** 2 + (11 - y + cos(o * j) * 6) ** 2))
    }
    paint(function () {
        for (let y = 0; y <= 23; ++y) {
            for (let x = 0; x <= 23; ++x) {
                let v = z(x, y, 7.1, 3.2) + z(x, y, 2.7, -5.3) + z(x, y, -3.5, 4.3)
                v = min(v, 5.8 - v)
                circfill(x * 6, y * 6, v * 2, 8 + v)
            }
        }
    });
})

while(true) {
    for(const cart of carts) {
        game.pushScene()
        cart()
        pause(5000)
        game.popScene()
    }
}
