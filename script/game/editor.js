//shitass editor

const editorobjects = []
function renderEditor() {
    if(!game.editor) return;
    editorobject.x = 0-camera.x + (mouse.x - display.canvas.width / 2) / camera.z;
    editorobject.y = 0-camera.y + (mouse.y - display.canvas.height / 2) / camera.z;
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

addEventListener("mousedown", (e) => {
    if(game.editor) {
        const {x, y, w, h} = {
            x: Math.round(editorobject.x),
            y: Math.round(editorobject.y),
            w: editorobject.width,
            h: editorobject.height
        }
        if(game.multiplayer) {
            const tx = {
                type: "edit", change: "add", data: editorobject
            }
            multiplayer.socket.send(JSON.stringify(tx))
        } else {
            define.object(x, y, w, h, "#742cbb")
            editorobjects.push(`define.object(${x}, ${y}, ${w}, ${h}, '#742cbb', 0)`)
        }

    }
})

function loadCustomLevel() {
    //VERY SAFE
    eval(prompt("enter javascript code"))
}