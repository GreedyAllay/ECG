//first render everything 
//then go over each object and apply a mask
//wow

const stains = []

function defineStain(x, y, w, h, source) {
    stains.push({
        x:x, y:y, w:w, h:h, source: source
    })
}

function renderStains() {
    createClippingMap()
    stains.forEach(stain => {
        const {x, y, w, h, source} = stain
        drawImage(x, y, w, h, source, 0, 0)
    });
    display.context.restore()
}

let clippy = true

function createClippingMap() {        
    const ctx = display.context
    ctx.save()
    ctx.beginPath()

    level.forEach(object => {
        const {x, y, w, h, ghost, type} = object
        if(!ghost && type == 0) {
           ctx.rect(screenToWorldX(x), screenToWorldY(y), w * camera.z, h * camera.z)
        }
    })

    if(clippy) {
        ctx.clip()
    }
}

addEventListener("keydown", (e) => {
    return
    defineStain(player.x, player.y+100, 100, 100, "blood")

        if(e.key == "c") {
        clippy = !clippy
    }
})

function spawnBloodPool(x, y, size) {
    if(!config.gameplay.gore) return;
    for(let i = 0; i < size; i++) {
        defineStain(x + random(-20, -5), y+60  + random(-5, 5), 50, 20, "blood")
    }
}