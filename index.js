import { BACKGROUND, FPS } from './constants.js';
import { setupMouseInput, processKeyboardInput } from './input.js';
import { clear, draw_axis, draw_grid, draw_cube, initRenderer } from './renderer.js';
import { drawUI, initUI } from './ui.js';

// Canvas setup
const game = document.getElementById("game");
game.width = 800;
game.height = 800;
const ctx = game.getContext("2d");

// Initialize renderer with canvas context and dimensions
initRenderer(ctx, game.width, game.height);
initUI(ctx, game.width, game.height);
// Setup mouse input
setupMouseInput(game);

// Game state
let speed = 7;
let camspeed = 2;

function frame() {
    const dt = 1/FPS;
    
    clear(BACKGROUND);
    draw_axis();
    draw_grid();

    // Process all keyboard inputs
    processKeyboardInput(dt, speed, camspeed);

    draw_cube({x: 0, y: 0, z: 1}, 1);
    draw_cube({x: 0, y: 0, z: -1}, 1);
    draw_cube({x: 0, y: 1, z: 0}, 1);
    draw_cube({x: 0, y: -1, z: 0}, 1);
    draw_cube({x: 1, y: 0, z: 0}, 1);
    draw_cube({x: -1, y: 0, z: 0}, 1);

    // draw_sphere({h: 0, k: 0, l: 0}, 1, 20);

    drawUI();

    setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);
