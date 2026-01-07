import { camera, moveCameraLocal } from './camera.js';
import { MAX_PITCH, MIN_PITCH, MOUSE_SENS } from './constants.js';

// Keyboard input handling
export const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

let mouseLook = false;
let movementEnabled = true; // Toggle for movement controls

export function getMouseLook() {
    return mouseLook;
}

export function setupMouseInput(game) {
    game.addEventListener("click", () => {
        game.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        mouseLook = document.pointerLockElement === game;
    });

    document.addEventListener("mousemove", (e) => {
        if (mouseLook) {
            camera.rx += e.movementY * MOUSE_SENS;
            camera.ry += e.movementX * MOUSE_SENS;
        }

        // clamp the pitch to the max and min pitch
        camera.rx = Math.max(Math.min(camera.rx, MAX_PITCH), MIN_PITCH);
    });
}

// Track if 't' key was pressed last frame to detect key press (not just held)
let movementToggle = false;

export function processKeyboardInput(dt, speed, camspeed) {
    // Toggle movement on 't' key press (not while held)
    if (keys["t"] && !movementToggle) {
        movementEnabled = !movementEnabled;
    }
    movementToggle = keys["t"];

    // Movement input
    let dx = 0, dy = 0, dz = 0;

    if (movementEnabled) {
        
        if (keys[" "]) dy += speed * dt;      // up
        if (keys["shift"]) dy -= speed * dt;  // down
    }

    if (keys["a"]) dx -= speed * dt;      // strafe left
    if (keys["d"]) dx += speed * dt;      // strafe right
    if (keys["w"]) dz += speed * dt;      // forward
    if (keys["s"]) dz -= speed * dt;      // backward
    
    moveCameraLocal(dx, dy, dz);

    // Camera rotation input
    if (keys["arrowleft"]) camera.ry -= camspeed * dt;
    if (keys["arrowright"]) camera.ry += camspeed * dt;
    if (keys["arrowup"]) camera.rx -= camspeed * dt;
    if (keys["arrowdown"]) camera.rx += camspeed * dt;

    // clamp the pitch to the max and min pitch
    camera.rx = Math.max(Math.min(camera.rx, MAX_PITCH), MIN_PITCH);
}

