import { FOREGROUND } from './constants.js';
import { worldToCamera } from './camera.js';
import { clipLineToNearPlane, project, screen } from './math.js';

let ctx, gameWidth, gameHeight;

export function initRenderer(canvasContext, width, height) {
    ctx = canvasContext;
    gameWidth = width;
    gameHeight = height;
}

export function clear(backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

export function point({x, y}, s = 10, color = FOREGROUND) {
    ctx.fillStyle = color;
    ctx.fillRect(x - s/2, y - s/2, s, s);
}

export function line(p1, p2, color) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color || FOREGROUND;
    ctx.stroke();
}

export function line3D(aWorld, bWorld, color, near = 0.001) {
    // 1) world -> camera space
    const aCam = worldToCamera(aWorld);
    const bCam = worldToCamera(bWorld);

    // 2) clip in camera space
    const clipped = clipLineToNearPlane(aCam, bCam, near);
    if (!clipped) return;

    // 3) project + screen map
    const p1 = screen(project(clipped.a), gameWidth, gameHeight);
    const p2 = screen(project(clipped.b), gameWidth, gameHeight);

    // 4) draw 2D line
    line(p1, p2, color);
}

// function to render in the camera's perspective
export function camview({x, y, z}) {
    return screen(project(worldToCamera({x, y, z})), gameWidth, gameHeight);
}

export function draw_axis(unit = 1) {
    line3D({x: -unit, y: 0, z: 0}, {x: unit, y: 0, z: 0}, "red");
    line3D({x: 0, y: -unit, z: 0}, {x: 0, y: unit, z: 0}, "green");
    line3D({x: 0, y: 0, z: -unit}, {x: 0, y: 0, z: unit}, "blue");
}

export function draw_grid() {
    for (let i = -10; i < 10; i++) {
        line3D({x: i, y: 0, z: -10}, {x: i, y: 0, z: 10}, "gray");
        line3D({x: -10, y: 0, z: i}, {x: 10, y: 0, z: i}, "gray");
    }
}

// draw a cube
export function draw_cube(p, s, color = FOREGROUND) {
    const vs = [
        {x: p.x + (s/2), y: p.y + (s/2), z: p.z + (s/2)},
        {x: p.x - (s/2), y: p.y + (s/2), z: p.z + (s/2)},
        {x: p.x + (s/2), y: p.y - (s/2), z: p.z + (s/2)},
        {x: p.x - (s/2), y: p.y - (s/2), z: p.z + (s/2)},

        {x: p.x + (s/2), y: p.y + (s/2), z: p.z - (s/2)},
        {x: p.x - (s/2), y: p.y + (s/2), z: p.z - (s/2)},
        {x: p.x + (s/2), y: p.y - (s/2), z: p.z - (s/2)},
        {x: p.x - (s/2), y: p.y - (s/2), z: p.z - (s/2)},
    ]
    const fs = [
        [0, 1, 3, 2],
        [4, 5, 7, 6],
        [0, 4 ],
        [1, 5],
        [2, 6],
        [3, 7],
    ]

    for (const f of fs) {
        for (let i = 0; i < f.length; i++) {
            const a = vs[f[i]];
            const b = vs[f[(i + 1) % f.length]];
            line3D(a, b, color || FOREGROUND);
        }
    }
}

export function draw_circle({h, k}, r, n, color = FOREGROUND) {
    const vs = [];
    for (let i = 0; i < 360; i += 360/n) {
        const x = h + r * Math.cos(i * Math.PI / 180);
        const y = k + r * Math.sin(i * Math.PI / 180);
        vs.push({x, y, z: 0});
    }
    for (let i = 0; i < vs.length; i++) {
        line3D(vs[i], vs[(i + 1) % vs.length], color || FOREGROUND);
    }
}

export function draw_sphere({h, k, l}, r, n, color = FOREGROUND) {
    const vs = [];
    for (let i = 0; i < 360; i += 360/n) {
        for (let j = 0; j < 360; j += 360/n) {
            const x = h + r * Math.cos(i * Math.PI / 180) * Math.sin(j * Math.PI / 180);
            const y = k + r * Math.cos(j * Math.PI / 180);
            const z = l + r * Math.sin(i * Math.PI / 180) * Math.sin(j * Math.PI / 180);
            vs.push({x, y, z});
        }
    }
    for (let i = 0; i < vs.length; i++) {
        line3D(vs[i], vs[(i + 1) % vs.length], color || FOREGROUND );
    }
    for (let i = 0; i < vs.length; i++) {
        line3D(vs[i], vs[(i + n) % vs.length], color || FOREGROUND);
    }
}

