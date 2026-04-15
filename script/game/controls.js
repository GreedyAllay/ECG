function handleControls() {
    if(checkKey("r")) { location.reload() }
    //if(checkKey("s") && (player.onFloor && player.animation != "accident")) { player }
    //if(checkKey("a")) { player.xv -= 4 }
    //if(checkKey("d")) { player.xv += 4 }
    //if(checkKey("w") && player.onFloor) { player.yv -= 8;}

}

//key logging (the good one)
addEventListener('keydown', (e) => { keys.push(e.key) }); addEventListener('keyup', (e) => { keys = keys.filter(k => k !== e.key); })

function checkKey(key) {
    return keys.includes(key)
}

document.addEventListener('keypress', (e) => {
    if(e.key == "1") {
        game.renderHitBoxes = !game.renderHitBoxes
    }
    if(e.key == "2") {
        game.renderObjectIDs = !game.renderObjectIDs
    }
    if(e.key == "3") {
        killPlayer()
    }
    if(e.key == "4") {
        game.editor = !game.editor
    }
})

addEventListener("mousedown", (e) => {
    if(game.editor) {
        editorobjects.push(`define.object(${Math.round(editorobject.x)}, ${Math.round(editorobject.y)}, ${editorobject.width}, ${editorobject.height}, '#742cbb', 0)`)
        define.object(editorobject.x, editorobject.y, editorobject.width, editorobject.height, "#742cbb")
    }
})