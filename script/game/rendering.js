function renderObjects() {
    //drawing in my drawing book!
    //why does it keep getting erased every time i finish drawing..?
    level.forEach(object => {
        if(!object.layer || !config.performance.layers) {
            renderObject(object)
        }
    });
    if(game.renderObjectIDs) {
        level.forEach((object, i) => {
            drawText(screenToWorldX(object.x), screenToWorldY(object.y), object.id, "#ff0000", 15)
        });
    }
    display.context.restore()
}

function renderObject(object) {
    if(!checkCulling(object)) {return;}
    switch (object.type) {
        case 0:
            drawObject(
            object.x,
            object.y,
            object.w,
            object.h,
            object.color
        )
        break;
            case 1:
                drawImage(object.x, object.y, object.w, object.h, object.source, false, object.auto)

                if(config.performance.shaders) {
                    display.context.filter = "brightness(0) opacity(0.02)";
                    const dir = -45
                    const length = 10 //10
                    const res = 10 //10 looks phenomenal but is incredibly heavy
                    for(let i = 0; i < 10; i++) {
                        drawImage(object.x+Math.sin(dir)*(i*(res/length)), object.y+Math.cos(dir)*(i*(res/length)), object.w, object.h, object.source, false, object.auto)
                    }
                    display.context.filter = "none";
                }
                break;
            case 2:
                drawText(screenToWorldX(object.x), screenToWorldY(object.y), object.text, object.color, object.size*camera.z, 0, object.font)
                break;
            case 3:
                drawImage(object.x, object.y, object.s, object.s, "gear")
                break;
            default:
                break;
        }
}

function checkCulling(object) {
    if(object.type === 2 || !config.performance.culling) {return true;}
    const {x, y, w, h} = object
    const stage = display.canvas
    const {sx, sy, sw, sh} = {
        sx: 0-camera.x - stage.width/2 / camera.z,
        sy:  0-camera.y - stage.height/2 / camera.z,
        sw: display.canvas.width / camera.z,
        sh: display.canvas.height / camera.z
    }
    if(false) {
        preDrawObject(sx, sy, sw, sh)
        display.context.fillStyle = "rgba(0, 0, 0, 0.26)"
        display.context.fill()

    }
    return AABB(x, y, w, h, sx, sy, sw, sh)
}

function drawHitboxes() {
    if(!game.renderHitBoxes) {return}
    level.forEach(object => {
        let color = object.ghost ? "#1c1fdb30" : "#cf1b1b"
            drawObjectWF(
                object.x,
                object.y,
                object.w,
                object.h,
                color
            )            
    });
    if(game.multiplayer) {
        const mp = Object.keys(players)
        mp.forEach(p => {
            const pl = players[p]
            drawObjectWF(
                pl.x,
                pl.y,
                pl.w,
                pl.h,
                "#cf1b1b"
            ) 
        })
    }
    //we do a bit of cheating here
    drawObjectWF(player.x+player.hbx, player.y+player.hby, player.w, player.h, "#cf1b1b")
}

function drawTriggers() {
    if(!game.drawTriggers) {return}
    level.forEach(object => {
        let color = "rgba(218, 33, 80, 0.4)"
        if(object.active) {
            color = "rgba(231, 18, 71, 0.72)"
        }
        if(object.type == 3) {
            drawObject(
                object.x,
                object.y,
                object.w,
                object.h,
                color
            )             
        }
           
    });
}

function renderPlayer() {
    //ugly ass mf
    drawImage(player.x+player.ox, player.y+player.oy, 100, 100, player.texture, player.mirror)
}

function renderWater() {
    //really made a whole function just for drawing a rectangle that improperly renders
    drawObject((0-camera.x) - display.canvas.width / 4, world.minHeight, display.canvas.width, display.canvas.height / 2 - camera.y, "#3f89e4b8")
}

function renderWaterReflections() {
    if(!config.performance.reflections || !world.useReflections) return;
    const ctx = display.context
    ctx.filter = `opacity(.5)`;

    //prevent stuff from rendering outside of the water
    ctx.save()
    ctx.beginPath()
    ctx.rect(screenToWorldX((0-camera.x) - display.canvas.width / 4, world.minHeight), screenToWorldY(world.minHeight), display.canvas.width*2, display.canvas.height / 2 - camera.y)
    ctx.clip()

    //wobbly watery effecty wow so cool and simple
    const offset = {
        x: Math.sin(game.frame/10) * 4,
        y: Math.cos(game.frame/10) * 4,
    }

    //render player's reflection with shitass math
    drawImage(player.x+player.ox + offset.x, ((190 - player.y) - player.h) + world.minHeight + offset.y, 100, 100, player.texture, player.mirror, 1, true)


    //level stuff
    level.forEach(object => {
        if(object.type == 0) {
            const {x, y, w, h} = object
            drawObject(x + offset.x, 2*world.minHeight-y-h + offset.y, w, h, object.color)            
        }

    });
    ctx.restore()
    ctx.filter = "none";
}

//i made this real quick pls dont judge it wasnt meant to be used by anyone besides me ok?
const editorobject = {
    width: 100,
    height: 100,
    x: 0,
    y: 0
}

const damageFlashy = () => {
    //owie
    return
    let tick = 0
    return () => {
        if(tick < 10) {
            const canvas = display.canvas
            const {width, height} = canvas
            drawImage(0-width/2, 0-height/2, width, height, "damage", 0, 0)
        }
        tick++
    }
}

async function damageFlash() {
    //OUCH MOTHERFUCKER WHATS WRONG WITH YOU????!!
    const canvas = display.canvas
    const {width, height} = canvas
    const oldTick = game.frame
    while(game.frame-oldTick < 40) {
        drawImage(0-width/2, 0-height/2, width, height, "bloodvignette", 0, 0)
        drawImage(0, 0, display.canvas.width/2.5, display.canvas.height/2.5, "bloodvignette", 0, 0, 1, 1)
    await wait(1)
    }
}

function renderBackgroundLayer() {
    //thats definitely great for purrformance
    if(!config.performance.layers) {return}
    level.forEach(object => {
        if(object.layer == -1) {
            renderObject(object)
        }
    });
}

function renderForegroundLayer() {
    //thats also definitely great for purrformance

    //prr... prrr
    //yeah you love cuddles, dont you...

    //sorry
    if(!config.performance.layers) {return}
    level.forEach(object => {
        if(object.layer > 0) {
            renderObject(object)
        }
    });
}

//WHY did you randomly stop working gng :wilted-rose:
function renderMultiplayers() {
    if(!game.multiplayer) {return}
    const playerList = Object.keys(players)

    playerList.forEach(a => {
        const {x, y, xv, yv, ox, oy, mirror, texture} = players[a]

        //render le username
        drawText(x, y, a, "rgb(255, 132, 0)", 50, 1, "Archivo", "center")
        if(a == multiplayer.username) {return}

        //zer spielerr
        //oh fuck i will also have to give server players reflections fuck
        drawImage(x + ox, y + oy, 100, 100, texture, mirror)
    })

    renderOutsidePlayerMarkers()
}

function deleteTemporaryObjects() {
    //ewww... brother, ewww... whats that... ? whats thaat brotha... ?
    level.forEach((object, i) => {
        if(object.temp) {
            if(object.isLast) {
                level.splice(i, 1)
            } else {
                object.isLast = 1
            }
        }
    });
}

//WHYYYYYYYYYYYYYYYY ARE YOU NOT FUCKING RENDERING?????????????????????????????
function renderPlayerList() {
    //we got player
    //drawObject(0, 0, 200, 200, "#4758")
    const pl = Object.keys(players)
    drawText(display.canvas.width/2, 50, "online players", "rgb(255, 255, 255)", 40, 0, "Archivo Black", "center")
    drawText(display.canvas.width/2, 80, multiplayer.address, "rgba(255, 255, 255, 0.65)", 30, 0, "Archivo", "center")   
    pl.forEach((p, i) => {
        drawText(display.canvas.width/2, 120+i*40, p, "rgb(255, 140, 0)", 40, 0, "Archivo", "center")   
    });
}

function renderOutsidePlayerMarkers() {
    return;
    //ik it looks kinda dumb
    drawImage(0, 0, 100, 100, " head.svg")
}