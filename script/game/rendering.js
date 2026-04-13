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
}

function drawHitboxes() {
    if(!game.renderHitBoxes) {return}
    level.forEach(object => {
        if(!object.ghost) {
            drawObjectWF(
                object.x,
                object.y,
                object.w,
                object.h,
                "#cf1b1b"
            )            
        }

    });
    drawObjectWF(player.x+player.hbx, player.y+player.hby, player.w, player.h, "#cf1b1b")
}

function renderPlayer() {
    drawImage(player.x+player.ox, player.y+player.oy, 100, 100, player.texture, player.mirror)
}