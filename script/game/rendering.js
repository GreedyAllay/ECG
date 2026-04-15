function renderObjects() {
    level.forEach(object => {
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
    });
    if(game.renderObjectIDs) {
        level.forEach((object, i) => {
            drawText(screenToWorldX(object.x), screenToWorldY(object.y), i, "#ff0000")
        });
    }
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
    drawObjectWF(player.x+player.hbx, player.y+player.hby, player.w, player.h, "#cf1b1b")
}

function renderPlayer() {
    drawImage(player.x+player.ox, player.y+player.oy, 100, 100, player.texture, player.mirror)
}

function renderWater() {
    drawObject((0-camera.x) - display.canvas.width / 4, world.minHeight, display.canvas.width, display.canvas.height / 2, "#3c82d74d")
}

const editorobject = {
    width: 100,
    height: 100,
    x: 0,
    y: 0
}

const editorobjects = []
function renderEditor() {
    if(game.editor || false) {
        editorobject.x = (0-camera.x + mouse.x/camera.z)-display.canvas.width/4
        editorobject.y = (0-camera.y + mouse.y/camera.z)-display.canvas.height/4
        const x = editorobject.x
        const y = editorobject.y
        drawObjectWF(x, y, editorobject.width, editorobject.height, "#cf1b1b")

        if(checkKey("ArrowLeft")) {
            editorobject.width -= 10
        }
        if(checkKey("ArrowRight")) {
            editorobject.width += 10
        }
        if(checkKey("ArrowUp")) {
            editorobject.height -= 10
        }
        if(checkKey("ArrowDown")) {
            editorobject.height += 10
        }


    }
}
