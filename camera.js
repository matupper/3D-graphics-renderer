export const camera = {
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
}

export function moveCameraLocal(dx, dy, dz) {
    const cy = Math.cos(camera.ry);
    const sy = Math.sin(camera.ry);

    const right = { x: cy, y: 0, z: -sy };
    const forward = { x: sy, y: 0, z: cy };

    camera.x += right.x * dx + forward.x * dz;
    camera.y += dy;
    camera.z += right.z * dx + forward.z * dz;
}

function camera_translate({x, y, z}) {
    return {
        x: x - camera.x,
        y: y - camera.y,
        z: z - camera.z,
    }
}

function camera_rotate_x({x, y, z}, rx) {
    const c = Math.cos(rx);
    const s = Math.sin(rx);
    return {
        x: x,
        y: y*c - z*s,
        z: y*s + z*c,
    }
}

function camera_rotate_y({x, y, z}, ry) {
    const c = Math.cos(ry);
    const s = Math.sin(ry);
    return {
        x: x*c + z*s,
        y: y,
        z: -x*s + z*c,
    }
}

function camera_rotate({x, y, z}, rx, ry) {
    return camera_rotate_x(camera_rotate_y({x, y, z}, ry), rx);
}

export function worldToCamera({x, y, z}) {
    const t = camera_translate({x, y, z});
    return camera_rotate(t, -camera.rx, -camera.ry);
}

