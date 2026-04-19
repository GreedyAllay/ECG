const define = {
    object: (x, y, w, h, color, ghost) => {
        level.push({
            type: 0, x: x, y: y, w: w, h: h, ghost: ghost, color: color
        })
        return applyID()
    },

    image: (x, y, w, h, rotation, source, auto) => {
        level.push({
            type: 1, x: x, y: y, w: w, h: h, rotation: rotation, source: source, ghost: 1, auto: auto
        })
        return applyID()
    },

    text: (x, y, size, text, font, color ) => {
        level.push({
            type: 2, x: x, y: y, size: size, text: text, font: font, color: color
        })
        return applyID()
    },

    trigger: (x, y, w, h, action, type, uses) => {
        level.push({
            type: 3, x: x, y: y, w: w, h: h, action: action, trtype: type, maxUses: uses, ghost: 1, active: false
        })
        return applyID()
    },

    gear: (x, y, size) => {
        level.push({
            type: 4, x: x, y: y, size: size
        })
        return applyID()
    }
}

const spawn = {
    tree: (x, y, size) => {
        define.image(x, y-46, 150*size, 150*size, 90, "stem", 1) //stem

        define.image(x-25*size, y-100*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
        define.image(x-45*size, y-80*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
        define.image(x-5*size, y-80*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
    },

    bush: (x, y, amount) => {
        for(let i = 0; i < amount; i++) {
            define.image(x+i*50, y, 100, 100, 90, "leaves", 1)
        }
    },

    hydrant: (x, y) => {
        define.image(x, y, 165, 165, 90, "hydrant", 1)
    },

    flowers: (x, y, amount)=> {
        for(let i = 0; i < amount; i++) {
            define.image(x+(random(amount*-8, amount*8)), y, random(150, 200), 200, 90, "foliage/flower", 1)
        }
    },

    gears: (x, y) => {
        define.gear(x, y, 100)
    },

    keyboard: (x, y, val) => {
        define.image(x, y, 25, 25, 90, "tutorialkey")
        define.text(x+9, y+17, 13, val, "Archivo", "#ffffff")
    },

    key(x, y, id) {
        level.push({
            type: 4, x: x, y: y, size: size
        })
        define.trigger(x, y, 20, 20, "alert('ok u got the key nice pretend as if the key is gone now')")
    },

    rock(x, y, amount, size) {
        for(let i = 0; i < amount; i++) {
            define.image(x+random(amount * -5, amount * 5), y+random(amount * -5, amount * 5), 100, 100, 90, "rock", 1)
        }
    },

    foliage(x, y, amount, distance) {   
        const grassVariationCount = 3
        for(let i = 0; i < amount; i++) {
            define.image(x + random(0, distance), y + random(-2, 0), 100, 100, 90, `foliage/grass${Math.round(random(0, grassVariationCount))}`, 1)
        }
    }
}

function generateUniqueID() {
    const use = "abcdefghijklmnopqrstuvwxyz1234567890"
    let output = ""
    for(let i = 0; i < 5; i++) {
        output += use[Math.round(random(0, use.length))]
    }
    return output
}

function applyID() {
    return level[level.length-1].id = generateUniqueID()
}