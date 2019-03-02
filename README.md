# arcade-pico8 [![Build Status](https://travis-ci.org/pelikhan/arcade-pico8.svg?branch=master)](https://travis-ci.org/pelikhan/arcade-pico8)

A tiny compatibility layer to port the amazing Pico-8 #Tweetcarts
to https://arcade.makecode.com .

## Examples

* https://twitter.com/lucatron_/status/1096168653735657472

```typescript
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
```

* https://twitter.com/guerragames/status/1099766885120425987

```typescript
const s = sin;
const c = cos;
let t = 0;
const ir = range(-48, 48, 3);
const jr = range(-48, 48, 3);
game.onPaint(function () {
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
```

* https://twitter.com/jordi_ros/status/1099803248192569344

```typescript
function z(x: number, y: number, j: number, i: number) {
    const o = time() * .03 + j
    return max(-1, 7 - sqrt((11 - x - sin(o * i) * 6) ^ 2 + (11 - y + cos(o * j) * 6) ^ 2))
}

game.onPaint(function () {
    for (let y = 0; y <= 23; ++y) {
        for (let x = 0; x <= 23; ++x) {
            let v = z(x, y, 7.1, 3.2) + z(x, y, 2.7, -5.3) + z(x, y, -3.5, 4.3)
            v = min(v, 5.8 - v)
            circfill(x * 6, y * 6, v * 2, 8 + v)
        }
    }
});
```

* https://twitter.com/guerragames/status/1099800737377382400

```typescript
let t = 0;
const ir = range(-45, 45, 3);
const jr = range(-45, 45, 3);
game.onPaint(function () {
    t += .02
    for (let i of ir) {
        for (let j of jr) {
            const n = i / 64
            const m = j / 64
            const a = 7 * atan2(n, m)
            const x = i / 32 + sin(t + a)
            const y = j / 32 + cos(t + a)
            const d = 2 * sqrt(x * x + y * y)
            circ(64 + i, 64 + j, 2 * d, 8 + d)
        }
    }
});
```

* https://twitter.com/StegmayerLuke/status/1099072015649001473

```typescript
const t: { x: number; y: number; z: number }[] = [];
const n = 64
for (let i of range(-32, n))
    t.push({ x: i, y: 0, z: 0 });

const ir = range(1, n);
game.onPaint(function () {
    for (const i of ir) {
        const q = t[i];
        //let [x, y] = p(q.x, q.y, q.z)
        let arr = p(q.x, q.y, q.z)
        let x = arr[0];
        let y = arr[1];
        q.z += 1
        //let [a, b] = p(q.x, q.y, q.z)
        arr = p(q.x, q.y, q.z)
        let a = arr[0];
        let b = arr[1];
        line(x, y, a, b);
        if (q.z > -2) {
            q.y = -rnd(n) + 32
            q.z = -rnd(n) - 2
        }
    }
});
function p(x: number, y: number, z: number): number[] {
    return [-x / z * n + n, -y / z * n + n];
}
```

* https://twitter.com/jordi_ros/status/1099472557810634754

```
const yr = range(0, 23);
const ir = range(0, 2);
game.onPaint(function () {
    for (let y of yr) {
        for (let x of yr) {
            let v = -2;
            for (let i of ir) {
                const p = time() - i * 1.5;
                const r = p % 2;
                const n = flr(p / 2);
                const c = 1 - sqrt(((n * 137) % 22 - x) ^ 2 +
                    ((n * 53) % 22 - y) ^ 2) + r * 15 + v * 0.8;
                v = max(min(c, 8 - c), v);
            }
            circfill(x * 6, y * 6, v * 1.3, 8 + v * 0.6)
        }
    }
})
```

* https://twitter.com/platformalist/status/1096854118935584768

```typescript
const p: { x: number; y: number; v: number; q: number; }[] = [];
for (let j of range(0, 23)) {
    for (let i of range(1, 24)) {
        p.push({ x: j * 4 + 22, y: i * 4 + 18, v: i / 12, q: j / 12 });
    }
}

scene.setBackgroundColor(7);
game.onPaint(function () {
    for (const k of p) {
        if (k.v < 3) k.v += .04; else k.v = -3;
        if (k.q < 3) k.q += .04; else k.q = -3;
        k.x += sin(k.q) / 2
        k.y += sin(k.v) / 2
        pset(k.x, k.y, 0)
    }
    rect(p[0].x, p[0].y, p[p.length - 1].x, p[p.length - 1].y, 0)
})
```

* https://twitter.com/fernandojsg/status/1101471040188964864

```typescript
poke(0x5F2C, 3);
let f: number[] = [];
let p = [0, 1, 2, 4, 8, 9, 10, 7]
let left = 0;
let top = 80;
let w = 160;
let h = 60;
let d = w * h;
function s(t: number) {
    const e = f[t];
    const i = flr(rnd(3));
    f[t - i + 1 - w] = e - band(i, 1)
}
for (let i = 0; i <= d; ++i) {
    f[i] = (i > d - w) ? 8 : 0;
}

game.onPaint(function () {
    for (let x = 0; x <= w; ++x) {
        for (let y = 0; y <= h - 1; ++y) {
            s(y * w + x)
        }
    }
    for (let x = 0; x <= d; ++x) {
        pset(left + x % w, top + flr(x / w), p[f[x]])
    }
})
```

* https://twitter.com/fernandojsg/status/1101800243216244737

```typescript
// https://twitter.com/fernandojsg/status/1101800243216244737
let p: { x: number; y: number; a: number; b: number; }[] = []
let n = 48
let w = 160
const r = rnd;
for (let i = 0; i <= n; ++i) {
    p[i] = {
        x: r(w),
        y: r(w),
        a: r(2) - 1,
        b: r(2) - 1
    }
}
game.onPaint(function () {
    for (let i = 0; i <= n; ++i) {
        let a = p[i];
        let u = a.x;
        let v = a.y;
        a.x = (u + a.a) % w;
        a.y = (v + a.b) % w;
        for (let j = i; j <= n; ++j) {
            let b = p[j];
            let x = u - b.x;
            let y = v - b.y;
            let d = sqrt(x * x + y * y)
            if (d < 20) {
                line(u, v, b.x, b.y, d < 13 ? 12 : 1)
            }
        }
        circ(u, v, 1, 7)
    }
})
```

## License

MIT

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

