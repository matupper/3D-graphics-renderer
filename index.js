const BACKGROUND = "#000000";
const FOREGROUND = "#50FF50";

console.log(game);
game.width = 800;
game.height = 800;
const ctx = game.getContext("2d");
console.log(ctx);

function clear(){
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height);
}

function point ({x, y}){
    ctx.fillStyle = FOREGROUND;
    const s = 10;

    ctx.fillRect(x - s/2, y - s/2, s, s);
}

function screen(p) {
    // -1..1

    return {
        x: (p.x + 1) / 2 * game.width,
        y: (1 - (p.y + 1) / 2) * game.height,
    }
}

function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
        z: z,
    }
}


const vs = [
    {x: 0.5, y: 0.5, z: 0.5},
    {x: -0.5, y: -0.5, z: 0.5},
    {x: 0.5, y: -0.5, z: 0.5},
    {x: -0.5, y: 0.5, z: 0.5},

    {x: 0.5, y: 0.5, z: -0.5},
    {x: -0.5, y: -0.5, z: -0.5},
    {x: 0.5, y: -0.5, z: -0.5},
    {x: -0.5, y: 0.5, z: -0.5},
];

const FPS = 60;

function translate_z({x, y, z}, dz) {
    return {
        x: x,
        y: y,
        z: z + dz,
    }
}

function rotate_xz({x, y, z}, angle) {
    const c = math.cos(angle);
    const s = math.sin(angle);
    return {
        x: x*c - z*s,
        y: y,
        z: x*s + z*c
    }
}

let dz = 1;
let angle = 0;

function frame() {
    const dt = 1/FPS;
    
    dz += 1*dt;
    angle += 2*Math.PI*dt;

    clear();

    for (const v of vs) {
        point(screen(project(translate_z(v, dz))));
    }
    setTimeout(frame, 1000/FPS);
}

frame();
