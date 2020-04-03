/**
* (incomplete) pico8 API compat layer
*/

const pico8Palette = hex
    `000000 
1d2b53
7e2553 
008751 
ab5236 
5f574f 
c2c3c7 
fff1e8 
ff004d 
ffa300
ffec27
00e436
29adff
83769c
ff77a8
ffccaa`;
image.setPalette(pico8Palette);

// draw state
class DrawState {
    penColor: number;
    fillPattern: number;
    constructor() {
        this.penColor = 12;
        this.fillPattern = undefined;
    }
}

const drawState: DrawState = new DrawState();

function color(c: number) {
    drawState.penColor = c;
}
function fillp(n: number) {
    drawState.fillPattern = n;
    // TODO support for fill pattern in rendering
}

function poke(addr: number, val: number) {
    // not supported
}

function band(first: number, second: number): number {
    return first & second;
}

// runtime
function range(start: number, end: number, stride: number = 1): number[] {
    const p = [];
    for (let x = start; x <= end; x += stride)
        p.push(x)
    return p;
}
function time(): number {
    return game.runtime() / 1000.0;
}

// math
function cos(n: number) {
    return Math.cos(n);
}
function sin(n: number) {
    return Math.sin(n);
}
function abs(n: number) {
    return Math.abs(n);
}
function flr(n: number) {
    return Math.floor(n);
}
function sqrt(x: number): number {
    return Math.sqrt(x);
}
function max(x: number, y: number): number {
    return Math.max(x, y);
}
function min(x: number, y: number): number {
    return Math.min(x, y);
}
function atan2(dy: number, dx: number): number {
    return Math.atan2(dy, dx);
}
function rnd(max: number): number {
    return Math.random() * max;
}

// drawing
function line(x0: number, y0: number, x1: number, y1: number, col?: number) {
    if (col === undefined) col = drawState.penColor;
    screen.drawLine(x0, y0, x1, y1, col);
}
function rect(x0: number, y0: number, x1: number, y1: number, col?: number) {
    if (col === undefined) col = drawState.penColor;
    screen.drawRect(x0, y0, Math.abs(x1 - x0), Math.abs(y1 - y0), col);
}
function rectfill(x0: number, y0: number, x1: number, y1: number, col?: number) {
    if (col === undefined) col = drawState.penColor;
    screen.fillRect(x0, y0, Math.abs(x1 - x0), Math.abs(y1 - y0), col);
}
function circ(x0: number, y0: number, radius: number = 4, col?: number) {
    if (col === undefined) col = drawState.penColor;

    x0 = x0 | 0;
    y0 = y0 | 0;
    radius = radius | 0;

    let x = radius;
    let y = 0;
    let err = 0;

    while (x >= y) {
        screen.setPixel(x0 + x, y0 + y, col);
        screen.setPixel(x0 + x, y0 - y, col);
        screen.setPixel(x0 + y, y0 + x, col);
        screen.setPixel(x0 + y, y0 - x, col);
        screen.setPixel(x0 - y, y0 + x, col);
        screen.setPixel(x0 - y, y0 - x, col);
        screen.setPixel(x0 - x, y0 + y, col);
        screen.setPixel(x0 - x, y0 - y, col);

        if (err <= 0) {
            y += 1;
            err += 2 * y + 1;
        }
        if (err > 0) {
            x -= 1;
            err -= 2 * x + 1;
        }
    }
}
function pset(x: number, y: number, col?: number) {
    if (col === undefined) col = drawState.penColor;
    screen.setPixel(x, y, col);
}

function circfill(x: number, y: number, r: number = 4, col?: number) {
    if (col === undefined) col = drawState.penColor;
    // TODO
    circ(x, y, r, col);
}
function flip() {
    // not needed, it blits the screen
}
