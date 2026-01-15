import { BACKGROUND, FPS } from './constants.js';
import { setupMouseInput, processKeyboardInput } from './input.js';
import { clear, draw_axis, draw_grid, draw_cube, draw_sphere, draw_circle, initRenderer } from './renderer.js';
import { drawUI, initUI } from './ui.js';
import { rotate_xz } from './math.js';

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


    draw_cube({x: -2, y: 0.25, z: 3}, 0.5);
    draw_cube({x: 0, y: 0.5, z: 3}, 1);
    draw_cube({x: 3, y: 0.75, z: 3}, 1.5);


    // Draw snowman :)
    draw_sphere({h: 1.5, k: 0.5, l: 5}, 1, 16, "white");
    draw_sphere({h: 1.5, k: 1.75, l: 5}, (3/4), 12, "white");
    draw_sphere({h: 1.5, k: 2.7, l: 5}, (2/4), 8, "white");
    
    drawUI();

    setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);
