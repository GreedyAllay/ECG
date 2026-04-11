function defineObject(x, y, w, h, c, g) {
    level.push({
        type: 0, x: x, y: y, w: w, h: h, ghost: g, color: c
    })
}

function defineImage(x, y, w, h, r, s) {
    level.push({
        type: 1, x: x, y: y, w: w, h: h, rotation: r, source: s, ghost: 1
    })
}