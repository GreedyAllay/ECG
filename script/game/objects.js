const define = {
    object: (x, y, w, h, color, ghost, layer, temp) => {
        level.push({
            type: 0, x: x, y: y, w: w, h: h, ghost: ghost, color: color, layer: layer, temp: temp
        })
        return applyID()
    },

    image: (x, y, w, h, rotation, source, auto, layer) => {
        level.push({
            type: 1, x: x, y: y, w: w, h: h, rotation: rotation, source: source, ghost: 1, auto: auto, layer: layer
        })
        return applyID()
    },

    text: (x, y, size, text, font, color, layer) => {
        level.push({
            type: 2, x: x, y: y, size: size, text: text, font: font, color: color, layer: layer
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
    tree: (x, y, size, layer) => {
        define.image(x, y-46, 150*size, 150*size, 90, "stem", 1) //stem

        define.image(x-25*size, y-100*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
        define.image(x-45*size, y-80*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
        define.image(x-5*size, y-80*size, 100, 100, random(-45, 45), "leaves", 1) //leaves
    },

    bush: (x, y, amount, layer) => {
        for(let i = 0; i < amount; i++) {
            define.image(x+i*50, y, 100, 100, 90, "leaves", 1)
        }
    },

    hydrant: (x, y, layer) => {
        define.image(x, y, 165, 165, 90, "hydrant", 1)
    },

    flowers: (x, y, amount, layer)=> {
        for(let i = 0; i < amount; i++) {
            define.image(x+(random(amount*-8, amount*8)), y, random(150, 200), 200, 90, "foliage/flower", 1)
        }
    },

    gears: (x, y, layer) => {
        define.gear(x, y, 100)
    },

    keyboard: (x, y, val, layer) => {
        define.image(x, y, 25, 25, 90, "tutorialkey")
        define.text(x+9, y+17, 13, val, "Archivo", "#ffffff")
    },

    key(x, y, id, layer) {
        level.push({
            type: 4, x: x, y: y, size: size
        })
    },

    rock(x, y, amount, size, layer) {
        for(let i = 0; i < amount; i++) {
            define.image(x+random(amount * -5, amount * 5), y+random(-2, 2), 100, 100, 90, "rockcave", 1, layer)
        }
           
        // define.image(x+random(amount * -5, amount * 5), y+random(amount * -5, amount * 5), 100, 100, 90, "rockcave", 1, layer)
    },

    foliage(x, y, amount, distance, layer) {   
        const grassVariationCount = 3
        for(let i = 0; i < amount; i++) {
            define.image(x + random(0, distance), y + random(-2, 0), 100, 100, 90, `foliage/grass${Math.round(random(0, grassVariationCount))}`, 1, layer)
        }
    }
}

function generateUniqueID() {
    const use = "abcdefghijklmnopqrstuvwxyz1234567890"
    let output = ""
    for(let i = 0; i < 5; i++) {
        output += use[Math.round(random(0, use.length-1))]
    }
    return output
}

function applyID() {
    return level[level.length-1].id = generateUniqueID()
}

function removeID(id) {
    let success = false
    level.forEach((object, i) => {
        if(object.id === id) {
            level.splice(i, 1)
            success = true
            console.log(`${id} deleted`)
            return
        } 
    });
    if(success) return;
    console.error("this id cannot be deleted")
}

function moveID(id, x, y) {
    let success = false
    level.forEach((object, i) => {
        if(object.id === id) {
            level[object].x = x
            level[object].y = y
            success = true
            console.log(`${id} moved`)
            return
        } 
    });
    if(success) return;
    console.error("this id cannot be moved")
}

//removeID(level[Object.keys(level)[0]].id)