const editorobjects = []
function renderEditor() {
    if(game.editor) {
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

addEventListener("mousedown", (e) => {
    if(game.editor) {
        editorobjects.push(`define.object(${Math.round(editorobject.x)}, ${Math.round(editorobject.y)}, ${editorobject.width}, ${editorobject.height}, '#742cbb', 0)`)
        define.object(editorobject.x, editorobject.y, editorobject.width, editorobject.height, "#742cbb")
    }
})