function defineObject(x, y, w, h, c, g) {
    level.push({
        type: 0, x: x, y: y, w: w, h: h, ghost: g, color: c
    })
}

function defineImage(x, y, w, h, rotation, source, auto) {
    level.push({
        type: 1, x: x, y: y, w: w, h: h, rotation: rotation, source: source, ghost: 1, auto: auto
    })
}

const spawn = {
    tree: (x, y, size) => {
        defineImage(x, y-46, 150*size, 150*size, 90, "stem", 1) //stem

        defineImage(x-25*size, y-100*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
        defineImage(x-45*size, y-80*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
        defineImage(x-5*size, y-80*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
    },

    bush: (x, y, amount) => {
        for(let i = 0; i < amount; i++) {
            defineImage(x+i*50, y, 100, 100, 90, "leaves", 1)
        }
    },

    hydrant: (x, y) => {
        defineImage(x, y, 165, 165, 90, "hydrant", 1)
    },

    flowers: (x, y, amount)=> {
        for(let i = 0; i < amount; i++) {
            defineImage(x+i*50, y, random(150, 200), 200, 90, "flower0", 1)
        }
    }
}