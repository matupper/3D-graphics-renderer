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
let groundHeight = 0;

let playerHeight = 1.5;

// Physics constants
const GRAVITY = 9.81;
const JUMP_VELOCITY = 5.0;  // Initial upward velocity when jumping
const GROUND_FRICTION = 0.9;  // Friction when on ground (0-1, lower = more friction)
const AIR_FRICTION = 0.98;    // Air resistance (0-1, lower = more resistance)

// Velocity vectors (world space)
let velocity = { x: 0, y: 0, z: 0 };

// Track if space was pressed last frame for jump detection
let spaceWasPressed = false;

export function processKeyboardInput(dt, speed, camspeed) {
    // Toggle movement mode on 't' key press (not while held)
    if (keys["t"] && !movementToggle) {
        movementEnabled = !movementEnabled;
        // Reset velocity when switching modes to avoid weird behavior
        velocity = { x: 0, y: 0, z: 0 };
    }
    movementToggle = keys["t"];

    if (movementEnabled) {
        // PHYSICS MODE: Gravity-based movement with jumping
        // Check if on ground (with small epsilon for floating point precision)
        const isOnGround = camera.y <= groundHeight + playerHeight;
        
        // Apply gravity (always, unless on ground)
        if (!isOnGround) {
            velocity.y -= GRAVITY * dt;
        } else {
            // Stop falling when on ground
            if (velocity.y < 0) {
                velocity.y = 0;
                camera.y = groundHeight + playerHeight; // Snap to ground
            }
        }

        // Handle jumping (only when on ground)
        if (keys[" "] && !spaceWasPressed && isOnGround) {
            velocity.y = JUMP_VELOCITY;
        }

        // Calculate movement acceleration based on input (in local/camera space)
        let accelLocalX = 0, accelLocalZ = 0;
        const moveSpeed = keys["shift"] ? speed * 3 : speed;
        
        if (keys["a"]) accelLocalX -= moveSpeed;      // strafe left
        if (keys["d"]) accelLocalX += moveSpeed;      // strafe right
        if (keys["w"]) accelLocalZ += moveSpeed;      // forward
        if (keys["s"]) accelLocalZ -= moveSpeed;      // backward

        // Get camera direction vectors (based on current rotation)
        const cy = Math.cos(camera.ry);
        const sy = Math.sin(camera.ry);
        const right = { x: cy, y: 0, z: -sy };
        const forward = { x: sy, y: 0, z: cy };
        
        // Convert local acceleration to world space and apply to velocity
        const accelWorldX = right.x * accelLocalX + forward.x * accelLocalZ;
        const accelWorldZ = right.z * accelLocalX + forward.z * accelLocalZ;
        
        velocity.x += accelWorldX * dt;
        velocity.z += accelWorldZ * dt;

        // Apply friction/damping
        const friction = isOnGround ? GROUND_FRICTION : AIR_FRICTION;
        velocity.x *= Math.pow(friction, dt * 60); // Normalize to 60fps
        velocity.z *= Math.pow(friction, dt * 60);

        // Apply velocity to position (velocity is already in world space)
        camera.x += velocity.x * dt;
        camera.y += velocity.y * dt;
        camera.z += velocity.z * dt;
        
        // Prevent going below ground
        if (camera.y < groundHeight + playerHeight) {
            camera.y = groundHeight + playerHeight;
            velocity.y = 0;
        }
    } else {
        // FLY MODE: Direct movement without gravity, friction, or constraints
        let dx = 0, dy = 0, dz = 0;
        const moveSpeed = keys["shift"] ? speed * 3 : speed;
        
        if (keys["a"]) dx -= moveSpeed * dt;      // strafe left
        if (keys["d"]) dx += moveSpeed * dt;      // strafe right
        if (keys["w"]) dz += moveSpeed * dt;      // forward
        if (keys["s"]) dz -= moveSpeed * dt;      // backward
        if (keys[" "]) dy += moveSpeed * dt;      // up
        if (keys["c"]) dy -= moveSpeed * dt;      // down
        
        // Use moveCameraLocal for camera-relative movement
        moveCameraLocal(dx, dy, dz);
        
        // Reset velocity in fly mode so it doesn't carry over when switching back
        velocity = { x: 0, y: 0, z: 0 };
    }
    
    // Track space key state for both modes
    spaceWasPressed = keys[" "];
    
    // Track space key state for both modes
    spaceWasPressed = keys[" "];

    // Camera rotation input
    const rotSpeed = keys["shift"] ? camspeed * 2 : camspeed;
    if (keys["arrowleft"]) camera.ry -= rotSpeed * dt;
    if (keys["arrowright"]) camera.ry += rotSpeed * dt;
    if (keys["arrowup"]) camera.rx -= rotSpeed * dt;
    if (keys["arrowdown"]) camera.rx += rotSpeed * dt;

    // clamp the pitch to the max and min pitch
    camera.rx = Math.max(Math.min(camera.rx, MAX_PITCH), MIN_PITCH);
}

