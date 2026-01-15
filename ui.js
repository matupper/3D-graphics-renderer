import { FPS, FOREGROUND } from './constants.js';

let ctx, gameWidth, gameHeight;

export function initUI(canvasContext, width, height) {
    ctx = canvasContext;
    gameWidth = width;
    gameHeight = height;
}

// Text rendering
export function text(str, x, y, color = FOREGROUND, fontSize = 16, fontFamily = 'monospace', align = 'left') {
    ctx.save(); // Save current canvas state
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    ctx.fillText(str, x, y);
    ctx.restore(); // Restore previous state
}

// Rectangle drawing
export function rect(x, y, width, height, color = FOREGROUND, filled = true) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    if (filled) {
        ctx.fillRect(x, y, width, height);
    } else {
        ctx.strokeRect(x, y, width, height);
    }
    ctx.restore();
}

// Circle drawing (2D screen space)
export function circle(x, y, radius, color = FOREGROUND, filled = true) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (filled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.restore();
}

// Line drawing (2D screen space)
export function line2D(x1, y1, x2, y2, color = FOREGROUND, lineWidth = 1) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

export function drawCrosshair() {
    line2D(gameWidth/2 - 10, gameHeight/2, gameWidth/2 -3, gameHeight/2, "#ffffff90", 3);
    line2D(gameWidth/2 , gameHeight/2 + 10, gameWidth/2, gameHeight/2 + 3, "#ffffff90", 3);
    line2D(gameWidth/2, gameHeight/2 - 10, gameWidth/2, gameHeight/2 - 3, "#ffffff90", 3);
    line2D(gameWidth/2 + 10, gameHeight/2, gameWidth/2 + 3, gameHeight/2, "#ffffff90", 3);
}

// Main UI drawing function - called each frame
export function drawUI() {
    // Example: Draw FPS counter in top-left
    text(`By Matias Tupper`, 10, 10, FOREGROUND, 14);
    
    drawCrosshair();
}
