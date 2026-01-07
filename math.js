export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function clipLineToNearPlane(a, b, near = 0.001) {
    const aIn = a.z >= near;
    const bIn = b.z >= near;

    if (!aIn && !bIn) return null;     // fully behind
    if (aIn && bIn) return { a, b };   // fully in front

    const t = (near - a.z) / (b.z - a.z);

    const hit = {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        z: near,
    };

    return aIn ? { a, b: hit } : { a: hit, b };
}

// function to normalize coordinate plane (0, 0) in the center of the screen
export function screen(p, width, height) {
    // -1..1
    return {
        x: (p.x + 1) / 2 * width,
        y: (1 - (p.y + 1) / 2) * height,
    }
}

// function to project 3D coordinates to 2D coordinates
export function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
    }
}

// function to translate the cube along the z-axis
export function translate_z({x, y, z}, dz) {
    return {
        x: x,
        y: y,
        z: z + dz,
    }
}

export function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c - z*s,
        y: y,
        z: x*s + z*c
    }
}

