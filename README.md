# HTML Graphics

A 3D graphics engine built with vanilla JavaScript and HTML5 Canvas. Features a custom 3D rendering pipeline, physics-based movement, and interactive camera controls. [Try it out on my site!](https://www.matiastupper.com/projects/js-3d-renderer/)

## Features

- **3D Rendering**: Custom software rendering with perspective projection
- **Camera System**: First-person camera with mouse look and keyboard controls
- **Physics Engine**: Gravity-based movement with jumping and momentum
- **Fly Mode**: Toggle between physics-based and free-fly movement
- **UI System**: 2D overlay rendering for HUD elements
- **Primitives**: Built-in shapes (cubes, spheres, circles, grids, axes)

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Running

```bash
npm run dev
```

Opens the project in your browser at `http://localhost:3000` with auto-reload enabled.

## Controls

### Movement (Physics Mode)
- **W/A/S/D**: Move forward/left/backward/right
- **Space**: Jump (only when on ground)
- **Shift**: Sprint (3x speed)
- **T**: Toggle between physics mode and fly mode

### Movement (Fly Mode)
- **W/A/S/D**: Move forward/left/backward/right
- **Space**: Move up
- **C**: Move down
- **Shift**: Sprint (3x speed)

### Camera
- **Mouse**: Look around (click canvas to enable pointer lock)
- **Arrow Keys**: Rotate camera manually

## Project Structure

```
html-graphics/
├── index.html          # Main HTML file
├── index.js            # Entry point and game loop
├── camera.js           # Camera transformations and world-to-camera space
├── renderer.js         # 3D rendering functions (lines, cubes, spheres)
├── ui.js               # 2D UI rendering (text, shapes, HUD)
├── input.js            # Keyboard/mouse input and movement physics
├── math.js             # Math utilities (projection, clipping, screen mapping)
└── constants.js        # Configuration constants
```

## Architecture

### Rendering Pipeline
1. **World Space** → Transform objects to camera space
2. **Camera Space** → Clip geometry to near plane
3. **Projection** → Apply perspective projection
4. **Screen Space** → Map to canvas coordinates
5. **2D Rendering** → Draw using Canvas API

### Movement System
- **Physics Mode**: Velocity-based movement with gravity, friction, and ground collision
- **Fly Mode**: Direct position updates for unrestricted movement

## Customization

Edit `constants.js` to adjust:
- Colors (background, foreground)
- FPS
- Mouse sensitivity
- Camera pitch limits

Edit `input.js` to modify:
- Gravity strength
- Jump velocity
- Friction values
- Movement speed
