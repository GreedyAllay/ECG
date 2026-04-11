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
                drawImage(object.x, object.y, object.w, object.h, object.source)
                break;
            default:
                break;
        }
    });
}

function drawHitboxes() {
    if(!game.renderHitBoxes) {return}
    level.forEach(object => {
        drawObjectWF(
            object.x,
            object.y,
            object.w,
            object.h,
            "#cf1b1b"
        )
    });
    drawObjectWF(player.x, player.y, player.w, player.h, "#cf1b1b")
}

function renderPlayer() {
    drawImage(player.x-40, player.y-20, 100, 100, player.texture)
}